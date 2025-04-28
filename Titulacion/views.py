from django.shortcuts import render, redirect, get_object_or_404
from .models import Career, Student, Professor, TitulationProject, Evaluation, Document
from .forms import CareerForm, StudentForm, ProfessorForm, TitulationProjectForm, EvaluationForm, DocumentForm

def career_list(request):
    careers = Career.objects.all()
    return render(request, 'Titulacion/career_list.html', {'careers': careers})

def career_create(request):
    if request.method == 'POST':
        form = CareerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('career_list')
    else:
        form = CareerForm()
    return render(request, 'Titulacion/career_form.html', {'form': form})

def career_update(request, pk):
    career = get_object_or_404(Career, pk=pk)
    if request.method == 'POST':
        form = CareerForm(request.POST, instance=career)
        if form.is_valid():
            form.save()
            return redirect('career_list')
    else:
        form = CareerForm(instance=career)
    return render(request, 'Titulacion/career_form.html', {'form': form})

def career_delete(request, pk):
    career = get_object_or_404(Career, pk=pk)
    if request.method == 'POST':
        career.delete()
        return redirect('career_list')
    return render(request, 'Titulacion/career_confirm_delete.html', {'career': career})

def student_list(request):
    students = Student.objects.all()
    return render(request, 'Titulacion/student_list.html', {'students': students})

def student_create(request):
    if request.method == 'POST':
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('student_list')
    else:
        form = StudentForm()
    return render(request, 'Titulacion/student_form.html', {'form': form})

def student_update(request, pk):
    student = get_object_or_404(Student, pk=pk)
    if request.method == 'POST':
        form = StudentForm(request.POST, instance=student)
        if form.is_valid():
            form.save()
            return redirect('student_list')
    else:
        form = StudentForm(instance=student)
    return render(request, 'Titulacion/student_form.html', {'form': form})

def student_delete(request, pk):
    student = get_object_or_404(Student, pk=pk)
    if request.method == 'POST':
        student.delete()
        return redirect('student_list')
    return render(request, 'Titulacion/student_confirm_delete.html', {'student': student})

def professor_list(request):
    professors = Professor.objects.all()
    return render(request, 'Titulacion/professor_list.html', {'professors': professors})

def professor_create(request):
    if request.method == 'POST':
        form = ProfessorForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('professor_list')
    else:
        form = ProfessorForm()
    return render(request, 'Titulacion/professor_form.html', {'form': form})

def professor_update(request, pk):
    professor = get_object_or_404(Professor, pk=pk)
    if request.method == 'POST':
        form = ProfessorForm(request.POST, instance=professor)
        if form.is_valid():
            form.save()
            return redirect('professor_list')
    else:
        form = ProfessorForm(instance=professor)
    return render(request, 'Titulacion/professor_form.html', {'form': form})

def professor_delete(request, pk):
    professor = get_object_or_404(Professor, pk=pk)
    if request.method == 'POST':
        professor.delete()
        return redirect('professor_list')
    return render(request, 'Titulacion/professor_confirm_delete.html', {'professor': professor})

def project_list(request):
    projects = TitulationProject.objects.all()
    return render(request, 'Titulacion/project_list.html', {'projects': projects})

def project_create(request):
    if request.method == 'POST':
        form = TitulationProjectForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('project_list')
    else:
        form = TitulationProjectForm()
    return render(request, 'Titulacion/project_form.html', {'form': form})

def project_update(request, pk):
    project = get_object_or_404(TitulationProject, pk=pk)
    if request.method == 'POST':
        form = TitulationProjectForm(request.POST, instance=project)
        if form.is_valid():
            form.save()
            return redirect('project_list')
    else:
        form = TitulationProjectForm(instance=project)
    return render(request, 'Titulacion/project_form.html', {'form': form})

def project_delete(request, pk):
    project = get_object_or_404(TitulationProject, pk=pk)
    if request.method == 'POST':
        project.delete()
        return redirect('project_list')
    return render(request, 'Titulacion/project_confirm_delete.html', {'project': project})

def evaluation_list(request):
    evaluations = Evaluation.objects.all()
    return render(request, 'Titulacion/evaluation_list.html', {'evaluations': evaluations})

def evaluation_create(request):
    if request.method == 'POST':
        form = EvaluationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('evaluation_list')
    else:
        form = EvaluationForm()
    return render(request, 'Titulacion/evaluation_form.html', {'form': form})

def evaluation_update(request, pk):
    evaluation = get_object_or_404(Evaluation, pk=pk)
    if request.method == 'POST':
        form = EvaluationForm(request.POST, instance=evaluation)
        if form.is_valid():
            form.save()
            return redirect('evaluation_list')
    else:
        form = EvaluationForm(instance=evaluation)
    return render(request, 'Titulacion/evaluation_form.html', {'form': form})

def evaluation_delete(request, pk):
    evaluation = get_object_or_404(Evaluation, pk=pk)
    if request.method == 'POST':
        evaluation.delete()
        return redirect('evaluation_list')
    return render(request, 'Titulacion/evaluation_confirm_delete.html', {'evaluation': evaluation})

def document_list(request):
    documents = Document.objects.all()
    return render(request, 'Titulacion/document_list.html', {'documents': documents})

def document_create(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('document_list')
    else:
        form = DocumentForm()
    return render(request, 'Titulacion/document_form.html', {'form': form})

def document_update(request, pk):
    document = get_object_or_404(Document, pk=pk)
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES, instance=document)
        if form.is_valid():
            form.save()
            return redirect('document_list')
    else:
        form = DocumentForm(instance=document)
    return render(request, 'Titulacion/document_form.html', {'form': form})

def document_delete(request, pk):
    document = get_object_or_404(Document, pk=pk)
    if request.method == 'POST':
        document.delete()
        return redirect('document_list')
    return render(request, 'Titulacion/document_confirm_delete.html', {'document': document})