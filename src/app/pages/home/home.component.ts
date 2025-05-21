import { Component, OnInit } from '@angular/core';
import { EspecialidadService, Especialidad, Medico } from '../../services/especialidad.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HorariosService } from '../../services/horarios.service';
import { HorarioComponent } from '../../components/horario/horario.component';
@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, HorarioComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];

  horarioId?: number;
  
  seleccionadaEspecialidad?: number;
  seleccionMedico?: number;

  constructor(private servicio: EspecialidadService, private servicioHorario: HorariosService) { }

  async ngOnInit(): Promise<void> {
    this.especialidades = await this.servicio.getEspecialidades();
  }

  async onEspecialidadChange(): Promise<void> {
    if (!this.seleccionadaEspecialidad) return;
    this.medicos = await this.servicio.getMedicosPorEspecialidad(this.seleccionadaEspecialidad);
  }

  async onMedicoChange(): Promise<void> {
    if (!this.seleccionMedico) return;

    // Obtener el horario para el médico seleccionado
    this.horarioId = await this.servicioHorario.getHorarioPorMedico(this.seleccionMedico);
  }


  getNombreCompleto(medico: Medico): string {
    return `${medico.primer_nombre} ${medico.segundo_nombre} ${medico.apellido_paterno} ${medico.apellido_materno}`;
  }

  onHoraSeleccionada(cita: any): void {
  console.log('Cita seleccionada:', cita);
  // Aquí puedes guardarla o navegar al siguiente paso del flujo
}
}
