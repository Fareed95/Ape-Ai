from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AiInterview, Interview
from .serializers import ai_interviewSerializer, InterviewSerializer
from .llm import Ai_interview

def home(request):
    return HttpResponse('Hello, World!')

class InterviewList(APIView):
    def post(self, request):
        interviewee_email = request.data.get('interviewee_email')
        interviewee_name = request.data.get('interviewee_name')
        course_name = request.data.get('course_name')
        company_email = request.data.get('company_email')
        company_data = request.data.get('company_data')
        internship_data = request.data.get('internship_data')
        answer = request.data.get('answer')
        question_id = request.data.get('question_id')
        chat_bot_history_unique_name = f'{interviewee_email}{company_email}{course_name}'

        if answer == 'Not':
            interview, created = Interview.objects.get_or_create(
                chat_history_unique_id=chat_bot_history_unique_name
            )
            chat_history = "No history"
            llm = Ai_interview(
                company_data=company_data,
                internship_data=internship_data,
                chat_history=chat_history,
                number_of_question_asked="0"
            )
            ai_interview_obj = AiInterview.objects.create(
                question=llm,
                interview=interview
            )
            response = {
                'question': llm,
                'question_id': ai_interview_obj.id
            }
            return Response(response, status=status.HTTP_201_CREATED)

        else:
            # Update the answer for the given question
            ai_obj = AiInterview.objects.filter(id=question_id).first()
            if ai_obj:
                ai_obj.answer = answer
                ai_obj.save()

                # Prepare chat history
                interview = Interview.objects.get(chat_history_unique_id=chat_bot_history_unique_name)
                chat_history = "\n".join([f"Q: {q.question} A: {q.answer}" for q in interview.ai_interviews.all() if q.answer])
                total_questions = interview.ai_interviews.count()

                if total_questions <= 5:

                    llm = Ai_interview(
                        company_data=company_data,
                        internship_data=internship_data,
                        chat_history=chat_history,
                        number_of_question_asked=str(total_questions)
                    )

                    ai_interview_obj = AiInterview.objects.create(
                        question=llm,
                        interview=interview
                    )

                    response = {
                        'question': llm,
                        'question_id': ai_interview_obj.id
                    }
                    return Response(response, status=status.HTTP_201_CREATED) 
                else:
                    response = {
                        'question':f"So {interviewee_name}, it was a great time with you, we will be in touch with you soon.Your this data has been sent to the company and you will be updated on your email soom ",
                    }
                    return Response(response, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
