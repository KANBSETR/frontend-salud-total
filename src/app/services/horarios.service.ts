import { Injectable } from '@angular/core';

export interface Horario {
  id_horario: number;
  fecha: string; // ISO string
  hora_inicio: string; // "08:00:00"
  hora_salida: string; // "12:00:00"
  id_medico: number;
}

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private baseUrl = 'http://localhost:4000';

  async getHorarioMedico(id: number): Promise<Horario> {
    const res = await fetch(`${this.baseUrl}/medicos/horario/${id}`);
    if (!res.ok) throw new Error('Error al obtener horario');
    return await res.json();
  }

  async getHorarioPorMedico(id_medico: number): Promise<number> {
  const res = await fetch(`http://localhost:4000/medicos/horario/${id_medico}`);
  if (!res.ok) throw new Error('Error al obtener horario');
  const data = await res.json();
  return data.id_horario;
}

}
