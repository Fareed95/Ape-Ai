from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AiInterview, Interview, Company, Internship, AiDemoInterview, AiInterviewSampleData
from .llm import Ai_interview
from utils.usercheck import authenticate_request

def home(request):
    return HttpResponse('Hello, World!')
class InterviewList(APIView):
    def post(self, request):
        demo_interview = request.data.get('demo_interview', False)
        answer = request.data.get('answer', 'Not')
        question_id = request.data.get('question_id')
        interviewee = authenticate_request(request, need_user=True)

        # ------------------ DEMO FLOW ------------------
        if demo_interview:
            if answer == 'Not':
                demo_topic = request.data.get("Topic")
                if not demo_topic:
                    return Response({"error": "For initialization, model needs the demo_topic"}, status=status.HTTP_400_BAD_REQUEST)

                sample_data = AiInterviewSampleData.objects.create(
                    sample_company_data="Sample Company Data",
                    sample_internship_data=f"Sample Internship Data take on your own for the role {demo_topic}",
                    analysis="",
                    performance=None,
                    communication_skill=None
                )

                llm = Ai_interview(
                    company_data=sample_data.sample_company_data,
                    internship_data=sample_data.sample_internship_data,
                    chat_history="No history",
                    number_of_question_asked="0"
                )

                ai_demo_obj = AiDemoInterview.objects.create(
                    question=llm,
                    sample_data=sample_data
                )
                return Response({'question': llm, 'question_id': ai_demo_obj.id, 'end': False}, status=status.HTTP_201_CREATED)

            else:
                demo_obj = AiDemoInterview.objects.filter(id=question_id).first()
                if demo_obj:
                    demo_obj.answer = answer
                    demo_obj.save()

                    demo_history = "\n".join([
                        f"Q: {q.question} A: {q.answer}" 
                        for q in AiDemoInterview.objects.all() if q.answer
                    ])
                    total_questions = AiDemoInterview.objects.filter(sample_data=demo_obj.sample_data).count()
                    if total_questions <= 5:
                        llm = Ai_interview(
                            company_data=demo_obj.sample_data.sample_company_data,
                            internship_data=demo_obj.sample_data.sample_internship_data,
                            chat_history=demo_history,
                            number_of_question_asked=str(total_questions)
                        )

                        ai_demo_obj = AiDemoInterview.objects.create(question=llm, sample_data=demo_obj.sample_data)
                        return Response({'question': llm, 'question_id': ai_demo_obj.id, 'end': False}, status=status.HTTP_201_CREATED)
                    else:
                        demo_obj.sample_data.analysis = "LLM generated analysis text"
                        demo_obj.sample_data.performance = 8
                        demo_obj.sample_data.communication_skill = 7
                        demo_obj.sample_data.save()
                        return Response({
                            'question': f"So {interviewee.name}, this was a demo session. Hope you enjoyed it!",
                            'end': True
                        }, status=status.HTTP_200_OK)

        # ------------------ REAL INTERNSHIP FLOW ------------------
        else:
            internship_id = request.data.get("internship_id")
            internship = Internship.objects.filter(id=internship_id).first()
            if not internship:
                return Response({'error': 'Invalid internship_id'}, status=status.HTTP_400_BAD_REQUEST)
            already_exists = AiInterview.objects.filter(
                interview__chat_history_unique_id=f"{interviewee.email}{internship.company.user.email}{internship.Interviewer_user.email}{internship.title}",
                interviewer=internship.Interviewer_user
            ).exists()

            if already_exists:
                return Response({
                    "message": "This interviewer has already conducted an interview for this internship.",
                    "end": True
                }, status=status.HTTP_200_OK)          

            chat_bot_history_unique_name = f"{interviewee.email}{internship.company.user.email}{internship.Interviewer_user.email}{internship.title}"

            if answer == 'Not':
                interview, _ = Interview.objects.get_or_create(chat_history_unique_id=chat_bot_history_unique_name)
                chat_history = "No history"
                llm = Ai_interview(
                    company_data=internship.company.description,
                    internship_data=internship.description,
                    chat_history=chat_history,
                    number_of_question_asked="0"
                )
                ai_interview_obj = AiInterview.objects.create(question=llm, interview=interview)
                return Response({'question': llm, 'question_id': ai_interview_obj.id, 'end': False}, status=status.HTTP_201_CREATED)

            else:
                ai_obj = AiInterview.objects.filter(id=question_id).first()
                if ai_obj:
                    ai_obj.answer = answer
                    ai_obj.save()

                    interview = Interview.objects.get(chat_history_unique_id=chat_bot_history_unique_name)
                    chat_history = "\n".join([
                        f"Q: {q.question} A: {q.answer}" 
                        for q in interview.ai_interviews.all() if q.answer
                    ])
                    total_questions = interview.ai_interviews.count()

                    if total_questions <= 5:
                        llm = Ai_interview(
                            company_data=internship.company.description,
                            internship_data=internship.description,
                            chat_history=chat_history,
                            number_of_question_asked=str(total_questions)
                        )
                        ai_interview_obj = AiInterview.objects.create(question=llm, interview=interview)
                        return Response({'question': llm, 'question_id': ai_interview_obj.id, 'end': False}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({
                            'question': f"So {interviewee.name}, it was a great time with you. You will be updated via email soon.",
                            'end': True
                        }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid request', 'end': False}, status=status.HTTP_400_BAD_REQUEST)
