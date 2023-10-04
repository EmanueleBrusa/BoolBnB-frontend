<script>
import { store } from "../store";
import axios from "axios";


export default {
  name: "HomePage",
  components:{

  },

  data() {
    return {
      store,

    };
  },
  
  methods: {
    getSponsoredApartaments() {
      axios.get(store.apartmentsUrl+'/api/sponsored-apartments')
        .then((response) => {
          // Filtra gli appartamenti in base alla data corrente e alla presenza di sponsor
          const currentDate = new Date();
          store.sponsoredApartments = response.data.filter(apartment => 
            apartment.sponsors.length > 0 && new Date(apartment.sponsors[0].pivot.end_at) > currentDate
          );
          console.log(store.sponsoredApartments);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },

  created() {
    this.getSponsoredApartaments();
  },
};
</script>

<template>
  <div v-if="store.sponsoredApartments.length > 0">
    <div class="jumbotron-sponsored">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 mt-3 mx-3 text-center">
            <h5><i class="fa-solid fa-star" style="color: #EF7039;"></i> I nostri Appartamenti in evidenza <i class="fa-solid fa-star" style="color: #EF7039;"></i></h5>
          </div>
          <div class="col-12 p-0" v-if="store.loading">
          </div>
          <div class="col-12 p-0 d-flex flex-wrap justify-content-center mb-4" v-else>
            <!-- Itera sugli appartamenti sponsorizzati e mostra le informazioni -->
            <div v-for="apartment in store.sponsoredApartments" :key="apartment.id" class="mx-4 my-2 super-card p-3 rounded-4" style="width: 34rem; ">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


  

<style lang="scss" scoped>
.z {
  background-color: red;
}

.jumbotron-sponsored{
  background-color: #fff3c8;
}
.super-card{
  transition: background-color 0.3s ease;
}
.super-card:hover{
  background-color: #ded0de;
}
</style>