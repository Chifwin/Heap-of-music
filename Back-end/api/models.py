from math import ceil
from mutagen.mp3 import MP3

from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()


class Album(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='album_images')
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def get_image_path(self):
        return self.image.name

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'cover_link': self.get_image_path(),
            'creator_id': self.creator_id
        }


def get_song_duration(song):
    audio = MP3(song)
    return int(ceil(audio.info.length))


class Artist(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=100)
    is_public = models.BooleanField(default=True, blank=True)

    audio_file = models.FileField(upload_to='audio')
    image = models.ImageField(upload_to='song_images', null=True, blank=True)

    artists = models.ManyToManyField(Artist)
    album = models.ForeignKey(Album, models.CASCADE, null=True, blank=True)

    duration = models.IntegerField(blank=True)
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title}: {self.album}, {self.duration}s'

    def save(self, *args, **kwargs):
        file = self.audio_file.file
        self.duration = get_song_duration(file)
        super().save(*args, **kwargs)

    @property
    def get_audio_path(self):
        return self.audio_file.name

    @property
    def get_image_path(self):
        if not self.image.name and self.album:
            return self.album.image.name
        return self.image.name

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'is_public': self.is_public,
            'cover_link': self.get_image_path(),
            'song_link': self.get_audio_path(),
            'album_id': (self.album.id if self.album else ''),
            'authors': self.artists,
            'duration': self.duration,
            'creator_id': self.creator_id
        }
