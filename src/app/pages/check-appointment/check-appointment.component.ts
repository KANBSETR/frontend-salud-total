import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CitaResponse } from '../../models/cita';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-check-appointment',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './check-appointment.component.html',
  styleUrl: './check-appointment.component.css'
})
export class CheckAppointmentComponent {
  rut: string = '';
  buscado: boolean = false;
  citas: CitaResponse[] = [];


  constructor(private citasService: CitasService, private router: Router) { }

  // Buscar citas por RUT
  async buscarReserva(): Promise<boolean> {
    this.buscado = true;
    this.citas = [];

    try {
      const resultado = await this.citasService.getCitaPorRut(this.rut.trim());
      this.citas = Array.isArray(resultado) ? resultado : [resultado];
    } catch (error) {
      console.error('Error al buscar citas:', error);
      this.citas = [];
    }

    return false; // Evita que el formulario se recargue
  }

  // Confirmar cita
  confirmarCita(token: string): void {
    Swal.fire({
      title: '¿Desea confirmar la cita?',
      text: '¿Está seguro que desea confirmar esta cita?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#43a047',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes llamar a un servicio para confirmar
        Swal.fire('¡Cita confirmada!', 'La cita ha sido confirmada exitosamente.', 'success');
      }
    });
  }

  // Cancelar cita
  cancelarCita(token: string): void {
    Swal.fire({
      title: '¿Desea cancelar la cita?',
      text: 'Esta acción no se puede deshacer. ¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No',
      confirmButtonColor: '#e53935',
      cancelButtonColor: '#bdbdbd',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes llamar a un servicio para cancelar
        Swal.fire('Cita cancelada', 'La cita ha sido cancelada.', 'success');

        // Opcional: eliminar de la lista sin volver a llamar al backend
        this.citas = this.citas.filter(c => c.token_cita !== token);
      }
    });
  }

  // Reprogramar cita
  reprogramarCita(token: string): void {
    Swal.fire({
      title: 'Reprogramar cita',
      text: 'Será redirigido para reprogramar su cita.',
      icon: 'info',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#007BFF'
    }).then(() => {
      this.router.navigate(['/reservar-cita'], { queryParams: { token } });
    });
  }

  // Helpers de formato
  getFecha(datetime: string): string {
    return new Date(datetime).toLocaleDateString('es-CL');
  }

  getHora(datetime: string): string {
    return new Date(datetime).toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
