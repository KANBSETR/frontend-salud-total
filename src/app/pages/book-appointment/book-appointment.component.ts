import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../../services/especialidad.service';
import { Especialidad } from '../../models/especialidad';
import { Medico } from '../../models/medico';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HorariosService } from '../../services/horarios.service';
import { HorarioComponent } from '../../components/horario/horario.component';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Cita } from '../../models/cita';
@Component({
  selector: 'app-book-appointment',
  imports: [FormsModule, CommonModule, HorarioComponent],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit {
  fechasDisponibles: string[] = [];
  horarioId: any;
  horaSeleccionada: string | null = null;

  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  rutMedicoSeleccionado: string = '';

  seleccionadaEspecialidad?: number;
  seleccionMedico?: number;

  citaSeleccionada: any;
  infoMedico: any;


  async cargarHorarioMedico(idMedico: number) {
    try {
      const horarios = await this.servicioHorario.getHorarioMedico(idMedico);
      // Extraer fechas disponibles
      this.fechasDisponibles = horarios.map((h: any) => {
        const fecha = new Date(h.horasalida);
        return fecha.toLocaleDateString('es-ES', {
          weekday: 'long',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      });

      // Guardar horario completo si necesitas pasarlo a <app-horario>
      this.horarioId = horarios;

    } catch (error) {
      console.error('Error al cargar horario:', error);
    }
  }

  fechaSeleccionada: string = '';

  seleccionarFecha(fecha: string): void {
    this.fechaSeleccionada = fecha;
  }
  constructor(private servicio: EspecialidadService, private servicioHorario: HorariosService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.especialidades = await this.servicio.getEspecialidades();
  }

  async onEspecialidadChange(): Promise<void> {
    if (!this.seleccionadaEspecialidad) return;
    this.medicos = await this.servicio.getMedicosPorEspecialidad(this.seleccionadaEspecialidad);
    console.log('Médicos cargados:', this.medicos);
  }

  async onMedicoChange(): Promise<void> {
    if (!this.seleccionMedico) return;
    const medico = this.medicos.find(m => m.idmedico === this.seleccionMedico);
    this.rutMedicoSeleccionado = medico ? medico.rut : '';
    this.horarioId = await this.servicioHorario.getHorarioMedico(this.seleccionMedico);
    this.fechasDisponibles = this.horarioId.map((h: any) => {
      const fecha = new Date(h.horasalida);
      return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    });
  }

  getNombreCompleto(medico: Medico): string {
    return `${medico.nombre} ${medico.appaterno} ${medico.apmaterno}`;
  }

  onHoraSeleccionada(cita: any): void {
    this.horaSeleccionada = cita.hora;
    const medicoSeleccionado = this.medicos.find(m => m.idmedico === this.seleccionMedico);
    const especialidadSeleccionada = this.especialidades.find(e => e.idespecialidad === this.seleccionadaEspecialidad);
    this.infoMedico = {
      medico: medicoSeleccionado ? this.getNombreCompleto(medicoSeleccionado) : '',
      especialidad: especialidadSeleccionada ? especialidadSeleccionada.nomespe : '',
    };
    // Parse la hora de inicio
    const horaInicioDate = new Date(`1970-01-01T${cita.hora}:00`);
    // Sumar 15 minutos
    const horaTerminoDate = new Date(horaInicioDate.getTime() + 15 * 60000);
    // Formatear la hora de término a "HH:mm"
    const horaTermino = horaTerminoDate.toTimeString().slice(0,5);

    this.citaSeleccionada = {
      fecha: cita.fecha,
      horaInicio: cita.hora,
      horaTermino: horaTermino,
      correo: '',
      rutMedico: this.rutMedicoSeleccionado,
      rutPaciente: '', // Esto se cargará después
    };
    
    console.log('Información del médico:', this.infoMedico);
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
        localStorage.setItem('infoMedico', JSON.stringify(this.infoMedico));
        this.router.navigate(['/confirmar-cita']); //Limpiar dsp
      }
    });
  }


}
