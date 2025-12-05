export interface LogFinanciero {
    clave_usuario: string;
    nombre: string;
    monto: number;
    fecha?: string;
    concepto?: string;
}

export interface Deudor {
    clave_usuario: string;
    nombre: string;
    monto_adeudo: number;
}

export interface RegistroAsistencia {
    clave_usuario: string;
    nombre: string;
    hora_entrada: string;
    fecha?: string;
}
