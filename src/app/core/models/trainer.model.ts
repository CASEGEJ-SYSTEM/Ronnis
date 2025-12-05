import { BaseModel } from './base.model';

export interface Entrenador extends BaseModel {
    clave_personal?: string;
    nombre: string;
    descripcion: string;
    experiencia: string;
    telefono?: string;
    email?: string;
    ruta_imagen?: string;
    especialidades?: string[];
    redes_sociales?: {
        facebook?: string;
        instagram?: string;
        tiktok?: string;
    };
}
