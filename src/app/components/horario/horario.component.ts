import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})

export class HorarioComponent implements OnChanges {
  @Input() horarioId: any[] = [];
  @Input() fechaSeleccionada: string = '';
  @Input() idMedico!: number;
  @Input() idEspecialidad!: number;
  @Input() horaSeleccionadaMarcada: string | null = null;
  @Output() horaSeleccionada = new EventEmitter<any>();

  bloques: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fechaSeleccionada'] || changes['horarioId']) {
      this.cargarHoras();
    }
  }

  cargarHoras(): void {
    if (!this.fechaSeleccionada || !this.horarioId?.length) return;
    const horariosDelDia = this.horarioId.filter(h => {
      const fecha = new Date(h.horasalida);
      const formateada = fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      return formateada === this.fechaSeleccionada;
    });

    this.bloques = horariosDelDia.map(h => h.horainicio.slice(0, 5)); // ej: "10:00"
  }

  seleccionarHora(hora: string): void {
    this.horaSeleccionada.emit({
      id_especialidad: this.idEspecialidad,
      id_medico: this.idMedico,
      fecha: this.fechaSeleccionada,
      hora: hora
    });
  }
}