import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { EntrenamientosService } from '../../../../../core/services/entrenamientos.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-entrenamientos-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './entrenamientos-edit.html',
  styleUrls: ['./entrenamientos-edit.css']
})
export class EntrenamientosEdit implements OnInit {
  entrenamientosData: any[] = [];
  sede = localStorage.getItem('sede') ?? '';

  clave!: string;
  modoEdicion = false;

  entrenamientos: any = {
    titulo: '',
    descripcion: '',
    sede: this.sede,
  };

  imagenFile: File | null = null;
  previewImage: string | null = null;

  constructor(
    private entrenamientosService: EntrenamientosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.entrenamientosService.getEntrenamientos(this.sede).subscribe(data => this.entrenamientosData = data);
    const param = this.route.snapshot.paramMap.get('clave_entrenamientos');

    if (param === null || param === 'nuevo') {
      this.modoEdicion = false;
      return;
    }

    this.clave = param;
    this.modoEdicion = true;
    this.cargarEntrenamientos();
  }


  cargarEntrenamientos() {
    this.entrenamientosService.getEntrenamientosByClave(this.clave).subscribe({
      next: (data) => {
        this.entrenamientos = data;

        if (this.entrenamientos.ruta_imagen) {
          this.previewImage = `${environment.apiUrl}/${this.entrenamientos.ruta_imagen}`;
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
    this.entrenamientos = {
      titulo: '',
      descripcion: '',
      sede: this.sede,
    };

    this.previewImage = null;
    this.imagenFile = null;
  }


  guardar() {
    const formData = new FormData();
    formData.append('titulo', this.entrenamientos.titulo);
    formData.append('descripcion', this.entrenamientos.descripcion);
    formData.append('sede', this.entrenamientos.sede);

    if (this.imagenFile) {
      formData.append('ruta_imagen', this.imagenFile);
    }

    const peticion = this.modoEdicion
      ? this.entrenamientosService.actualizarEntrenamientos(this.clave, formData)
      : this.entrenamientosService.registrarEntrenamientos(formData);

    peticion.subscribe({
      next: () => {
        alert(
          this.modoEdicion
            ? 'Entrenamientos actualizado correctamente'
            : 'Entrenamientos registrado correctamente'
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


  
  busqueda = '';

  resultados: any[] = [];

  // Se ejecuta al escribir
  buscarEntrenamientos() {
    const texto = this.busqueda.toLowerCase().trim();
    if (texto.length === 0) {
      this.resultados = [];
      return;
    }

    this.resultados = this.entrenamientosData.filter(ev =>
      ev.clave_entrenamientos.toLowerCase().includes(texto) ||
      ev.titulo.toLowerCase().includes(texto) ||
      ev.descripcion?.toLowerCase().includes(texto)
    );
  }

  // Cuando da clic en un resultado
  seleccionarEntrenamientos(ev: any) {
    this.busqueda = ev.titulo;
    this.resultados = [];
    this.busqueda = '';     
    this.resultados = [];     

    this.clave = ev.clave_entrenamientos;
    this.modoEdicion = true;

    this.entrenamientos = {
      titulo: ev.titulo,
      descripcion: ev.descripcion,
      sede: ev.sede
    };

    if (ev.ruta_imagen) {
      this.previewImage = `${environment.apiUrl}/${ev.ruta_imagen}`;
    }
  }



}
