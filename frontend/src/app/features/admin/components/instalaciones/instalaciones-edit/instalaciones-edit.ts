import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { InstalacionesService } from '../../../../../core/services/instalaciones.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-instalaciones-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './instalaciones-edit.html',
  styleUrls: ['./instalaciones-edit.css']
})
export class InstalacionesEdit implements OnInit {
  instalacionesData: any[] = [];
  sede = localStorage.getItem('sede') ?? '';

  clave!: string;
  modoEdicion = false;

  instalaciones: any = {
    titulo: '',
    descripcion: '',
    sede: this.sede,
  };

  imagenFile: File | null = null;
  previewImage: string | null = null;

  constructor(
    private instalacionesService: InstalacionesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.instalacionesService.getInstalaciones(this.sede).subscribe(data => this.instalacionesData = data);
    const param = this.route.snapshot.paramMap.get('clave_instalaciones');

    if (param === null || param === 'nuevo') {
      this.modoEdicion = false;
      return;
    }

    this.clave = param;
    this.modoEdicion = true;
    this.cargarinstalaciones();
  }


  cargarinstalaciones() {
    this.instalacionesService.getInstalacionesByClave(this.clave).subscribe({
      next: (data) => {
        this.instalaciones = data;

        if (this.instalaciones.ruta_imagen) {
          this.previewImage = `${environment.apiUrl}/${this.instalaciones.ruta_imagen}`;
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
    this.instalaciones = {
      titulo: '',
      descripcion: '',
      sede: this.sede,
    };

    this.previewImage = null;
    this.imagenFile = null;
  }


  guardar() {
    const formData = new FormData();
    formData.append('titulo', this.instalaciones.titulo);
    formData.append('descripcion', this.instalaciones.descripcion);
    formData.append('sede', this.instalaciones.sede);

    if (this.imagenFile) {
      formData.append('ruta_imagen', this.imagenFile);
    }

    const peticion = this.modoEdicion
      ? this.instalacionesService.actualizarInstalaciones(this.clave, formData)
      : this.instalacionesService.registrarInstalaciones(formData);

    peticion.subscribe({
      next: () => {
        alert(
          this.modoEdicion
            ? 'instalaciones actualizado correctamente'
            : 'instalaciones registrado correctamente'
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
  buscarInstalaciones() {
    const texto = this.busqueda.toLowerCase().trim();
    if (texto.length === 0) {
      this.resultados = [];
      return;
    }

    this.resultados = this.instalacionesData.filter(ev =>
      ev.clave_instalaciones.toLowerCase().includes(texto) ||
      ev.titulo.toLowerCase().includes(texto) ||
      ev.descripcion?.toLowerCase().includes(texto)
    );
  }

  // Cuando da clic en un resultado
  seleccionarInstalaciones(ev: any) {
    this.busqueda = ev.titulo;
    this.resultados = [];
    this.busqueda = '';     
    this.resultados = []; 
    this.clave = ev.clave_instalaciones;
    this.modoEdicion = true;

    this.instalaciones = {
      titulo: ev.titulo,
      descripcion: ev.descripcion,
      sede: ev.sede
    };

    if (ev.ruta_imagen) {
      this.previewImage = `${environment.apiUrl}/${ev.ruta_imagen}`;
    }
  }




}
