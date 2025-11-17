import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-trainer-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './trainer-edit.html',
  styleUrls: ['./trainer-edit.css']
})
export class TrainerEdit {

  personal = {
    nombre_completo: '',
    puesto: '',
    descripcion: '',
    ruta_imagen: ''
  };

  constructor(private clienteService: UsuarioService) {}

  registrarPersonal() {

    this.clienteService.registrarPersonal(this.personal).subscribe({
      next: () => {
        alert('Personal registrado correctamente 🎉');
        this.personal = { nombre_completo: '', puesto: '', descripcion: '', ruta_imagen: '' };
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar personal');
      }
    });

  }

}
