from django.contrib.auth.models import AbstractUser
from django.db import models

# -------------------------------------------------------------------
# 1. EMPRESA / CLIENTE
# -------------------------------------------------------------------

class Company(models.Model):
    name = models.CharField(max_length=100)
    cuit = models.CharField(max_length=20, unique=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.name

# -------------------------------------------------------------------
# 2. USUARIOS Y ROLES
# -------------------------------------------------------------------

class User(AbstractUser):
    # Opciones de roles para el sistema
    class Role(models.TextChoices):
        MECHANIC = 'MECHANIC', 'Mecánico / Taller'
        COMPANY_MANAGER = 'COMPANY_MANAGER', 'Gerente de Empresa'
        OPERATOR = 'OPERATOR', 'Operario / Conductor'

    # Campo para guardar el rol actual del usuario
    role = models.CharField(
        max_length=20, 
        choices=Role.choices, 
        default=Role.MECHANIC
    )
    
    # Campo opcional para el teléfono de contacto
    phone = models.CharField(max_length=20, blank=True, null=True)

    # Relación a la empresa (obligatoria para Gerente/Operario, nula para Mecánico)
    company = models.ForeignKey(
        Company,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users'
    )

    # Validación personalizada para asegurar que los roles de Gerente y Operario tengan una empresa asociada
    def clean(self):
        super().clean()
        # Si el rol es Gerente u Operario y no tiene empresa, lanzamos error
        if self.role in [self.Role.COMPANY_MANAGER, self.Role.OPERATOR] and not self.company:
            from django.core.exceptions import ValidationError
            raise ValidationError({'company': 'Los gerentes y operarios deben pertenecer a una empresa.'})

    def __str__(self):
        # Esto define cómo se muestra el usuario cuando lo imprimís en consola o panel admin
        return f"{self.username} - {self.get_role_display()}"