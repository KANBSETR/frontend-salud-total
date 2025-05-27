export interface Cita {
    idcita: number;
    fecen: string;
    horacitainicio: string;
    horacitatermino: string;
    motivocita: string;
    token_cita: string;
    idmedico: string;
    idpaciente: string;
    idseguro: string;
    idestado: string;
}

export interface CitaSend {
    fecha: string;
    horaInicio: string;
    horaTermino: string;
    correo: string;
    rutMedico: string;
    rutPaciente: string;
}