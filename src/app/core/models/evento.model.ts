import { BaseModel } from './base.model';

export interface Evento extends BaseModel {
    clave_eventos?: string;
    nombre: string;
    descripcion: string;
    fecha: string;
    hora: string;
    sede?: string;
    ruta_imagen?: string;
    titulo?: string;
    // Add other fields as necessary
}
