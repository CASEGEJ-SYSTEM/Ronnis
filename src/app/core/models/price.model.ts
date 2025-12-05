import { BaseModel } from './base.model';

export interface Plan extends BaseModel {
    nombre: string;
    precio: number;
    periodo: string; // 'Semana', 'Mes', etc.
    beneficios: string;
    destacado?: boolean;
}
