from rest_framework import serializers
from podcust.models import Podcast, Category

class PodcastSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Podcast
        fields = '__all__' 
    
    def __init__(self, *args, **kwargs):
        # extract 'fields' param before passing kwargs to parent
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)
                


class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category 
        fields = '__all__' 
    
    def __init__(self, *args, **kwargs):
        # extract 'fields' param before passing kwargs to parent
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)