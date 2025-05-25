import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

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
buscado = false;
cita: any = null;

constructor(private citasService: CitasService,  private router: Router) {}

  async buscarReserva() {
    this.buscado = true;
    this.cita = null;
    try {
      this.cita = await this.citasService.getCitaPorRut(this.rut.trim());
      // Si la API retorna un array, toma el primer elemento
      this.cita = Array.isArray(this.cita) ? this.cita[0] : this.cita;
    } catch (error) {
      this.cita = null;
    }
    return false; // Evita recarga del formulario
  }

  confirmarCita() {
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
        Swal.fire('¡Cita confirmada!', 'La cita ha sido confirmada exitosamente.', 'success');
      }
    });
  }

  cancelarCita() {
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
        Swal.fire('Cita cancelada', 'La cita ha sido cancelada.', 'success');
        this.cita = null;
        this.buscado = false;
        this.rut = '';
      }
    });
  }

  reprogramarCita() {
    Swal.fire({
      title: 'Reprogramar cita',
      text: 'Será redirigido para reprogramar su cita.',
      icon: 'info',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#007BFF'
    }).then(() => {
      this.router.navigate(['/reservar-cita']);
    });
  }
}
