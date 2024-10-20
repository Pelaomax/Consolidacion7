<template>
  <div class="home">
    <h1>Listado de Cursos</h1>
    <div class="courses">
      <div class="course-card" v-for="curso in cursos" :key="curso.id">
        <img class="course-img" :src="curso.img" alt="Imagen del curso" />
        <h2>{{ curso.nombre }}</h2>
        <p>Costo: {{ curso.costo }}</p>
        <p>Duración: {{ curso.duracion }}</p>
        <p>Cupos: {{ curso.cupos }} </p>
        <p>Completado: {{curso.completado }} </p>
        <p>Fecha de Registro: {{curso.fecha_registro }} </p>
        <p>{{ curso.descripcion }}</p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'HomeView',
  components: {

  },
  computed: {
    cursos(){
      return this.$store.state.cursos;
    }
  }
}
</script>


<style scoped>
.courses {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.course-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 10px;
  max-width: 300px;
  text-align: center;
}

.course-img{
  max-width: 140px;
  max-height: 140px;
}
</style>