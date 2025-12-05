import { BaseModel } from './base.model';

export interface Entrenamiento extends BaseModel {
    clave_entrenamientos?: string;
    titulo: string;
    descripcion: string;
    ruta_imagen?: string;
    sede?: string;
    // Add other fields as necessary
}
