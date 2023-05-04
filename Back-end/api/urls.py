from django.urls import path

from .views import *

urlpatterns = [
    path('songs', songs_list),
    path('songs/search', song_search),
    path('songs/<int:song_id>/', song_one),
    path('albums', album_list),
    path('albums/<int:album_id>/', album_one),
    path('artists', ArtistList.as_view())
]
