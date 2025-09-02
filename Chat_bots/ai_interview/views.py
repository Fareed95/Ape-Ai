from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import (
    AiInterview, Interview, Company, Internship,
    AiDemoInterview, AiInterviewSampleData
)
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
                    return Response(
                        {"error": "For initialization, model needs the demo_topic"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Create sample data for demo
                sample_data = AiInterviewSampleData.objects.create(
                    sample_company_data="Take a Sample Company Data from your own",
                    sample_internship_data=f"Sample Internship Data for role {demo_topic}",
                    analysis="",
                    performance=None,
                    communication_skill=None,
                    user=interviewee
                )

                # Generate first AI question
                try:
                    llm = Ai_interview(
                        company_data=sample_data.sample_company_data,
                        internship_data=sample_data.sample_internship_data,
                        chat_history="No history",
                        number_of_question_asked="0"
                    )
                except Exception as e:
                    return Response({"error": f"LLM error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                ai_demo_obj = AiDemoInterview.objects.create(
                    question=llm,
                    sample_data=sample_data
                )
                return Response(
                    {'question': llm, 'question_id': ai_demo_obj.id, 'end': False},
                    status=status.HTTP_201_CREATED
                )

            else:
                demo_obj = AiDemoInterview.objects.filter(id=question_id).first()
                if demo_obj:
                    demo_obj.answer = answer
                    demo_obj.save()

                    # Fetch only current user's demo Q/A
                    demo_history = "\n".join([
                        f"Q: {q.question} A: {q.answer}"
                        for q in AiDemoInterview.objects.filter(sample_data__user=interviewee).only("question", "answer")
                        if q.answer
                    ])

                    total_questions = AiDemoInterview.objects.filter(sample_data__user=interviewee).count()

                    if total_questions <= 5:
                        try:
                            llm = Ai_interview(
                                company_data=demo_obj.sample_data.sample_company_data,
                                internship_data=demo_obj.sample_data.sample_internship_data,
                                chat_history=demo_history,
                                number_of_question_asked=str(total_questions)
                            )
                        except Exception as e:
                            return Response({"error": f"LLM error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                        ai_demo_obj = AiDemoInterview.objects.create(
                            question=llm,
                            sample_data=demo_obj.sample_data
                        )
                        return Response(
                            {'question': llm, 'question_id': ai_demo_obj.id, 'end': False},
                            status=status.HTTP_201_CREATED
                        )
                    else:
                        # End of demo
                        demo_obj.sample_data.analysis = "LLM generated analysis text"
                        demo_obj.sample_data.performance = 8
                        demo_obj.sample_data.communication_skill = 7
                        demo_obj.sample_data.save()

                        return Response(
                            {
                                'question': f"So {interviewee.name}, this was a demo session. Hope you enjoyed it!",
                                'end': True
                            },
                            status=status.HTTP_200_OK
                        )

        # ------------------ REAL INTERNSHIP FLOW ------------------
        else:
            internship_id = request.data.get("internship_id")
            internship = Internship.objects.filter(id=internship_id).first()
            if not internship:
                return Response(
                    {'error': 'Invalid internship_id'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if answer == 'Not':
                # Start new interview
                try:

                    interview = Interview.objects.filter(
                    internship=internship,
                    interviewee=interviewee
                    ).first()

                    if interview:
                        return Response(
                            {
                                "message": f"{interviewee.name}, you have already given an interview for {internship.title} on {interview.created_at}",
                                "end": True
                            },
                            status=status.HTTP_200_OK
                        )
                    llm = Ai_interview(
                        company_data=internship.company.description,
                        internship_data=internship.description,
                        chat_history="No history",
                        number_of_question_asked="0"
                    )
                except Exception as e:
                    return Response({"error": f"LLM error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                interview = Interview.objects.create(
                    interviewee=interviewee,
                    internship=internship
                )
                ai_interview_obj = AiInterview.objects.create(
                    question=llm,
                    interview=interview
                )
                return Response(
                    {'question': llm, 'question_id': ai_interview_obj.id, 'end': False},
                    status=status.HTTP_201_CREATED
                )

            else:
                ai_obj = AiInterview.objects.filter(id=question_id).first()
                if ai_obj:
                    ai_obj.answer = answer
                    ai_obj.save()

                    interview = ai_obj.interview
                    # Since interview is linked to one user, no need to filter by interviewee again
                    user_ai_interviews = interview.ai_interviews.all()

                    chat_history = "\n".join([
                        f"Q: {q.question} A: {q.answer}"
                        for q in user_ai_interviews if q.answer
                    ])
                    total_questions = user_ai_interviews.count()

                    if total_questions <= 5:
                        try:
                            llm = Ai_interview(
                                company_data=interview.internship.company.description,
                                internship_data=interview.internship.description,
                                chat_history=chat_history,
                                number_of_question_asked=str(total_questions)
                            )
                        except Exception as e:
                            return Response({"error": f"LLM error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                        ai_interview_obj = AiInterview.objects.create(
                            question=llm,
                            interview=interview
                        )
                        return Response(
                            {'question': llm, 'question_id': ai_interview_obj.id, 'end': False},
                            status=status.HTTP_201_CREATED
                        )
                    else:
                        # End interview
                        interview.analysis = "LLM generated final analysis"
                        interview.performance = 9
                        interview.communication_skill = 8
                        interview.save()

                        return Response(
                            {
                                'question': f"So {interviewee.name}, it was a great time with you. You will be updated via email soon.",
                                'end': True
                            },
                            status=status.HTTP_200_OK
                        )

        return Response({'error': 'Invalid request', 'end': False}, status=status.HTTP_400_BAD_REQUEST)
