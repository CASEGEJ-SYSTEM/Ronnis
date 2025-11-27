import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-trainer-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './trainer-edit.html',
  styleUrls: ['./trainer-edit.css']
})
export class TrainerEdit implements OnInit {

  sede = localStorage.getItem('sede') ?? '';

  clave!: string;
  modoEdicion = false;

  personal: any = {
    nombre_completo: '',
    puesto: '',
    descripcion: '',
    sede: this.sede,
    rol: 'personal'
  };

  imagenFile: File | null = null;
  previewImage: string | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('clave_personal');

    if (param === null || param === 'nuevo') {
      this.modoEdicion = false;
      return;
    }

    this.clave = param;
    this.modoEdicion = true;
    this.cargarPersonal();
  }


  cargarPersonal() {
    this.usuarioService.getPersonalByClave(this.clave).subscribe({
      next: (data) => {
        this.personal = data;

        if (this.personal.ruta_imagen) {
          this.previewImage = `${environment.apiUrl}/${this.personal.ruta_imagen}`;
        }
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    this.imagenFile = file;

    const reader = new FileReader();
    reader.onload = () => this.previewImage = reader.result as string;
    reader.readAsDataURL(file);
  }


  limpiarFormulario() {
    this.personal = {
      nombre_completo: '',
      puesto: '',
      descripcion: '',
      sede: this.sede,
      rol: 'personal'
    };

    this.previewImage = null;
    this.imagenFile = null;
  }


  guardar() {
    const formData = new FormData();
    formData.append('nombre_completo', this.personal.nombre_completo);
    formData.append('puesto', this.personal.puesto);
    formData.append('descripcion', this.personal.descripcion);
    formData.append('sede', this.personal.sede);
    formData.append('rol', 'personal');

    if (this.imagenFile) {
      formData.append('ruta_imagen', this.imagenFile);
    }

    const peticion = this.modoEdicion
      ? this.usuarioService.actualizarPersonal(this.clave, formData)
      : this.usuarioService.registrarPersonal(formData);

    peticion.subscribe({
      next: () => {
        alert(
          this.modoEdicion
            ? 'Personal actualizado correctamente'
            : 'Personal registrado correctamente'
        );
      },

      error: (err) => {
        if (err.status === 422) {
          const errores = err.error.errors;

          let mensaje = "";

          for (const campo in errores) {
            const campoFormateado = campo
              .replace('_', ' ')
              .toUpperCase();

            // Traducir mensaje de Laravel al español
            const textoOriginal = errores[campo][0];

            let textoTraducido = textoOriginal
              .replace("The ", "")
              .replace(" field is required.", " es obligatorio.")
              .replace(" field must be a string.", " debe ser texto.")
              .replace(" field must not be greater than", " no debe ser mayor que")
              .replace(" characters.", " caracteres.");

            mensaje += `[${campoFormateado}]: ${textoTraducido}\n`;
          }

          alert(mensaje);
        } else {
          alert("Ocurrió un error inesperado");
        }
      }
    });
  }



  mostrarError(err: any) {
    console.error(err);

    // Si Laravel manda errores type { errors: { campo: ["mensaje"] } }
    if (err.status === 422 && err.error?.errors) {
      let mensaje = 'Errores:\n\n';
      for (let campo in err.error.errors) {
        mensaje += `• ${err.error.errors[campo][0]}\n`;
      }
      alert(mensaje);
      return;
    }

    // Si Laravel manda un mensaje simple
    if (err.error?.message) {
      alert("Error: " + err.error.message);
      return;
    }

    alert('Error inesperado en el servidor');
  }

}
