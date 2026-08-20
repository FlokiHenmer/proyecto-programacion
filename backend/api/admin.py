from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Company, User, Vehicle, StartUpChecklist


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