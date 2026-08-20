from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Company, User, Vehicle, StartUpChecklist, TechnicalInspection


# -------------------------------------------------------------------
# 1. ADMIN DE EMPRESA
# -------------------------------------------------------------------

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'cuit', 'phone', 'address')
    search_fields = ('name', 'cuit')

# -------------------------------------------------------------------
# 2. ADMIN DE USUARIO (Personalizado)
# -------------------------------------------------------------------    

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Definimos qué columnas ver en la lista
    list_display = (
        'username', 
        'email', 
        'first_name', 
        'last_name', 
        'role', 
        'company', 
        'is_staff'
    )

    # Filtros laterales en el panel admin
    list_filter = ('role', 'company', 'is_staff', 'is_active')
    
    # Campos por los que se puede buscar
    search_fields = ('username', 'first_name', 'last_name', 'email', 'company__name')

    # Agregamos nuestros campos personalizados a los formularios de edición
    fieldsets = UserAdmin.fieldsets + (
        ('Información de Flota y Rol', {
            'fields': ('role', 'company', 'phone')
        }),
    )

    # Agregamos los campos al formulario de creación de usuario nuevo
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Información de Flota y Rol', {
            'fields': ('role', 'company', 'phone')
        }),
    )

# -------------------------------------------------------------------
# 3. ADMIN DE VEHÍCULO
# -------------------------------------------------------------------
@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('id', 'license_plate', 'brand', 'model', 'year', 'company', 'kilometers')
    list_filter = ('company', 'brand', 'year')
    search_fields = ('license_plate', 'chassis_number', 'brand', 'model', 'company__name')

# -------------------------------------------------------------------
# 4. ADMIN DE PUESTA EN MARCHA
# -------------------------------------------------------------------

@admin.register(StartUpChecklist)
class StartUpChecklistAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'vehicle', 
        'operator', 
        'date', 
        'control_type', 
        'overall_status'
    )
    list_filter = ('overall_status', 'control_type', 'vehicle__company', 'date')
    search_fields = ('vehicle__license_plate', 'operator__username', 'reported_to')
    readonly_fields = ('overall_status', 'date')  # Se calculan automáticamente

# -------------------------------------------------------------------
# 5. ADMIN DE INSPECCIÓN TÉCNICA
# -------------------------------------------------------------------

@admin.register(TechnicalInspection)
class TechnicalInspectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'vehicle', 'mechanic', 'date', 'kilometers', 'diagnosis')
    list_filter = ('diagnosis', 'date', 'vehicle__company')
    search_fields = ('vehicle__license_plate', 'mechanic__username', 'recommended_actions')
    
    # Organizamos el panel en pestañas colapsables idénticas al frontend
    fieldsets = (
        ('Datos Generales', {
            'fields': ('vehicle', 'mechanic', 'date', 'kilometers')
        }),
        ('1. Motor', {
            'classes': ('collapse',),
            'fields': (
                ('engine_oil_level', 'engine_oil_condition', 'engine_oil_leaks'),
                ('engine_coolant_level', 'engine_coolant_condition', 'engine_coolant_obs'),
                'engine_temp', 'engine_general_obs'
            )
        }),
        ('2. Transmisión', {
            'classes': ('collapse',),
            'fields': (
                ('trans_clutch', 'trans_gearbox'),
                ('trans_leaks', 'trans_leaks_obs'),
                'trans_general_obs'
            )
        }),
        ('3. Sistema de Frenos', {
            'classes': ('collapse',),
            'fields': (
                ('brakes_front_pads', 'brakes_front_pads_wear_pct'),
                ('brakes_discs', 'brakes_discs_obs'),
                ('brakes_fluid_level', 'brakes_fluid_state', 'brakes_fluid_obs'),
                ('brakes_rear', 'brakes_rear_obs'),
                'brakes_general_obs'
            )
        }),
        ('4. Suspensión y Tren Delantero', {
            'classes': ('collapse',),
            'fields': (
                ('susp_shock_absorbers', 'susp_shock_absorbers_obs'),
                ('susp_ball_joints', 'susp_ball_joints_obs'),
                ('susp_bushings', 'susp_bushings_obs'),
                ('susp_tie_rod_ends', 'susp_tie_rod_ends_obs'),
                ('susp_sway_bar', 'susp_sway_bar_obs'),
                'susp_general_obs'
            )
        }),
        ('5. Sistema Eléctrico', {
            'classes': ('collapse',),
            'fields': (
                ('elec_battery', 'elec_battery_obs'),
                ('elec_charging_system', 'elec_charging_system_obs'),
                ('elec_lights', 'elec_lights_obs')
            )
        }),
        ('6. Correas y Distribución', {
            'classes': ('collapse',),
            'fields': (
                ('belts_auxiliary', 'belts_auxiliary_obs'),
                'belts_distribution_obs',
                'belts_water_pump_obs',
                'belts_general_obs'
            )
        }),
        ('7. Neumáticos', {
            'classes': ('collapse',),
            'fields': (
                ('tires_tread_depth', 'tires_tread_depth_mm'),
                ('tires_pressure', 'tires_pressure_psi'),
                'tires_obs'
            )
        }),
        ('Diagnóstico General', {
            'fields': ('diagnosis', 'recommended_actions')
        }),
    )