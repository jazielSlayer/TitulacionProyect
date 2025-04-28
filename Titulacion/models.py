from django.db import models

class Career(models.Model):
    name = models.CharField(max_length=100)
    faculty = models.CharField(max_length=100)
    duration_years = models.IntegerField()

    def __str__(self):
        return self.name

class Student(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    identification_number = models.CharField(max_length=20, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    career = models.ForeignKey(Career, on_delete=models.CASCADE)
    enrollment_date = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Professor(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    department = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class TitulationProject(models.Model):
    STATUS_CHOICES = [
        ('EN_PROGRESO', 'En Progreso'),
        ('APROBADO', 'Aprobado'),
        ('RECHAZADO', 'Rechazado'),
        ('PENDIENTE', 'Pendiente'),
    ]
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDIENTE')

    def __str__(self):
        return self.title

class Evaluation(models.Model):
    project = models.ForeignKey(TitulationProject, on_delete=models.CASCADE)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    evaluation_date = models.DateField()
    score = models.DecimalField(max_digits=4, decimal_places=2)
    comments = models.TextField(blank=True)

    def __str__(self):
        return f"Evaluación de {self.project.title} por {self.professor}"

class Document(models.Model):
    DOCUMENT_TYPE_CHOICES = [
        ('PROPUESTA', 'Propuesta'),
        ('INFORME_FINAL', 'Informe Final'),
        ('ACTA', 'Acta'),
        ('OTRO', 'Otro'),
    ]
    project = models.ForeignKey(TitulationProject, on_delete=models.CASCADE)
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPE_CHOICES)
    file_path = models.FileField(upload_to='documents/')
    upload_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.document_type} de {self.project.title}"