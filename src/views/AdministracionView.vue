<template>
  <div class="admin">
    <h1>Administración de Cursos</h1>
    <button @click="mostrarModal = true">Agregar Curso</button>
    <br>
    <br>
    <br>

    <!-- Mostrar tabla con los cursos -->
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Inscritos</th>
          <th>Cupos</th>
          <th>Duración</th>
          <th>Costo</th>
          <th>Terminado</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="curso in cursos" :key="curso.id">
          <td>{{ curso.nombre }}</td>
          <td>{{ curso.inscritos }}</td>
          <td>{{ curso.cupos }}</td>
          <td>{{ curso.duracion }}</td>
          <td>{{ curso.costo }}</td>
          <td>{{ curso.completado }} </td>
          <td>{{ curso.fecha_registro }} </td>
          <td>
            <button @click="eliminarCurso(curso.id)">Eliminar</button>
            <button @click="editarCurso(curso)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Estadísticas de los cursos -->
    <div class="stats">
      <div class="stat-box">
        <h3>Total de Cupos</h3>
        <p>{{ totalCupos }}</p>
      </div>
      <div class="stat-box">
        <h3>Total de Inscritos</h3>
        <p>{{ totalInscritos }}</p>
      </div>
      <div class="stat-box">
        <h3>Cupos Restantes</h3>
        <p>{{ cuposRestantes }}</p>
      </div>
      <div class="stat-box">
        <h3>Cursos Terminados</h3>
        <p>{{ cursosTerminados }}</p>
      </div>
      <div class="stat-box">
        <h3>Cursos Activos</h3>
        <p>{{ cursosActivos }}</p>
      </div>
      <div class="stat-box">
        <h3>Total de Cursos</h3>
        <p>{{ totalCursos }}</p>
      </div>
    </div>

    <!-- Modal para agregar cursos -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <h2>Agregar Nuevo Curso</h2>
        <form @submit.prevent="agregarNuevoCurso" class="form-modal">
          <!-- Nombre del curso -->
          <label for="nombre">Nombre:</label>
          <input v-model="nuevoCurso.nombre" id="nombre" type="text" placeholder="Nombre del curso" />

          <!-- Imagen del curso -->
          <label for="img">Imagen (URL):</label>
          <input v-model="nuevoCurso.img" id="img" type="text" placeholder="URL de la imagen" />

          <!-- Cupos del curso -->
          <label for="cupos">Cupos:</label>
          <input v-model="nuevoCurso.cupos" id="cupos" type="number" placeholder="Cupos disponibles" />

          <!-- Inscritos en el curso -->
          <label for="inscritos">Inscritos:</label>
          <input v-model="nuevoCurso.inscritos" id="inscritos" type="number" placeholder="Número de inscritos" />

          <!-- Costo del curso -->
          <label for="costo">Costo:</label>
          <input v-model="nuevoCurso.costo" id="costo" type="number" placeholder="Costo del curso" />

          <!-- Descripción del curso -->
          <label for="descripcion">Descripción:</label>
          <textarea v-model="nuevoCurso.descripcion" id="descripcion" placeholder="Descripción del curso"></textarea>

          <!-- Duración del curso -->
          <label for="duracion">Duración:</label>
          <input v-model="nuevoCurso.duracion" id="duracion" type="text" placeholder="Duración del curso" />

          <!-- Fecha de registro (automática) -->
          <label for="fecha_registro">Fecha de registro:</label>
          <input v-model="nuevoCurso.fecha_registro" id="fecha_registro" type="text" disabled />

          <!-- Botones para agregar o cancelar -->
          <button type="submit">Agregar Curso</button>
          <button @click="mostrarModal = false">Cancelar</button>
        </form>
      </div>
    </div>
    <div v-if="mostrarModalEditar" class="modal">
      <div class="modal-content">
        <h2>Editar Curso: {{ cursoSeleccionado.nombre }}</h2>
        <form @submit.prevent="guardarCambiosCurso" class="form-modal">
          <!-- Nombre del curso -->
          <label for="nombre">Nombre:</label>
          <input v-model="cursoSeleccionado.nombre" id="nombre" type="text" />

          <!-- Imagen del curso -->
          <label for="img">Imagen (URL):</label>
          <input v-model="cursoSeleccionado.img" id="img" type="text" placeholder="URL de la imagen" />

          <!-- Costo del curso -->
          <label for="costo">Costo:</label>
          <input v-model="cursoSeleccionado.costo" id="costo" type="number" />

          <!-- Duración del curso -->
          <label for="duracion">Duración:</label>
          <input v-model="cursoSeleccionado.duracion" id="duracion" type="text" />

          <!-- Cupos del curso -->
          <label for="cupos">Cupos:</label>
          <input v-model="cursoSeleccionado.cupos" id="cupos" type="number" />

          <!-- Inscritos en el curso -->
          <label for="inscritos">Inscritos:</label>
          <input v-model="cursoSeleccionado.inscritos" id="inscritos" type="number" />

          <!-- Descripción del curso -->
          <label for="descripcion">Descripción:</label>
          <textarea v-model="cursoSeleccionado.descripcion" id="descripcion"></textarea>

          <label for="completado">Terminado:</label>
          <textarea v-model="cursoSeleccionado.completado" id="completado"></textarea>

          <label for="fecha">Fecha:</label>
          <textarea v-model="cursoSeleccionado.fecha_registro" id="fecha"></textarea>

          <!-- Botones para guardar o cancelar -->
          <button type="submit">Guardar Cambios</button>
          <button @click="cerrarModalEditar">Cancelar</button>
        </form>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mostrarModal: false,
      mostrarModalEditar: false,
      nuevoCurso: {
        nombre: '',
        img: '',
        cupos: 0,
        inscritos: 0,
        costo: 0,
        descripcion: '',
        duracion: '',
        completado: false,
        fecha_registro: new Date().toLocaleDateString(),
      },
      errores: {
        nombre: '',
        img: '',
        cupos: '',
        inscritos: '',
        costo: '',
        descripcion: '',
        duracion: ''
      },
      cursoSeleccionado: null, // Para almacenar el curso que se está editando
    };
  },

  computed: {
    cursos() {
      return this.$store.state.cursos;
    },
    totalCupos() {
      return this.cursos.reduce((total, curso) => total + Number(curso.cupos), 0);
    },
    totalInscritos() {
      return this.cursos.reduce((total, curso) => total + Number(curso.inscritos), 0);
    },
    cuposRestantes() {
      return this.totalCupos - this.totalInscritos;
    },
    cursosTerminados() {
      return this.cursos.filter(curso => curso.completado).length;
    },
    cursosActivos() {
      return this.cursos.filter(curso => !curso.completado).length;
    },
    totalCursos() {
      return this.cursos.length;
    }
  },
  methods: {
    agregarNuevoCurso() {
      // Resetear errores
      this.errores = {
        nombre: '',
        img: '',
        cupos: '',
        inscritos: '',
        costo: '',
        descripcion: '',
        duracion: ''
      };

      // Validaciones
      if (this.nuevoCurso.inscritos > this.nuevoCurso.cupos) {
        this.errores.inscritos = 'Los inscritos no pueden ser mayores a los cupos.';
        return;
      }

      if (!this.nuevoCurso.nombre) {
        this.errores.nombre = 'El nombre es obligatorio.';
        return;
      }

      if (!this.nuevoCurso.img) {
        this.errores.img = 'La imagen es obligatoria.';
        return;
      }

      if (this.nuevoCurso.cupos <= 0) {
        this.errores.cupos = 'Debe haber al menos un cupo disponible.';
        return;
      }

      if (this.nuevoCurso.inscritos < 0) {
        this.errores.inscritos = 'Los inscritos no pueden ser un valor negativo.';
        return;
      }

      if (this.nuevoCurso.costo <= 0) {
        this.errores.costo = 'El costo debe ser mayor a 0.';
        return;
      }

      if (!this.nuevoCurso.descripcion) {
        this.errores.descripcion = 'La descripción es obligatoria.';
        return;
      }

      if (!this.nuevoCurso.duracion) {
        this.errores.duracion = 'La duración es obligatoria.';
        return;
      }

      // Estado del curso (por defecto será false) y la fecha de registro ya están seteados

      // Dispatch al store para agregar el curso
      this.$store.dispatch('agregarCurso', { ...this.nuevoCurso, id: Date.now() });

      // Cerrar el modal
      this.mostrarModal = false;

      // Limpiar campos
      this.nuevoCurso = {
        nombre: '',
        img: '',
        cupos: 0,
        inscritos: 0,
        costo: 0,
        descripcion: '',
        duracion: '',
        completado: false,
        fecha_registro: new Date().toLocaleDateString(),
      };
    },

    eliminarCurso(cursoId) {
      this.$store.dispatch('eliminarCurso', cursoId);
    },
    editarCurso(curso) {
      this.cursoSeleccionado = { ...curso }; // Clonar el curso seleccionado
      this.mostrarModalEditar = true; // Mostrar el modal de edición
    },
    guardarCambiosCurso() {
      if (this.cursoSeleccionado.inscritos > this.cursoSeleccionado.cupos) {
        alert('Los inscritos no pueden ser mayores a los cupos.');
        return;
      }
      this.$store.dispatch('actualizarCurso', this.cursoSeleccionado);
      this.cerrarModalEditar();
    },
    cerrarModalEditar() {
      this.mostrarModalEditar = false;
      this.cursoSeleccionado = null; // Resetear la selección
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow-y: auto;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  max-width: 600px;
  min-height: 70vh;
  max-height: 90vh;
  overflow-y: auto;
}

.form-modal {
  display: flex;
  flex-direction: column;
}

.form-modal label {
  margin-top: 10px;
}

.form-modal input,
.form-modal textarea {
  margin-bottom: 15px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-modal textarea {
  resize: vertical; /* Permitir que el textarea sea ajustable en altura */
}

.form-modal button {
  margin-top: 20px;
  padding: 10px 15px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-modal button:last-child {
  background-color: #dc3545; /* Botón de cancelar */
}

table {
  margin: auto;
  border-collapse: collapse; /* Asegúrate de que las celdas no se colapsen, por si luego agregas bordes */
}

td, th {
  padding: 10px 20px; /* Ajusta el valor según necesites más o menos espacio */
}

.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
}

.stat-box {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  width: 180px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.stat-box h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.stat-box p {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

</style>