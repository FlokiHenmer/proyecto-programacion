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

# -------------------------------------------------------------------
# 3. VEHÍCULO / UNIDAD DE FLOTA
# -------------------------------------------------------------------
class Vehicle(models.Model):
    license_plate = models.CharField(
        max_length=15, 
        unique=True, 
        verbose_name="Patente / Dominio"
    )
    brand = models.CharField(max_length=50, verbose_name="Marca")
    model = models.CharField(max_length=50, verbose_name="Modelo")
    year = models.PositiveIntegerField(verbose_name="Año")
    chassis_number = models.CharField(
        max_length=50, 
        unique=True, 
        blank=True, 
        null=True, 
        verbose_name="Número de Chasis"
    )
    kilometers = models.PositiveIntegerField(default=0, verbose_name="Kilometraje Actual")
    # Relación $1:N$ con Empresa (un vehículo pertenece a una flota/empresa)
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='vehicles',
        verbose_name="Empresa"
    )

    def __str__(self):
        return f"{self.license_plate} - {self.brand} {self.model}"

# -------------------------------------------------------------------
# 4. PUESTA EN MARCHA
# -------------------------------------------------------------------

class StartUpChecklist(models.Model):
    class ControlType(models.TextChoices):
        REGULAR = 'REGULAR', 'Regular'
        PRE_TRIP = 'PRE_TRIP', 'Previaje'

    class OverallStatus(models.TextChoices):
        SUITABLE = 'SUITABLE', 'Apto para trabajar'
        CAUTION = 'CAUTION', 'Operar con precaución'
        UNSUITABLE = 'UNSUITABLE', 'No apto para conducir'

    class OilStatus(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        REGULAR = 'REGULAR', 'Regular'
        LOW = 'BAJO', 'Bajo'

    class CoolantStatus(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        REGULAR = 'REGULAR', 'Regular'
        EMPTY = 'VACIO', 'Vacío'

    class TireStatus(models.TextChoices):
        GOOD = 'BUENO', 'Bueno'
        BAD = 'MALO', 'Malo'

    class StandardStatus(models.TextChoices):
        FUNCTIONAL = 'FUNCIONAL', 'Funcional'
        FAULT = 'FALLA', 'Falla detectada'

    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='startup_checklists', verbose_name="Vehículo")
    operator = models.ForeignKey(User, on_delete=models.PROTECT, related_name='startup_checklists', verbose_name="Operario")
    date = models.DateTimeField(auto_now_add=True, verbose_name="Fecha / Hora")
    kilometers = models.PositiveIntegerField(verbose_name="Kilometraje")
    control_type = models.CharField(max_length=10, choices=ControlType.choices, default=ControlType.REGULAR, verbose_name="Tipo de Control")

    oil_level = models.CharField(max_length=10, choices=OilStatus.choices, verbose_name="Aceite")
    oil_observations = models.TextField(blank=True, null=True, verbose_name="Obs. Aceite")

    coolant_level = models.CharField(max_length=10, choices=CoolantStatus.choices, verbose_name="Refrigerante")
    coolant_observations = models.TextField(blank=True, null=True, verbose_name="Obs. Refrigerante")

    tires_status = models.CharField(max_length=10, choices=TireStatus.choices, verbose_name="Cubiertas")
    tires_observations = models.TextField(blank=True, null=True, verbose_name="Obs. Cubiertas")

    lights_status = models.CharField(max_length=10, choices=StandardStatus.choices, verbose_name="Luces")
    lights_observations = models.TextField(blank=True, null=True, verbose_name="Obs. Luces")

    brakes_status = models.CharField(max_length=10, choices=StandardStatus.choices, verbose_name="Frenos")
    brakes_observations = models.TextField(blank=True, null=True, verbose_name="Obs. Frenos")

    overall_status = models.CharField(max_length=15, choices=OverallStatus.choices, blank=True, verbose_name="Estado General")
    reported_to = models.CharField(max_length=150, blank=True, null=True, verbose_name="Reportado a")

    def calculate_overall_status(self):
        if (
            self.brakes_status == self.StandardStatus.FAULT or
            self.oil_level == self.OilStatus.LOW or
            self.coolant_level == self.CoolantStatus.EMPTY
        ):
            return self.OverallStatus.UNSUITABLE

        if (
            self.lights_status == self.StandardStatus.FAULT or
            self.tires_status == self.TireStatus.BAD or
            self.oil_level == self.OilStatus.REGULAR or
            self.coolant_level == self.CoolantStatus.REGULAR
        ):
            return self.OverallStatus.CAUTION

        return self.OverallStatus.SUITABLE

    def clean(self):
        super().clean()
        # Validar que el operario pertenezca a la misma empresa que el vehículo
        if self.operator and self.vehicle and self.operator.company != self.vehicle.company:
            from django.core.exceptions import ValidationError
            raise ValidationError({'operator': 'El operario debe pertenecer a la misma empresa que el vehículo.'})

        # Validar que el kilometraje ingresado no sea menor al actual del vehículo
        if self.vehicle and self.kilometers:
            if self.kilometers < self.vehicle.kilometers:
                from django.core.exceptions import ValidationError
                raise ValidationError({
                    'kilometers': f'El kilometraje ingresado ({self.kilometers} km) no puede ser menor al actual ({self.vehicle.kilometers} km).'
                })

    def save(self, *args, **kwargs):
#        1. Ejecuta las validaciones de clean()
        self.full_clean()

        # 2. Calcula automáticamente el estado general
        self.overall_status = self.calculate_overall_status()

        # 3. Guarda la Puesta en Marcha en la BD
        super().save(*args, **kwargs)
        # 4. Actualiza el kilometraje del auto si el nuevo valor es mayor
        if self.kilometers > self.vehicle.kilometers:
            self.vehicle.kilometers = self.kilometers
            self.vehicle.save(update_fields=['kilometers'])

    def __str__(self):
        return f"Checklist #{self.id} - {self.vehicle.license_plate} ({self.get_overall_status_display()})"