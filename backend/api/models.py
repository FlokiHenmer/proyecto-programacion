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

# -------------------------------------------------------------------
# 5. INSPECCIÓN / REVISIÓN TÉCNICA (Mecánico)
# -------------------------------------------------------------------
class TechnicalInspection(models.Model):
    # --- CHOICES GENERALES ---
    class GeneralDiagnosis(models.TextChoices):
        OPTIMAL = 'OPTIMO', 'Óptimo'
        MAINTENANCE_REQUIRED = 'MANTENIMIENTO', 'Requiere mantenimiento'
        REPAIR_REQUIRED = 'REPARACION', 'Requiere reparación'

    class OptionYesNo(models.TextChoices):
        YES = 'SI', 'Sí'
        NO = 'NO', 'No'

    class OptionGoodBad(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        BAD = 'MALO', 'Malo'

    class OptionGoodProblem(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        PROBLEM = 'PROBLEMA', 'Problema'

    class OptionGoodChange(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        CHANGE = 'CAMBIAR', 'Cambiar'

    # Choices específicos por sección
    class OilLevel(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        LOW = 'BAJO', 'Bajo'
        EXCESS = 'EXCESO', 'Exceso'

    class OilCondition(models.TextChoices):
        NORMAL = 'NORMAL', 'Normal'
        CONTAMINATED = 'CONTAMINADO', 'Contaminado'
        BURNT = 'QUEMADO', 'Quemado'

    class CoolantCondition(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        CONTAMINATED = 'CONTAMINADO', 'Contaminado'
        OTHER = 'OTRO', 'Otro'

    class TempWork(models.TextChoices):
        NORMAL = 'NORMAL', 'Normal'
        HIGH = 'ALTA', 'Alta'

    class ClutchStatus(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        WEAR = 'DESGASTE', 'Desgaste'

    class GearboxStatus(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        NOISES = 'RUIDOS', 'Ruidos'
        HARD = 'DURA', 'Dura'

    class BrakeDiscsStatus(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        WEAR = 'DESGASTE', 'Desgaste'

    class FluidState(models.TextChoices):
        OK = 'OK', 'OK'
        CONTAMINATED = 'CONTAMINADO', 'Contaminado'

    class RearBrakesStatus(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        REGULAR = 'REGULAR', 'Regular'

    class TreadDepthStatus(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        LIMIT = 'LIMITE', 'Límite'

    class PressureStatus(models.TextChoices):
        GOOD = 'BIEN', 'Bien'
        LOW = 'BAJO', 'Bajo'


    # --- ENCABEZADO ---
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='inspections', verbose_name="Vehículo")
    mechanic = models.ForeignKey(User, on_delete=models.PROTECT, related_name='inspections', verbose_name="Mecánico")
    date = models.DateField(verbose_name="Fecha")
    kilometers = models.PositiveIntegerField(verbose_name="Kilómetros")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Registrado el")

    # --- 1. MOTOR ---
    engine_oil_level = models.CharField(max_length=10, choices=OilLevel.choices, verbose_name="Nivel de aceite")
    engine_oil_condition = models.CharField(max_length=15, choices=OilCondition.choices, verbose_name="Estado del aceite")
    engine_oil_leaks = models.CharField(max_length=2, choices=OptionYesNo.choices, verbose_name="Pérdidas de aceite")
    engine_coolant_level = models.CharField(max_length=10, choices=OilLevel.choices, verbose_name="Nivel del refrigerante")
    engine_coolant_condition = models.CharField(max_length=15, choices=CoolantCondition.choices, verbose_name="Estado del refrigerante")
    engine_coolant_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. refrigerante")
    engine_temp = models.CharField(max_length=10, choices=TempWork.choices, verbose_name="Temperatura de trabajo")
    engine_general_obs = models.TextField(blank=True, null=True, verbose_name="Observaciones motor")

    # --- 2. TRANSMISIÓN ---
    trans_clutch = models.CharField(max_length=10, choices=ClutchStatus.choices, verbose_name="Embrague")
    trans_gearbox = models.CharField(max_length=10, choices=GearboxStatus.choices, verbose_name="Caja de cambios")
    trans_leaks = models.CharField(max_length=2, choices=OptionYesNo.choices, verbose_name="Pérdidas transmisión")
    trans_leaks_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. pérdidas")
    trans_general_obs = models.TextField(blank=True, null=True, verbose_name="Observaciones transmisión")

    # --- 3. SISTEMA DE FRENOS ---
    brakes_front_pads = models.CharField(max_length=10, choices=OptionGoodChange.choices, verbose_name="Pastillas delanteras")
    brakes_front_pads_wear_pct = models.PositiveIntegerField(blank=True, null=True, verbose_name="% Desgaste pastillas")
    brakes_discs = models.CharField(max_length=10, choices=BrakeDiscsStatus.choices, verbose_name="Discos")
    brakes_discs_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. discos")
    brakes_fluid_level = models.CharField(max_length=10, choices=OilLevel.choices, verbose_name="Nivel líquido de frenos")
    brakes_fluid_state = models.CharField(max_length=15, choices=FluidState.choices, verbose_name="Estado líquido de frenos")
    brakes_fluid_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. líquido")
    brakes_rear = models.CharField(max_length=10, choices=RearBrakesStatus.choices, verbose_name="Freno trasero (Cintas/Tambor)")
    brakes_rear_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. freno trasero")
    brakes_general_obs = models.TextField(blank=True, null=True, verbose_name="Observaciones generales frenos")

    # --- 4. SUSPENSIÓN Y TREN DELANTERO ---
    susp_shock_absorbers = models.CharField(max_length=10, choices=OptionGoodBad.choices, verbose_name="Amortiguadores")
    susp_shock_absorbers_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. amortiguadores")
    susp_ball_joints = models.CharField(max_length=10, choices=OptionGoodBad.choices, verbose_name="Rótulas")
    susp_ball_joints_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. rótulas")
    susp_bushings = models.CharField(max_length=10, choices=OptionGoodBad.choices, verbose_name="Bujes de parrilla")
    susp_bushings_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. bujes")
    susp_tie_rod_ends = models.CharField(max_length=10, choices=OptionGoodBad.choices, verbose_name="Extremos de dirección")
    susp_tie_rod_ends_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. extremos")
    susp_sway_bar = models.CharField(max_length=10, choices=OptionGoodBad.choices, verbose_name="Barra estabilizadora")
    susp_sway_bar_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. barra")
    susp_general_obs = models.TextField(blank=True, null=True, verbose_name="Observaciones generales suspensión")

    # --- 5. SISTEMA ELÉCTRICO ---
    elec_battery = models.CharField(max_length=10, choices=OptionGoodProblem.choices, verbose_name="Batería")
    elec_battery_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. batería")
    elec_charging_system = models.CharField(max_length=10, choices=OptionGoodProblem.choices, verbose_name="Sistema de carga")
    elec_charging_system_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. sistema de carga")
    elec_lights = models.CharField(max_length=10, choices=OptionGoodProblem.choices, verbose_name="Luces (Altas/Bajas/Stop/Giro)")
    elec_lights_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. luces")

    # --- 6. CORREAS Y DISTRIBUCIÓN ---
    belts_auxiliary = models.CharField(max_length=10, choices=OptionGoodChange.choices, verbose_name="Correas auxiliares")
    belts_auxiliary_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Obs. correas auxiliares")
    belts_distribution_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Distribución")
    belts_water_pump_obs = models.CharField(max_length=200, blank=True, null=True, verbose_name="Bomba de agua")
    belts_general_obs = models.TextField(blank=True, null=True, verbose_name="Observaciones generales correas")

    # --- 7. NEUMÁTICOS ---
    tires_tread_depth = models.CharField(max_length=10, choices=TreadDepthStatus.choices, verbose_name="Profundidad del dibujo")
    tires_tread_depth_mm = models.DecimalField(max_digits=4, decimal_places=1, verbose_name="Profundidad (mm)")
    tires_pressure = models.CharField(max_length=10, choices=PressureStatus.choices, verbose_name="Presión")
    tires_pressure_psi = models.PositiveIntegerField(blank=True, null=True, verbose_name="Presión (PSI)")
    tires_obs = models.TextField(blank=True, null=True, verbose_name="Observaciones neumáticos")

    # --- 8. DIAGNÓSTICO GENERAL ---
    diagnosis = models.CharField(max_length=20, choices=GeneralDiagnosis.choices, verbose_name="Diagnóstico general")
    recommended_actions = models.TextField(blank=True, null=True, verbose_name="Acciones recomendadas")

    def clean(self):
        super().clean()
        # Solo mecánicos pueden realizar este informe
        if self.mechanic and self.mechanic.role != User.Role.MECHANIC:
            from django.core.exceptions import ValidationError
            raise ValidationError({'mechanic': 'Solo un usuario con rol Mecánico puede registrar una inspección técnica.'})

        # Validar odómetro coherente
        if self.vehicle and self.kilometers:
            if self.kilometers < self.vehicle.kilometers:
                from django.core.exceptions import ValidationError
                raise ValidationError({'kilometers': f'El kilometraje ({self.kilometers} km) no puede ser inferior al actual ({self.vehicle.kilometers} km).'})

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

        # Actualiza el odómetro del auto si el kilometraje es mayor
        if self.kilometers > self.vehicle.kilometers:
            self.vehicle.kilometers = self.kilometers
            self.vehicle.save(update_fields=['kilometers'])

    def __str__(self):
        return f"Inspección #{self.id} - {self.vehicle.license_plate} ({self.get_diagnosis_display()})"