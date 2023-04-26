from django.forms import ModelForm
from .models import Song, Album


class SongForm(ModelForm):
    class Meta:
        model = Song
        fields = ['title', 'audio_file', 'image', 'artists', 'is_public', 'album', 'creator_id']

    def save_and_return(self):
        return self.save()


class AlbumForm(ModelForm):
    class Meta:
        model = Album
        fields = ['title', 'image', 'creator_id']

    def save_and_return(self):
        return self.save()
