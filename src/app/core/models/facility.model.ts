import { BaseModel } from './base.model';

export interface Instalacion extends BaseModel {
    clave_instalaciones?: string;
    titulo: string;
    descripcion: string;
    ruta_imagen?: string;
    sede?: string;
    // Add other fields as necessary
}
