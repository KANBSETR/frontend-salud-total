import { Injectable } from '@angular/core';

export interface Especialidad {
  id_especialidad: number;
  especialidad: string;
}

export interface Medico {
  id_medico: number;
  rut_medico: string;
  primer_nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  id_especialidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private baseUrl = 'api';

  async getEspecialidades(): Promise<Especialidad[]> {
    const response = await fetch(`${this.baseUrl}/especialidades`);
    if (!response.ok) throw new Error('Error al obtener especialidades');
    return await response.json();
  }

  async getMedicosPorEspecialidad(idEspecialidad: number): Promise<Medico[]> {
    const response = await fetch(`${this.baseUrl}/medicos/idEspecialidad/${idEspecialidad}`);
    if (!response.ok) throw new Error('Error al obtener médicos');
    return await response.json();
  }
}
