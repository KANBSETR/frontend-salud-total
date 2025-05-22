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
  @Input() idMedico!: number;
  //@Input() rutMedico!: string;
  @Input() idEspecialidad!: number;


  @Input() horaSeleccionadaMarcada: string | null = null; 
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
      const hora = fecha.toTimeString().slice(0, 5); 
      bloques.push(hora);
      fecha = new Date(fecha.getTime() + 15 * 60 * 1000);
    }

    return bloques;
  }

  seleccionarHora(hora: string): void {
    this.horaSeleccionada.emit({
      id_especialidad: this.idEspecialidad,
      id_medico: this.idMedico,
      fecha: this.fecha,
      hora: hora
    });
  }
  //rut paciente

  
  
}
