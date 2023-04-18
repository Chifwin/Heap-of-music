import http
from .forms import SongForm, AlbumForm
from django.http import JsonResponse
from .models import Song, Album


def songs_list(request):
    if request.method == 'GET':
        songs = [s.to_json() for s in Song.objects.all()]
        return JsonResponse(songs, safe=False)
    if request.method == 'POST':
        form = SongForm(request.POST, request.FILES)
        if form.is_valid():
            song = form.save_and_return()
            return JsonResponse(song.to_json(), http.HTTPStatus.CREATED)
        else:
            return JsonResponse({'error': 'exist'}, http.HTTPStatus.BAD_REQUEST)


def song_one(request, song_id):
    try:
        song = Song.objects.get(id=song_id)
    except Song.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=http.HTTPStatus.BAD_REQUEST)

    if request.method == 'GET':
        return JsonResponse(song.to_json())


def album_list(request):
    if request.method == 'GET':
        albums = [s.to_json() for s in Album.objects.all()]
        return JsonResponse(albums, safe=False)
    if request.method == 'POST':
        form = AlbumForm(request.POST, request.FILES)
        if form.is_valid():
            album = form.save_and_return()
            return JsonResponse(album, http.HTTPStatus.CREATED)
        else:
            return JsonResponse({'error': 'exist'}, http.HTTPStatus.BAD_REQUEST)


def album_one(request, album_id):
    try:
        album = Album.objects.get(id=album_id)
    except Album.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=http.HTTPStatus.BAD_REQUEST)

    if request.method == 'GET':
        return JsonResponse(album.to_json())
