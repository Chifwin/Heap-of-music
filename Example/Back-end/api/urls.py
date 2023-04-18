from django.urls import path
from .views import songs_list, album_list, song_one, album_one

urlpatterns = [
    path('songs', songs_list),
    path('songs/<int:song_id>/', song_one),
    path('albums', album_list),
    path('albums/<int:album_id>/', album_one),
]
