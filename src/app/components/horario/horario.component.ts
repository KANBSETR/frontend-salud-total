import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { HorariosService, Horario } from '../../services/horarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})

export class HorarioComponent implements OnInit {
   @Input() horarioId!: number;
  @Input() rutMedico!: string; // o idMedico, dependiendo de cómo manejas esto
  @Input() idEspecialidad!: number;

  @Output() horaSeleccionada = new EventEmitter<any>();

  bloques: string[] = [];
  fecha!: string;

  constructor(private horarioService: HorariosService) {}

  async ngOnInit(): Promise<void> {
    const horario = await this.horarioService.getHorarioMedico(this.horarioId);

    this.fecha = horario.fecha.split('T')[0]; // "YYYY-MM-DD"
    this.bloques = this.generarBloques(horario.hora_inicio, horario.hora_salida);
  }

  generarBloques(inicio: string, fin: string): string[] {
    const bloques: string[] = [];

    const [hIni, mIni] = inicio.split(':').map(Number);
    const [hFin, mFin] = fin.split(':').map(Number);

    let fecha = new Date();
    fecha.setHours(hIni, mIni, 0, 0);

    const finFecha = new Date();
    finFecha.setHours(hFin, mFin, 0, 0);

    while (fecha < finFecha) {
      const hora = fecha.toTimeString().slice(0, 5); // "HH:mm"
      bloques.push(hora);
      fecha = new Date(fecha.getTime() + 15 * 60 * 1000);
    }

    return bloques;
  }

  seleccionarHora(hora: string): void {
    const seleccion = {
      fecha: this.fecha,
      hora,
      rut_medico: this.rutMedico,
      rut_paciente: '', // lo definirás más adelante
      id_especialidad: this.idEspecialidad
    };

    this.horaSeleccionada.emit(seleccion);
  }
}
