"""
recipeApp REST serializers
"""

from rest_framework.reverse import reverse
from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    # pk = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    url = serializers.HyperlinkedIdentityField(view_name='category-detail', lookup_field='name')
    # recipes = serializers.SlugRelatedField(queryset=Recipe.objects.all(), many=True, slug_field='title')
    recipes_names = serializers.SerializerMethodField()
    recipes_images = serializers.SerializerMethodField()
    recipes = serializers.HyperlinkedRelatedField(view_name='recipe-detail', queryset=Recipe.objects.all(), many=True, lookup_field='title')

    class Meta:
        model = Category
        fields = ['pk', 'name', 'url', 'recipe_count', 'recipes_names', 'recipes_images', 'recipes']

    def get_recipes_names(self, obj):
        result = [val for sublist in obj.recipes.values_list('title') for val in sublist]
        return result

    def get_recipes_images(self, obj):
        result = [val for sublist in obj.recipes.values_list('image') for val in sublist]
        return result


class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='recipe-detail', lookup_field='title')
    category = serializers.HyperlinkedRelatedField(view_name='category-detail', queryset=Category.objects.all(),
                                                   lookup_field='name')
    ingredients = serializers.StringRelatedField()

    class Meta:
        model = Recipe
        fields = ['pk', 'title', 'text', 'ingredients', 'category', 'image', 'url']


class RecipeListSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='recipe-detail', lookup_field='title')
    category = serializers.HyperlinkedRelatedField(view_name='category-detail', queryset=Category.objects.all(),
                                                   lookup_field='name')

    class Meta:
        model = Recipe
        fields = ['pk', 'title', 'category', 'image', 'url']
