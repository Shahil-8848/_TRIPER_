from rest_framework.serializers import ModelSerializser
from ..models import Post


class PostSerializer(ModelSerializser):
    class Meta:
        model = Post
        fields = ('id', 'title', 'body')
