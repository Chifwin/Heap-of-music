from rest_framework import status
from rest_framework.views import APIView
from django.http import JsonResponse

from .serializers import ArtistSerializer
from api.models import Artist


class ArtistList(APIView):
    def get(self, request):
        ser = ArtistSerializer(Artist.objects.all(), many=True)
        return JsonResponse(ser.data)

    def post(self, request):
        ser = ArtistSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return JsonResponse(ser.data)
        return JsonResponse(ser.errors, status=status.HTTP_400_BAD_REQUEST)


class ArtistOne(APIView):
    def get_object(self, category_id):
        try:
            return Artist.objects.get(pk=category_id)
        except Artist.DoesNotExist as e:
            return JsonResponse(str(e), status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, category_id):
        instance = self.get_object(category_id)
        serializer = ArtistSerializer(instance)
        return JsonResponse(serializer.data)

    def put(self, request, category_id):
        instance = self.get_object(category_id)
        serializer = ArtistSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, category_id):
        instance = self.get_object(category_id)
        instance.delete()
        return JsonResponse({'deleted': True})
