from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.views.generic import TemplateView
from .models import Category, Recipe
from .serializers import CategorySerializer, RecipeSerializer, RecipeListSerializer


# Create your views here.
class AppView(TemplateView):
    template_name = 'default.html'

    def get_context_data(self, **kwargs):
        context = super(AppView, self).get_context_data(**kwargs)
        context['custom_context'] = 'some custom context'
        return context


# REST viewsets
class CategoryViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'name'
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class RecipeViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'title'
    queryset = Recipe.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return RecipeSerializer
        return RecipeListSerializer
