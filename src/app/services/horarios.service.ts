import { Injectable } from '@angular/core';

export interface Horario {
  id_horario: number;
  fecha: string; 
  hora_inicio: string; 
  hora_salida: string; 
  id_medico: number;
}

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private baseUrl = 'api';

  async getHorarioMedico(id: number): Promise<Horario> {
    const res = await fetch(`${this.baseUrl}/medicos/horario/${id}`);
    if (!res.ok) throw new Error('Error al obtener horario');
    return await res.json();
  }

  async getHorarioPorMedico(id_medico: number): Promise<number> {
  const res = await fetch(`api/medicos/horario/${id_medico}`);
  if (!res.ok) throw new Error('Error al obtener horario');
  const data = await res.json();
  return data.id_horario;
}

}
