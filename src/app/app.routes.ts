import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConfirmAppointmentComponent } from './pages/confirm-appointment/confirm-appointment.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { CheckAppointmentComponent } from './pages/check-appointment/check-appointment.component';
import { LoginComponent } from './pages/login/login.component';

//Diferencia de cargar las rutas
// Importar el componente arriba es util para componentes que se utilizan frecuentemente o deben estar disponibles inmediatamente
// Ej: Pagina principal, menúes, homes y vistas que el usuario ve casi siempre

// En loadComponent, angular se encarga de cargar la ruta cuando se navegue a ella, es para rutas menos criticas para la carga inicial
// Ej: Vistas secundarias, de consulta o menos frecuente (Esto mejora el perfomance inicial)

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'reservar-cita',
        component: BookAppointmentComponent
    },
    {
        path: 'consultar-cita',
        component: CheckAppointmentComponent
    },
    {
        path: 'confirmar-cita',
        component: ConfirmAppointmentComponent
    },
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'appointment-history',
        loadComponent: () => import('./pages/appointment-history/appointment-history.component').then(m => m.AppointmentHistoryComponent)
    },
    {   path: '**', 
        redirectTo: '/home' } // Ruta comodín para redirigir al home

];