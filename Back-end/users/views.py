import datetime
import http

import jwt
from django.http import JsonResponse
from rest_framework.views import APIView

from .models import User
from .serializers import UserSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(serializer.data)


class LoginView(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
        except KeyError:
            return JsonResponse({"error": "Data isn't provided!"}, status=http.HTTPStatus.BAD_REQUEST)

        user = User.objects.filter(email=email).first()

        if user is None:
            return JsonResponse({"error": "User not found!"}, status=http.HTTPStatus.BAD_REQUEST)

        if not user.check_password(password):
            return JsonResponse({"error": "Password is incorrect"}, status=http.HTTPStatus.BAD_REQUEST)

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, JWT_SECRET, algorithm='HS256').decode('utf-8')

        response = JsonResponse({"jwt": token})
        response.set_cookie(key='jwt', value=token, httponly=True)
        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            return JsonResponse({"error": 'Unauthenticated!'})

        try:
            payload = jwt.decode(token, JWT_SECRET, algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            return JsonResponse({"error": 'Unauthenticated!'})

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = JsonResponse({'message': 'success'})
        response.delete_cookie('jwt')
        return response
