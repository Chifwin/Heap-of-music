import http
from django.http import JsonResponse
from api.models import Song, Album
from rest_framework.decorators import api_view

from .serializers import *


@api_view(['GET', 'POST'])
def songs_list(request):
    if request.method == 'GET':
        ser = SongSerializerMeta(Song.objects.all(), many=True)
        return JsonResponse(ser.data, safe=False)
    if request.method == 'POST':
        ser = SongSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return JsonResponse(ser)
    return JsonResponse({'error': "not implemented"}, status=http.HTTPStatus.BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def song_one(request, song_id):
    try:
        song = Song.objects.get(id=song_id)
    except Song.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=http.HTTPStatus.BAD_REQUEST)

    if request.method == 'GET':
        return JsonResponse(SongSerializerMeta(song).data)
    if request.method == 'PUT':
        ser = SongSerializerMeta(instance=song, data=request.data)
        if ser.is_valid():
            ser.save()
            return JsonResponse(ser.data)
        return JsonResponse(ser.errors, status=http.HTTPStatus.BAD_REQUEST)
    if request.method == 'DELETE':
        song.delete()
        return JsonResponse({'deleted': True})
    return JsonResponse({'error': "not implemented"}, status=http.HTTPStatus.BAD_REQUEST)


@api_view(['GET'])
def song_search(request):
    song_title = request.GET.get('title', '')
    songs = Song.objects.filter(title__icontains=f"{song_title}")
    ser = SongSerializerMeta(songs, many=True)
    return JsonResponse(ser.data, safe=False)


@api_view(['GET', 'POST'])
def album_list(request):
    if request.method == 'GET':
        ser = AlbumSerializerMeta(Album.objects.all(), many=True)
        return JsonResponse(ser.data, safe=False)
    if request.method == 'POST':
        ser = AlbumSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return JsonResponse(ser)
    return JsonResponse({'error': "not implemented"}, status=http.HTTPStatus.BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def album_one(request, album_id):
    try:
        album = Album.objects.get(id=album_id)
    except Album.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=http.HTTPStatus.BAD_REQUEST)

    if request.method == 'GET':
        return JsonResponse(AlbumSerializerMeta(album).data)
    if request.method == 'PUT':
        ser = AlbumSerializer(instance=album, data=request.data)
        if ser.is_valid():
            ser.save()
            return JsonResponse(ser.data)
        return JsonResponse(ser.errors, status=http.HTTPStatus.BAD_REQUEST)
    if request.method == 'DELETE':
        album.delete()
        return JsonResponse({'deleted': True})
    return JsonResponse({'error': "not implemented"}, status=http.HTTPStatus.BAD_REQUEST)
