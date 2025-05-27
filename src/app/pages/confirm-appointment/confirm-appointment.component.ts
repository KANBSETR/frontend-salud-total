import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CitasService } from '../../services/citas.service';
import { FormsModule } from '@angular/forms';
import { Cita } from '../../models/cita';

@Component({
  selector: 'app-confirm-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './confirm-appointment.component.html',
  styleUrls: ['./confirm-appointment.component.css']
})
export class ConfirmAppointmentComponent implements OnInit {
  cita: any = null;
  infoMedico: any = null;

  rut: string = '';
  correo: string = '';
  direccion: string = '';
  celular: string = '';


  constructor(
    private router: Router,
    private citasService: CitasService
  ) { }

  ngOnInit(): void {
    const citaStr = localStorage.getItem('citaSeleccionada');
    const infoMedicoStr = localStorage.getItem('infoMedico');
    if (infoMedicoStr) {
      this.infoMedico = JSON.parse(infoMedicoStr);
    }
    if (citaStr) {
      this.cita = JSON.parse(citaStr);
    }
  }

  async confirmarCita() {
    const result = await Swal.fire({
      title: '¿Desea confirmar?',
      text: 'Su cita está a punto de ser agendada, ¿desea confirmar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmo',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#43a047',
      cancelButtonColor: '#d33',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      // Obtenemos y limpiamos los datos ingresados por el usuario
      const rutGuardado = this.rut.trim();
      const correoGuardado = this.correo.trim();

      const citaString = localStorage.getItem('citaSeleccionada');
      if (citaString) {
        const citaOriginal = JSON.parse(citaString);
        const citaFinal = {
          fecha: citaOriginal.fecha,
          horaInicio: citaOriginal.horaInicio,
          horaTermino: citaOriginal.horaTermino,
          correo: correoGuardado,
          rutMedico: citaOriginal.rutMedico || (this.infoMedico ? this.infoMedico.rut : ''),
          rutPaciente: rutGuardado
        } as Partial<Cita>;


        // Actualizamos localStorage (opcional, si necesitas mantener a la vista la cita reconstruida)
        localStorage.setItem('citaSeleccionada', JSON.stringify(citaFinal));
        console.log('Cita actualizada:', citaFinal);

        try {
          // Llamada al servicio para crear la cita en el backend
          const respuesta: Cita = await this.citasService.crearCita(citaFinal);
          console.log('Respuesta del servicio:', respuesta);
          await Swal.fire(
            '¡Cita agendada!',
            'Su cita ha sido confirmada y guardada en el sistema.',
            'success'
          );
          // Redirige al usuario o realiza la acción que necesites
          this.router.navigate(['/']);
        } catch (error) {
          console.error('Error al crear la cita:', error);
          Swal.fire('Error', 'Ocurrió un error al crear la cita.', 'error');
        }
      } else {
        console.warn('No se encontró "citaSeleccionada" en localStorage');
        Swal.fire('Error', 'No se encontró la información de la cita.', 'error');
      }
    }
  }
}
