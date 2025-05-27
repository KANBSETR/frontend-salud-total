import { Injectable } from '@angular/core';
import { Horario } from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private baseUrl = "https://api.nicodia.dev";
  // private baseUrl = "http://localhost:4000";

  async getHorarioMedico(id: any): Promise<Horario[]> {
    const res = await fetch(`${this.baseUrl}/medicos/horario/${id}`);
    if (!res.ok) throw new Error('Error al obtener horario');
    return await res.json();
  }
}
