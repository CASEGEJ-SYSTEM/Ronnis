import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MockDataService {

    getTrainers() {
        return [
            { id: 1, name: 'Jose Luis Martin', image: 'https://img.freepik.com/fotos-premium/entrenador-fitness-guapo-personal-hermosa-clienta-rubia-gimnasio-haciendo-programa-o-programa-entrenamiento-concepto-vida-saludable_116317-21433.jpg', description: 'Entrenador especializado en entrenamiento funcional y pérdida de peso.', experience: '3 años', why: ['Entrenamiento inteligente', 'Motivación constante', 'Cambio de estilo de vida'], phone: '+52 481 126 5412', email: 'casegejsistem@gmail.com', facebook: 'joseluis.martin', instagram: 'jlmartinfit', tiktok: 'jlmartinfit' },
            { id: 2, name: 'Andrea Perez Gonzalez', image: 'https://c.superprof.com/i/m/25050570/600/20241217201830/25050570.webp', description: 'Mi pasión es ayudarte a conectar con tu fuerza interior a través del ejercicio.', experience: '4 años', why: ['Motivación', 'Planes adaptados', 'Celebración de logros'], phone: '+52 481 123 4567', email: 'andrea.perez@example.com', facebook: 'andrea.perez', instagram: 'andrea.fit', tiktok: 'andrea.fit' },
            { id: 3, name: 'Miguel Perez Perez', image: 'https://c.superprof.com/i/m/4552804/600/20250609002933/4552804.webp', description: 'Entrenador de musculación y rendimiento. No hay límites cuando entrenas con pasión.', experience: '5 años', why: ['Superación de barreras', 'Técnica correcta', 'Éxito garantizado'], phone: '+52 481 987 6543', email: 'miguel.perez@example.com', facebook: 'miguel.perez', instagram: 'miguel.muscle', tiktok: 'miguel.muscle' },
            { id: 4, name: 'Jose Perez Perez', image: 'https://c.superprof.com/i/m/4552804/600/20250609002933/4552804.webp', description: 'Entrenador de musculación y rendimiento. No hay límites cuando entrenas con pasión.', experience: '5 años', why: ['Superación de barreras', 'Técnica correcta', 'Éxito garantizado'], phone: '+52 481 987 6543', email: 'jose.perez@example.com', facebook: 'jose.perez', instagram: 'jose.muscle', tiktok: 'jose.muscle' },
            { id: 5, name: 'Jose Perez Perez', image: 'https://c.superprof.com/i/m/4552804/600/20250609002933/4552804.webp', description: 'Entrenador de musculación y rendimiento. No hay límites cuando entrenas con pasión.', experience: '5 años', why: ['Superación de barreras', 'Técnica correcta', 'Éxito garantizado'], phone: '+52 481 987 6543', email: 'jose.perez@example.com', facebook: 'jose.perez', instagram: 'jose.muscle', tiktok: 'jose.muscle' },
            { id: 6, name: 'Jose Perez Perez', image: 'https://c.superprof.com/i/m/4552804/600/20250609002933/4552804.webp', description: 'Entrenador de musculación y rendimiento. No hay límites cuando entrenas con pasión.', experience: '5 años', why: ['Superación de barreras', 'Técnica correcta', 'Éxito garantizado'], phone: '+52 481 987 6543', email: 'jose.perez@example.com', facebook: 'jose.perez', instagram: 'jose.muscle', tiktok: 'jose.muscle' },
        ];
    }

    getPlans() {
        return [
            { id: 1, name: 'Basico', price: 100, period: 'Semana', benefits: 'Acceso a todas las áreas de cardio y peso.', featured: false },
            { id: 2, name: 'Plus', price: 300, period: 'Mes', benefits: 'Acceso ilimitado y a clases grupales.', featured: true },
            { id: 3, name: 'VIP', price: 500, period: '2 Meses', benefits: 'Todos los beneficios del plan Plus + entrenador personal.', featured: false }
        ];
    }

    getUsers() {
        return [
            { id: 1, key: '01', name: 'Jose Perez', phone: '+52 481 123 5412', expiration: '2025-11-15', status: 'Vigente', curp: 'PEPJ900101HXX', email: 'jose.perez@email.com', attendance: { '2025-10-01': 'attended', '2025-10-03': 'attended', '2025-10-04': 'missed' }, qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=user-1-jose-perez' },
            { id: 2, key: '02', name: 'Jose Hernandez', phone: '+52 481 123 5412', expiration: '2025-09-30', status: 'No Vigente', curp: 'HEPJ880202HXX', email: 'jose.hdz@email.com', attendance: {}, qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=user-2-jose-hernandez' },
            { id: 3, key: '03', name: 'Jose Jose', phone: '+52 481 123 5412', expiration: '2025-12-01', status: 'Vigente', curp: 'JOJO700303HXX', email: 'jose.jose@email.com', attendance: {}, qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=user-3-jose-jose' },
        ];
    }

    getFinancialLog() {
        return [
            { key: '01', name: 'Jose Perez', payment: 100 },
            { key: '02', name: 'Jose Hernandez', payment: 200 },
        ];
    }

    getDebtors() {
        return [
            { key: '04', name: 'Pablo Paz', arrears: 300 },
            { key: '05', name: 'Pedro Cruz', arrears: 100 }
        ];
    }

    getArrivals() {
        return [
            { key: '01', name: 'Jose Perez', entryTime: '10:00' },
            { key: '02', name: 'Jose Hernandez', entryTime: '20:00' },
        ];
    }
}