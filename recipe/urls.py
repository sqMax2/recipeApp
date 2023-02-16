from django.urls import path

from .views import AppView

app_name = 'recipe'
urlpatterns = [
    path('', AppView.as_view(), name='app'),
]
