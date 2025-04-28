from django import forms
from .models import Career, Student, Professor, TitulationProject, Evaluation, Document

class CareerForm(forms.ModelForm):
    class Meta:
        model = Career
        fields = ['name', 'faculty', 'duration_years']

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ['first_name', 'last_name', 'identification_number', 'email', 'career', 'enrollment_date']
        widgets = {
            'enrollment_date': forms.DateInput(attrs={'type': 'date'}),
        }

class ProfessorForm(forms.ModelForm):
    class Meta:
        model = Professor
        fields = ['first_name', 'last_name', 'email', 'department']

class TitulationProjectForm(forms.ModelForm):
    class Meta:
        model = TitulationProject
        fields = ['student', 'professor', 'title', 'description', 'start_date', 'end_date', 'status']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
        }

class EvaluationForm(forms.ModelForm):
    class Meta:
        model = Evaluation
        fields = ['project', 'professor', 'evaluation_date', 'score', 'comments']
        widgets = {
            'evaluation_date': forms.DateInput(attrs={'type': 'date'}),
        }

class DocumentForm(forms.ModelForm):
    class Meta:
        model = Document
        fields = ['project', 'document_type', 'file_path']