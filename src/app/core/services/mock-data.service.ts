import { Injectable } from '@angular/core';
import { Entrenador } from '../models/trainer.model';
import { Plan } from '../models/price.model';
import { Usuario } from '../models/user.model';
import { LogFinanciero, Deudor, RegistroAsistencia } from '../models/stats.model';

@Injectable({
    providedIn: 'root'
})
export class MockDataService {

    getTrainers(): Entrenador[] {
        return [
            { id: 1, nombre: 'Jose Luis Martin', ruta_imagen: 'https://img.freepik.com/fotos-premium/entrenador-fitness-guapo-personal-hermosa-clienta-rubia-gimnasio-haciendo-programa-o-programa-entrenamiento-concepto-vida-saludable_116317-21433.jpg', descripcion: 'Entrenador especializado en entrenamiento funcional y pérdida de peso.', experiencia: '3 años', telefono: '+52 481 126 5412', email: 'casegejsistem@gmail.com', redes_sociales: { facebook: 'joseluis.martin', instagram: 'jlmartinfit', tiktok: 'jlmartinfit' } },
            { id: 2, nombre: 'Andrea Perez Gonzales', ruta_imagen: 'https://c.superprof.com/i/m/25050570/600/20241217201830/25050570.webp', descripcion: 'Mi pasión es ayudarte a conectar con tu fuerza interior a través del ejercicio.', experiencia: '4 años', telefono: '+52 481 123 4567', email: 'andrea.perez@example.com', redes_sociales: { facebook: 'andrea.perez', instagram: 'andrea.fit', tiktok: 'andrea.fit' } },
            { id: 3, nombre: 'Miguel Perez Perez', ruta_imagen: 'https://c.superprof.com/i/m/4552804/600/20250609002933/4552804.webp', descripcion: 'Entrenador de musculación y rendimiento. No hay límites cuando entrenas con pasión.', experiencia: '5 años', telefono: '+52 481 987 6543', email: 'miguel.perez@example.com', redes_sociales: { facebook: 'miguel.perez', instagram: 'miguel.muscle', tiktok: 'miguel.muscle' } }
        ];
    }

    getPlans(): Plan[] {
        return [
            { id: 1, nombre: 'Basico', precio: 100, periodo: 'Semana', beneficios: 'Acceso a todas las áreas de cardio y peso.', destacado: false },
            { id: 2, nombre: 'Plus', precio: 300, periodo: 'Mes', beneficios: 'Acceso ilimitado y a clases grupales.', destacado: true },
            { id: 3, nombre: 'VIP', precio: 500, periodo: '2 Meses', beneficios: 'Todos los beneficios del plan Plus + entrenador personal.', destacado: false }
        ];
    }

    getUsers(): Usuario[] {
        return [
            { id: 1, clave_usuario: '01', nombre: 'Jose Perez', telefono: '+52 481 123 5412', fecha_vencimiento: '2025-11-15', estatus: 'Vigente', curp: 'PEPJ900101HXX', email: 'jose.perez@email.com', asistencias: { '2025-10-01': 'attended', '2025-10-03': 'attended', '2025-10-04': 'missed' }, qr_code: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=user-1-jose-perez' },
            { id: 2, clave_usuario: '02', nombre: 'Jose Hernandez', telefono: '+52 481 123 5412', fecha_vencimiento: '2025-09-30', estatus: 'No Vigente', curp: 'HEPJ880202HXX', email: 'jose.hdz@email.com', asistencias: {}, qr_code: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=user-2-jose-hernandez' },
            { id: 3, clave_usuario: '03', nombre: 'Jose Jose', telefono: '+52 481 123 5412', fecha_vencimiento: '2025-12-01', estatus: 'Vigente', curp: 'JOJO700303HXX', email: 'jose.jose@email.com', asistencias: {}, qr_code: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=user-3-jose-jose' },
        ];
    }

    getFinancialLog(): LogFinanciero[] {
        return [
            { clave_usuario: '01', nombre: 'Jose Perez', monto: 100 },
            { clave_usuario: '02', nombre: 'Jose Hernandez', monto: 200 },
        ];
    }

    getDebtors(): Deudor[] {
        return [
            { clave_usuario: '04', nombre: 'Pablo Paz', monto_adeudo: 300 },
            { clave_usuario: '05', nombre: 'Pedro Cruz', monto_adeudo: 100 }
        ];
    }

    getArrivals(): RegistroAsistencia[] {
        return [
            { clave_usuario: '01', nombre: 'Jose Perez', hora_entrada: '10:00' },
            { clave_usuario: '02', nombre: 'Jose Hernandez', hora_entrada: '20:00' },
        ];
    }
}