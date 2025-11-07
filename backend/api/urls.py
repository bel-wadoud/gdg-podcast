from django.urls import path
from . import views

urlpatterns = [
    path ('podcasts/', views.podcast_list, name = 'podcast-list'),
    path ('podcasts/<int:id>/', views.podcast_by_id, name = 'podcast-by-id'),
    path ('podcasts/<int:podcast_id>/download/', views.podcast_download, name = 'download-offline-vedio'),
    path ('user/recommend/',views.podcast_recemonede, name = 'rebommended-feed'),
    path ('categories/', views.category_list, name = 'list-categories'),
    path ('categories/<int:category_id>/podcasts/', views.podcasts_by_category, name = 'podcasts-by-category'),
    path ('podcasts/create-from-youtube/', views.create_podcast_from_youtube, name = 'create-podcast-from-youtube'),
]
