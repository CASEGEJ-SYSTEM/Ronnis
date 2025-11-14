import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../../core/services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { MockDataService } from '../../../../core/services/mock-data.service';

@Component({
  selector: 'app-trainer-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './trainer-edit.html',
  styleUrls: ['./trainer-edit.css']
})
export class TrainerEdit implements OnInit {

  today: string = new Date().toISOString().split('T')[0];

  trainersData: any[] = [];

  // Campos del formulario
  cliente = {
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
    plan_pago: '',
    total_pagado: 0
  };

  // 🔥 SOLO UN CONSTRUCTOR
  constructor(
    private mockData: MockDataService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.trainersData = this.mockData.getTrainers();
  }

  registrarCliente() {
    const now = new Date();
    const fecha_pago = this.calcularFechaPago(now);

    const clienteData = {
      nombres: this.cliente.nombres,
      apellidos: this.cliente.apellidos,
      fecha_nacimiento: this.cliente.fecha_nacimiento,
      telefono: this.cliente.telefono,
      email: this.cliente.email,
      contraseña: this.cliente.email,
      sede: 'Principal',
      ruta_imagen: '',
      qr_imagen: ''
    };

    this.clienteService.registrarCliente(clienteData).subscribe({
      next: (resCliente) => {
        const cliente_id = resCliente.cliente.id;

        this.clienteService.registrarRegistroCliente({
          cliente_id: cliente_id,
          fecha_ingreso: now.toISOString(),
          fecha_pago: fecha_pago.toISOString()
        }).subscribe();

        this.clienteService.registrarPago({
          cliente_id: cliente_id,
          monto: this.cliente.total_pagado,
          fecha: now.toISOString(),
          monto_pendiente: 0
        }).subscribe();

        alert('Cliente registrado correctamente.');
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar cliente');
      }
    });
  }

  private calcularFechaPago(fecha: Date): Date {
    const day = fecha.getDate();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();

    if (day >= 28 || day <= 6) {
      return new Date(anio, mes + (day >= 28 ? 1 : 0), 1);
    } else if (day >= 15 && day <= 21) {
      return new Date(anio, mes, 15);
    } else {
      return new Date(anio, mes + 1, 1);
    }
  }
}
