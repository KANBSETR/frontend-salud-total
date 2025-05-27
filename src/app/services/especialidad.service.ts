import { Injectable } from '@angular/core';
import { Especialidad } from '../models/especialidad';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private baseUrl = "https://api.nicodia.dev";
  // private baseUrl = "http://localhost:4000";

  async getEspecialidades(): Promise<Especialidad[]> {
    const response = await fetch(`${this.baseUrl}/especialidades`);
    if (!response.ok) throw new Error('Error al obtener especialidades');
    return await response.json();
  }

  async getMedicosPorEspecialidad(idEspecialidad: number): Promise<Medico[]> {
    const response = await fetch(`${this.baseUrl}/medicos/especialidad/${idEspecialidad}`);
    if (!response.ok) throw new Error('Error al obtener médicos');
    return await response.json();
  }
}
