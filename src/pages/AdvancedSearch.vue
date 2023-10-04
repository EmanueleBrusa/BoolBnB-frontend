<script>
import { store } from "../store";
import axios from "axios";
import AppLoader from '../components/AppLoader.vue';
import SearchBar from "../components/SearchBar.vue";
import RenderApartments from "../components/RenderApartments.vue";
import MapApartament from "../components/MapApartament.vue";

export default {
  name: "AdvancedSearch",
  components: {
    AppLoader,
    SearchBar,
    RenderApartments,
    MapApartament, 
  },

  data() {
    return {
      searchCity: store.searchCity || this.$route.params.searchCity ||  '',
      n_rooms: this.$route.params.n_rooms || 1,
      n_beds: this.$route.params.n_beds || 1,
      distance: this.$route.params.distance || 20,
      suggestions: [],
      store,
      apartment:'',
      // SERVIZI
      services: [],
      selectedServices: [],

      longitude: null,
      latitude: null,
    }
  },


  computed: {
    filteredApartments() {
      return store.apartments.filter((apartments) => {
        const query = store.searchApartments.toLowerCase();
        return apartments.title.toLowerCase().includes(query);
      });
    },
    
    rangeValue() {
      return `${this.distance}km`;
    },
  },
  // Methods
  methods: {

    // FUNZIONE PER I SUGERIMENTI API TOM TOM
    async searchSuggestions() {
      if (this.searchCity !== '') {
        const response = await axios.get(`https://api.tomtom.com/search/2/search/${this.searchCity}.json?key=hThUeWOkuwn7VZV1hYMz1TA6KlJr6vsL&language=it-IT&idxSets=Str&countrySet=IT&typeahead=true`);
        this.suggestions = response.data.results;

        this.button = document.querySelector('.btn')

        if (this.suggestions == 0) {
          this.button.disabled = true
        } else {
          this.button.disabled = false
        }
      } else {
        this.suggestions = [];
      }
    },

    // FUNZIONE PER RICERCA AVANZATA
    async searchAdvancedApartment(city) {
      if (this.searchCity !== '') {
        const response = await axios.get(`http://localhost:8000/api/searchAdvanced`, {
          params: {
            city: city,
            n_rooms: this.n_rooms,
            n_beds: this.n_beds,
            distance: this.distance,
            services: this.selectedServices,
          },
        });
        store.apartments = response.data;
        store.city = city;

        this.longitude = response.data[0].longitude;
        this.latitude = response.data[0].latitude;
        this.$router.push({
          name: 'AdvancedSearch',
          params: {
            searchCity: `${this.searchCity}`,
            distance: `${this.distance}`,
            n_rooms: `${this.n_rooms}`,
            n_beds: `${this.n_beds}`,
            services: `${this.selectedServices}`,
          }
        });
      }
    },

    // FUNZIONE PER I SUGERIMENTI 
    selectSuggestion(suggestion) {
      this.searchCity = suggestion.address.freeformAddress;
      this.suggestions = [];
    },

    // FUNZIONE CHE SI PRENDE I SERVIZI 
    getServices() {
      axios.get(`${store.apartmentsUrl}/api/services`).then((response) => {
        this.services = response.data.results;
      });
    },

    // FUNZIONE CHE MOSTRA GLI APARTAMENTI SULLA MAPPA 
    showMapForApartment(longitude, latitude) {
      let map = tt.map({
        container: "map",
        key: "zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p",
        center: [longitude, latitude],
        zoom: 15
      });

      let marker = new tt.Marker().setLngLat([longitude, latitude]).addTo(map);
    },
  },

  // Created
  created() {
    this.getServices();

  },
  // Mounted
  mounted() {
    if (this.longitude && this.latitude) {
      this.showMapForApartment(this.longitude, this.latitude);
    };
    
  },
};
</script>

<template>
  <link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' rel='stylesheet' />

  <div class="container-fluid">
    <div class="row">
      <!-- FORM CONTAINER -->
      <div class="col-12 col-lg-3 form-container sidebar border-end border-3 bg-color-search h">
        <div class="border rounded-5 text-center my-3 shadow bg-light-subtle">
          <h3 class="px-2 pt-2">Ricerca avanzata</h3>
        </div>
        <form @submit.prevent="searchAdvancedApartment(searchCity)" autocomplete="off">
          <!-- SEARCH CONTAINER -->
          <div class="serach-container p-2">
            <label class="form-label" for="city">Cerca la tua città</label>
            <div class="d-flex align-items-center">
              <input
                type="text"
                class="form-control text-dark"
                id="city"
                placeholder="Roma"
                v-model="searchCity"
                @input="searchSuggestions"
              >
            </div>
            <!-- Suggerimenti -->
            <div v-if="suggestions.length > 0" class="suggestions">
              <ul>
                <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
                  {{ suggestion.address.freeformAddress }}
                </li>
              </ul>
            </div>
          </div>
          <!-- RANGE SEARCH -->
          <div class=" p-2">
            <label for="distance" class="form-label mt-2">Imposta raggio di ricerca</label>
            <div class="range-container d-flex align-items-center justify-content-between">
              <input type="range" class="form-range border rounded-5 p-2" v-model="distance" id="distance" name="n_rooms" min="1" max="50">
              <span class="ms-3 rounded-5 btn-color px-3">{{ rangeValue}}</span>
            </div>
          </div>

          <!-- RANGE ROOMS -->
          <div class="d-flex">
            <div class="p-2">
              <label for="n_rooms" class="form-label">Numero Stanze</label>
              <input type="number" class="form-control" v-model="n_rooms" id="n_rooms" name="n_rooms" min="1" max="15" >
            </div>
            <!-- RANGE BEDS -->
            <div class=" p-2">
              <label for="n_beds" class="form-label">Numero Letti</label>
              <input type="number" class="form-control" v-model="n_beds" id="n_beds" name="n_beds" min="1" max="15">
            </div>
          </div>
          <!-- DA AGGIUNGERE I SERVIZI -->
          <div class="p-2">
            <div class="form-check" v-for="(service, index) in this.services" :key="index + 1">
              <input type="checkbox" class="form-check-input" name="selectedServices" :id="'service' + service.id" v-model="selectedServices" :value="service.id">
              <span class="mx-2" v-html="service.icon"></span>
              <label :for="'service' + service.id" class="form-check-label">{{ service.type }}</label>
            </div>
          </div>
          <!-- Bottone Cerca -->
          <div class="d-flex align-items-center justify-content-center mt-2 mb-3">
            <button type="submit" class="btn btn-color" :disabled="searchCity === ''">Cerca</button>
          </div>

        </form>
        <!-- INZIO MAPPA -->
        <div class="mb-4">
          <!-- Button trigger modal -->
          <div id="map" style="width: 100%; height: 500px;">
            <MapApartament :apartment="filteredApartments" v-if="filteredApartments.length>0"></MapApartament>
          </div>
        </div>
      </div>
      <!-- -------------------------------------------------------------------------------- -->
      <div class="col-12 col-lg-9 p-0">
        <!-- SE LA RICERCA NON HA APPARTAMENTI -->
        <div v-if="filteredApartments.length === 0" class="no-results">
          <hr>
          <h4>-- Ci spiace ma non ci sono risultati --</h4>
          <hr>
        </div>
        <!-- CONTROLLO SE LA RICERCA HA APARTAMENTI -->
        <div v-else class="d-flex flex-wrap justify-content-center">
          <div class="m-3 super-card p-3 rounded-5" style="width: 40rem;" v-for="(apartment, index) in filteredApartments" :key="index">
            <!-- IMMAGINE -->
            <div class="card-image-top">
              <img :src="`${store.apartmentsUrl}/storage/${apartment.cover_img}`" class="img-fluid rounded-5 " />
            </div>
            <!-- CONTENUTO DELLA CARD  -->
            <div class="card-body text-start mt-2">
              <h5 class="card-title"><strong>{{ apartment.title }}</strong></h5>
              <span class=""><i class="fa-solid fa-location-dot"></i> {{ apartment.address }}</span> 
              <span class="card-text d-block">
                <span v-for='item in apartment.services' :key='item.id'>
                  <span class="me-2 mt-2" v-html="item.icon"></span>
                </span>
              </span>
              <span class="d-block">
                <i class="fa-solid fa-ruler-combined"></i> Metri quadri 
                <strong>{{ apartment.square_meters }}</strong>
              </span> 
              <span class="d-block">
                <i class="fa-solid fa-house-user"></i> Numero stanze
                <strong>{{ apartment.n_rooms }}</strong>
              </span> 
              <span class="d-block">
                <i class="fa-solid fa-bed"></i> Numeri letti
                <strong>{{ apartment.n_beds }}</strong>
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
</template>

<style lang="scss" scoped>
  hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(254, 0, 0, 0.75), rgba(0, 0, 0, 0));
  }

.z {
  background-color: red;
}
.super-card{
  transition: background-color 0.3s ease;
}
.super-card:hover{
  background-color: #C1DBE3;
}

.suggestions {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 999;
  max-height: 150px;
  overflow-y: auto;
}

.suggestions ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.suggestions li {
  cursor: pointer;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.suggestions li:hover {
  background-color: #f0f0f0;
}

.btn:disabled {
  background-color: gray;
}

.no-results {
  font-size: larger;
  text-align: center;
  margin: 100px;
  color: red;
}

.bg-color-search{
  background-color: #f2bb3b; 
}

.no-results {
  font-size: larger;
  text-align: center;
  margin: 100px;
  color: red;
}

.map {
  height: 500px;
  width: 100%;
}

@media screen and (max-width: 942px){
  .h{
    margin-top: -9px;
  }
}
</style>
