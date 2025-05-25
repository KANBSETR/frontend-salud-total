import { Injectable } from '@angular/core';

export interface Cita {
  idcita: number;
  fecen: string; 
  horacitainicio: string; 
  horacitatermino: string; 
  motivocita: string;
  token_cita: string;
  idmedico: number;
  idpaciente: number;
  idseguro: number;
  idestado: number;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private baseUrl = 'tuAPIchula';

  async getCitas(): Promise<Cita[]> {
    const response = await fetch(`${this.baseUrl}/citas`);
    if (!response.ok) throw new Error('Error al obtener citas');
    return await response.json();
  }

  async getCitaPorRut(rut: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/citas/rut/${rut}`);
    if (!response.ok) throw new Error('No se encontró la reserva');
    return await response.json();
  }

  async crearCita(cita: Partial<Cita>): Promise<Cita> {
    const response = await fetch(`${this.baseUrl}/citas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cita)
    });
    if (!response.ok) throw new Error('Error al crear la cita');
    return await response.json();
  }
}