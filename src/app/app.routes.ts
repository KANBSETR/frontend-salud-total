import { Routes } from '@angular/router';
import { ConfirmAppointmentComponent } from './components/confirm-appointment/confirm-appointment.component';


export const routes: Routes = [
    {
        path: '',
        
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'confirmar-cita',
        component: ConfirmAppointmentComponent
    }
];
