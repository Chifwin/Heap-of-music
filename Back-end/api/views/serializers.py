from api.models import Song, Artist, Album
from rest_framework import serializers


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ('name',)


class SongSerializerMeta(serializers.ModelSerializer):
    song_link = serializers.ReadOnlyField(source='get_audio_path')
    image_link = serializers.ReadOnlyField(source='get_image_path')

    class Meta:
        model = Song
        fields = ('id', 'title', 'is_public', 'album', 'duration', 'song_link', 'image_link')


class SongSerializer(serializers.Serializer):
    creator_id = serializers.HiddenField(default=serializers.CurrentUserDefault)
    title = serializers.CharField(max_length=100)
    is_public = serializers.BooleanField(default=True)
    song = serializers.FileField(write_only=True)
    cover = serializers.ImageField(write_only=True)
    authors = serializers.CharField(max_length=200)
    album = serializers.PrimaryKeyRelatedField(read_only=True)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class AlbumSerializerMeta(serializers.ModelSerializer):
    image_link = serializers.ReadOnlyField(source='get_image_path')
    songs = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Album
        fields = ('id', 'title', 'image_link', 'songs')


class AlbumSerializer(serializers.Serializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault)
    title = serializers.CharField(max_length=100)
    cover = serializers.ImageField(write_only=True)
    songs = serializers.PrimaryKeyRelatedField(read_only=True)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass