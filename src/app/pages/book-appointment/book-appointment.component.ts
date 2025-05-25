import { Component, OnInit } from '@angular/core';
import { EspecialidadService, Especialidad, Medico } from '../../services/especialidad.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HorariosService } from '../../services/horarios.service';
import { HorarioComponent } from '../../components/horario/horario.component';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-book-appointment',
  imports: [FormsModule, CommonModule, HorarioComponent],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit {

  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  rutMedicoSeleccionado: string = '';

  horarioId?: number;
  seleccionadaEspecialidad?: number;
  seleccionMedico?: number;

  horaSeleccionada: string | null = null;

  citaSeleccionada: any = null; 

  fechasDisponibles: string[] = [
    '2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04', '2024-07-05',
    '2024-07-06', '2024-07-07', '2024-07-08', '2024-07-09', '2024-07-10',
    '2024-07-11', '2024-07-12', '2024-07-13', '2024-07-14', '2024-07-15'
  ];

  fechaSeleccionada: string = this.fechasDisponibles[0];

  seleccionarFecha(fecha: string) {
    this.fechaSeleccionada = fecha;
  }

  constructor(private servicio: EspecialidadService, private servicioHorario: HorariosService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.especialidades = await this.servicio.getEspecialidades();
  }

  async onEspecialidadChange(): Promise<void> {
    if (!this.seleccionadaEspecialidad) return;
    this.medicos = await this.servicio.getMedicosPorEspecialidad(this.seleccionadaEspecialidad);
  }

  async onMedicoChange(): Promise<void> {
    if (!this.seleccionMedico) return;
    const medico = this.medicos.find(m => m.id_medico === this.seleccionMedico);
    this.rutMedicoSeleccionado = medico ? medico.rut_medico : '';
    this.horarioId = await this.servicioHorario.getHorarioPorMedico(this.seleccionMedico);
  }


  getNombreCompleto(medico: Medico): string {
    return `${medico.primer_nombre} ${medico.segundo_nombre} ${medico.apellido_paterno} ${medico.apellido_materno}`;
  }

  onHoraSeleccionada(cita: any): void {
    this.horaSeleccionada = cita.hora;
  
    const especialidadObj = this.especialidades.find(e => e.id_especialidad == cita.id_especialidad);
    const medicoObj = this.medicos.find(m => m.id_medico == cita.id_medico);
  
    this.citaSeleccionada = {
      id_especialidad: cita.id_especialidad,
      especialidad: especialidadObj ? especialidadObj.especialidad : '',
      id_medico: cita.id_medico,
      medico: medicoObj ? this.getNombreCompleto(medicoObj) : '',
      fecha: cita.fecha,
      hora: cita.hora
    };
  
    console.log('Cita seleccionada:', this.citaSeleccionada);
  }

  agendarCita() {
    Swal.fire({
      title: '¿Deseas continuar?',
      text: 'A continuación lo redirigiremos al detalle de su cita y el formulario para sus datos personales.',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'No continuar',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#43a047',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Guarda los datos en localStorage
        localStorage.setItem('citaSeleccionada', JSON.stringify(this.citaSeleccionada));
        this.router.navigate(['/confirmar-cita']); //Limpiar dsp
      }
    });
  }


}
