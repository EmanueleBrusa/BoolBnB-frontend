<script>
// importo stro e aCSios dove si trova la base API
import { store } from "../store";
import axios from "axios";
import AppLoader from '../components/AppLoader.vue';


export default {
  name: "HomePage",
  components:{
    AppLoader,
            
  },

  data() {
    return {
      store,
    };
  },

  computed:{
  },

  methods: {
    getApartments() {
      store.loading = true
      axios.get(`${store.apartmentsUrl}/api/apartments`).then((response) => {
        store.apartments = response.data.results;
        // per il loading
        if(response.data.success){
            store.apartments = response.data.results;
            console.log(store.apartments);
            store.loading = false;
        }
      });
    },

    // Controlla se l'ID dell'elemento è presente anche nell'array2
    shouldShowItem() {
      return store.apartments.filter((apartment) => {
        return !store.sponsoredApartments.some(
          (sponsoredApartment) => sponsoredApartment.id === apartment.id
        );
      });
    }

  },

  created() {
    this.getApartments();
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-center align-items-center py-5" v-if="store.loading">
        <AppLoader/>
      </div>
      <div class="col-12 d-flex flex-wrap justify-content-center my-4" v-else>
        <!-- START CARD -->
        <div class="mx-4 my-4 super-card p-3 rounded-4" style="width: 34rem; " v-for="(apartment, index) in shouldShowItem()" :key="index" v-if="shouldShowItem">
          <!-- IMMAGINE -->
          <div class="card-image-top">
            <img :src="`${store.apartmentsUrl}/storage/${apartment.cover_img}`" class="img-fluid rounded-5 " />
          </div>
          <!-- CONTENUTO DELLA CARTA  -->
          <div class="card-body text-start mt-2">
            <h5 class="card-title"><strong>{{ apartment.title }}</strong></h5>
            <span class=""><i class="fa-solid fa-location-dot"></i> {{ apartment.address }}</span> 
              <span class="card-text d-block">
                <span v-for='item in apartment.services' :key='item.id'>
                  <span class="me-2 mt-2" v-html="item.icon"></span>
                </span>
              </span>
              <span class="">
                <i class="fa-solid fa-ruler-combined"></i> Metri quadri:
                <strong>{{ apartment.square_meters }}</strong>
              </span> 

          </div>
          <div class="card-footer d-flex justify-content-end">
            <router-link class="btn btn-color border rounded-pill" :to="{name:'SingleApartment', params:{slug:apartment.slug}}">Scopri l'appartamento</router-link>
          </div>
        </div>
        <!-- END CARD -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.z {
  background-color: red;
}
.super-card{
  transition: background-color 0.3s ease;
}
.super-card:hover{
  background-color: #ded0de;
}
</style>