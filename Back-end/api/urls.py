from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from .views import *

urlpatterns = [
    path('login/', obtain_jwt_token),

    path('songs', songs_list),
    path('songs/search', song_search),
    path('songs/<int:song_id>/', song_one),
    path('albums', album_list),
    path('albums/<int:album_id>/', album_one),
    path('artists', ArtistList.as_view())
]
