<script>
// importo stro e aCSios dove si trova la base API
import { store } from "../store";
import AppLoader from '../components/AppLoader.vue';
import SearchBar from "../components/SearchBar.vue";
import RenderApartments from "../components/RenderApartments.vue";
import SposorizedApartments from "../components/SposorizedApartments.vue";


export default {
  name: "HomePage",
  components:{
    AppLoader,
    SearchBar,
    RenderApartments,
    SposorizedApartments,  
  },

  data() {
    return {
      store,
    };
  },

  computed:{
    //FUNZIONE FILTRAGGIO <-------FUNZIONA
    filteredApartments() {
      return store.apartments.filter((apartments) => {
        const query = store.searchApartments.toLowerCase();
        // console.log(query);
        // Esegui una ricerca per nome, città o numero di stanze
        return (
          apartments.title.toLowerCase().includes(query)
        );

      });
    },
  },
};
</script>

<template>
  <!-- PARTE DELLA RICERCA -->
  <div class="jumbotron-search">
    <div class="container">
      <div class="row">
        <div class="my-2 col-12 d-flex justify-content-center align-items-center">
          <SearchBar @apartmentSearch="filteredApartments"/>
        </div>
      </div>
    </div>
  </div>


  
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-0">
      <SposorizedApartments/>
    </div>
    <div class="col-12 p-0">
      <RenderApartments/>
    </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.z {
  background-color: red;
}



.jumbotron-search{
  background-color: #ffca4a;
}

@media screen and (max-width: 992px){
  .jumbotron-search{

    margin-top: -4px;
}
}

@media screen and (max-width: 420px){
  .jumbotron-search{
    margin-top: -9px;
}
}
</style>