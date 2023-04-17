from django.db import models


class Album(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='album_images')
    creator_id = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Song(models.Model):
    title = models.CharField(max_length=100)
    audio_file = models.FileField(upload_to='audio')
    image = models.ImageField(upload_to='song_images')
    artists = models.TextField()
    is_public = models.BooleanField()
    album = models.ForeignKey(Album, models.CASCADE, related_name='+')

    def __str__(self):
        return f'{self.title}: {self.artists}'
