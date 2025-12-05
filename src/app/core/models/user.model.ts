import { BaseModel } from './base.model';

export interface Usuario extends BaseModel {
    clave_usuario: string;
    nombre: string;
    telefono: string;
    email: string;
    fecha_vencimiento?: string;
    estatus?: 'Vigente' | 'No Vigente' | string;
    curp?: string;
    ruta_imagen?: string;
    qr_code?: string;
    asistencias?: Record<string, string>;
}
