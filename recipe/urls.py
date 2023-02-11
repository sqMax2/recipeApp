from django.urls import path

from recipe.views import AppView

app_name = 'recipe'
urlpatterns = [
    path('', AppView.as_view(), name='app'),
]
