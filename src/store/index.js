import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos: [
      { id: 1, img: require('../assets/JavaScriptAvanzado.png'), nombre: 'JavaScript Avanzado', costo: 30000,
     duracion: '2 meses', cupos: 20, inscritos: 10, completado: false,
     fecha_registro: '06/03/2022', descripcion: 'Curso con las nuevas actualizaciones de JavaScript.'},
      { id: 2, img: require('../assets/Css.png'), nombre: 'CSS para principiantes',
     costo: 10000, duracion: '1 mes', cupos: 35, inscritos: 23,
     completado: false, fecha_registro: '05/03/2022', descripcion:
     'Aprendiendo estilos con CSS desde el nivel más básico.' },
      { id: 3, img: require('../assets/JavaScript.png'), nombre: 'JavaScript Básico de 0 a 100', costo: 20000, duracion: '2 meses', cupos: 25,
     inscritos: 0, completado: true, fecha_registro: '05/03/2022',
     descripcion: 'Programando para la web con JavaScript.' },
      { id: 4, img:
     require('../assets/Html.png'), nombre:
     'HTML Básico', costo: 10000, duracion: '1 mes', cupos: 35, inscritos:
     0, completado: true, fecha_registro: '31/01/2022', descripcion:
     'Aprende HTML 5 y crea tus primeras páginas web paso a paso con decenas de ejercicios.' },
      { id: 5, img: require('../assets/logo.png'), nombre: 'Vue JS de 0 a 100', costo:
     85500, duracion: '5 meses', cupos: 35, inscritos: 35, completado:
     false, fecha_registro: '06/03/2022', descripcion: 'Aprende desde cero como usar VueJS, cómo usarlo en aplicaciones pequeñas y ver lo que ofrece el framework.' },
      { id: 6, img:
        require('../assets/Sass.png'),
     nombre: 'Estilos con SASS', costo: 45000, duracion: '1 mes', cupos:
     40, inscritos: 35, completado: false, fecha_registro: '06/03/2022',
     descripcion: 'Con SASS aprenderás a escribir mejor código de CSS con todas las funciones necesarias.' },
      ]
  },
  getters: {
    totalCursos(state) {
      return state.cursos.length;
    },
    totalInscritos(state) {
      return state.cursos.reduce((acc, curso) => acc + curso.inscritos, 0);
    },
    totalCuposRestantes(state) {
      return state.cursos.reduce((acc, curso) => acc + (curso.cupos - curso.inscritos), 0);
    },
    cursosTerminados(state) {
      return state.cursos.filter(curso => curso.completado).length;
    },
    cursosActivos(state) {
      return state.cursos.filter(curso => !curso.completado).length;
    }
  },
  mutations: {
    ADD_CURSO(state, nuevoCurso) {
      state.cursos.push(nuevoCurso);
    },
    REMOVE_CURSO(state, cursoId) {
      state.cursos = state.cursos.filter(curso => curso.id !== cursoId);
    },
    UPDATE_CURSO(state, cursoActualizado) {
      const index = state.cursos.findIndex(curso => curso.id === cursoActualizado.id);
      if (index !== -1) {
        state.cursos.splice(index, 1, cursoActualizado);
      }
    }
  },
  actions: {
    agregarCurso({ commit }, curso) {
      commit('ADD_CURSO', curso);
    },
    eliminarCurso({ commit }, cursoId) {
      commit('REMOVE_CURSO', cursoId);
    },
    actualizarCurso({ commit }, cursoActualizado) {
      commit('UPDATE_CURSO', cursoActualizado);
    }
  },
  modules: {
  }
})
