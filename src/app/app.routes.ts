import { Routes } from '@angular/router';
import { ConfirmAppointmentComponent } from './components/confirm-appointment/confirm-appointment.component';


//Diferencia de cargar las rutas
// Importar el componente arriba es util para componentes que se utilizan frecuentemente o deben estar disponibles inmediatamente
// Ej: Pagina principal, menúes, homes y vistas que el usuario ve casi siempre

// En loadComponent, angular se encarga de cargar la ruta cuando se navegue a ella, es para rutas menos criticas para la carga inicial
// Ej: Vistas secundarias, de consulta o menos frecuente (Esto mejora el perfomance inicial)

export const routes: Routes = [
    {
        path: 'reservar-cita',

        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'confirmar-cita',
        component: ConfirmAppointmentComponent
    },
    {
        path: 'consultar-cita',
        loadComponent: () => import('./components/check-appointment/check-appointment.component').then(m => m.CheckAppointmentComponent)
    },
    {
        path: '',
        redirectTo: 'reservar-cita',
        pathMatch: 'full'
    }
];
