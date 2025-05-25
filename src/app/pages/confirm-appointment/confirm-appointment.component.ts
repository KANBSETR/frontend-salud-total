import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-appointment',
  imports: [CommonModule],
  templateUrl: './confirm-appointment.component.html',
  styleUrl: './confirm-appointment.component.css'
})
export class ConfirmAppointmentComponent {

  constructor(private router: Router) {} 

  cita: any = null;

  ngOnInit(): void {
    const citaStr = localStorage.getItem('citaSeleccionada');
    if (citaStr) {
      this.cita = JSON.parse(citaStr);
      console.log('Cita recuperada:', this.cita);
    }
  }

  confirmarCita() {
    Swal.fire({
      title: '¿Desea confirmar?',
      text: 'Su cita está a punto de ser agendada, ¿desea confirmar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmo',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#43a047',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Cita agendada!', 'Su cita ha sido confirmada, se le enviara un correo con el detalle de la cita.', 'success').then(() => {
          this.router.navigate(['/']); 
        });
      }
    });
  }

}
