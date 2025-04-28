from django.urls import path
from . import views

urlpatterns = [
    # Carreras
    path('careers/', views.career_list, name='career_list'),
    path('careers/create/', views.career_create, name='career_create'),
    path('careers/<int:pk>/update/', views.career_update, name='career_update'),
    path('careers/<int:pk>/delete/', views.career_delete, name='career_delete'),
    # Estudiantes
    path('students/', views.student_list, name='student_list'),
    path('students/create/', views.student_create, name='student_create'),
    path('students/<int:pk>/update/', views.student_update, name='student_update'),
    path('students/<int:pk>/delete/', views.student_delete, name='student_delete'),
    # Profesores
    path('professors/', views.professor_list, name='professor_list'),
    path('professors/create/', views.professor_create, name='professor_create'),
    path('professors/<int:pk>/update/', views.professor_update, name='professor_update'),
    path('professors/<int:pk>/delete/', views.professor_delete, name='professor_delete'),
    # Proyectos de Titulación
    path('projects/', views.project_list, name='project_list'),
    path('projects/create/', views.project_create, name='project_create'),
    path('projects/<int:pk>/update/', views.project_update, name='project_update'),
    path('projects/<int:pk>/delete/', views.project_delete, name='project_delete'),
    # Evaluaciones
    path('evaluations/', views.evaluation_list, name='evaluation_list'),
    path('evaluations/create/', views.evaluation_create, name='evaluation_create'),
    path('evaluations/<int:pk>/update/', views.evaluation_update, name='evaluation_update'),
    path('evaluations/<int:pk>/delete/', views.evaluation_delete, name='evaluation_delete'),
    # Documentos
    path('documents/', views.document_list, name='document_list'),
    path('documents/create/', views.document_create, name='document_create'),
    path('documents/<int:pk>/update/', views.document_update, name='document_update'),
    path('documents/<int:pk>/delete/', views.document_delete, name='document_delete'),
]