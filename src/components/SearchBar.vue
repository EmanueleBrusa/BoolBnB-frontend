
<script>
import axios from 'axios';
import { store } from '../store';

export default {
  data() {
    return {
      store,
      suggestions: [],
      isLoading: false,
    };
  },
  methods: {
    // FUNZIONE RICERCA SUGGERIMENTI
    async searchSuggestions() {
      if (store.searchCity !== '') {
          const response = await axios.get(`https://api.tomtom.com/search/2/search/${store.searchCity}.json?key=zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p&language=it-IT&idxSets=Str&countrySet=IT&typeahead=true`, {
            
          });

          this.suggestions = response.data.results;


          this.button = document.querySelector('.s')
          if  (this.button){          
            if (this.suggestions == 0) {
                this.button.disabled = true
              }else{
                this.button.disabled = false
              }
          }        
      } 
       else {
        this.suggestions = [];
      }
    },

// FUNZIONE DI RICERCA INDIRIZZO NEL DB
    async searchApartment(city) {
      if (this.searchCity !== '') {
        try {
          this.isLoading = true; // Mostra lo spinner
          const response = await axios.get(`http://localhost:8000/api/search`, {
            params: {
              city: city,
            },
          });

          store.apartments = response.data;
          store.city = city;

          console.log(store.apartments);
          this.$router.push({ name: 'AdvancedSearch' });
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false; // Nascondi lo spinner
        }
      }
    },

    // FUNZIONE SELEZIONE INDIRIZZO DAI SUGGERIMENTI
    selectSuggestion(suggestion) {
      store.searchCity = suggestion.address.freeformAddress;
      this.suggestions = [];
      console.log(store.searchCity)
    },
  },
};
</script>

<template>
  <div class="input-group">
    <form @submit.prevent="searchApartment(store.searchCity)" autocomplete="off" class="d-flex w-100 d-flex justify-content-center">

        <div class="form-group w-50 ">
          
          <input
            type="text"
            class="form-control text-dark"
            id="city"
            placeholder="Cerca"
            v-model="store.searchCity"
            @input="searchSuggestions"
          >
        </div>
        <!-- Suggerimenti -->
        <div v-if="suggestions.length > 0" class="suggestions w-50">
          <ul>
            <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
              {{ suggestion.address.freeformAddress }}
            </li>
          </ul>
        </div>

        <!--bottone e loader-->
        <div class="form-group px-2">
          <button type="submit" class="btn btn-color " :disabled="isLoading">
            <span v-if="!isLoading"><i class="fa-solid fa-magnifying-glass"></i></span>
            <div v-else class="spinner-border spinner-border-sm text-light custom-spinner" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </div>
    </form>
  </div>
</template>

<style scoped>


/* COLORE TASTO CERCA */
.btn-color{
  background-color: #EF7039;
}

.btn-color:hover{
  background-color: #1970f4;
}
.suggestions {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 999;
  max-height: 150px;
  overflow-y: auto;
  margin-top: 38px;
  margin-right: 55px;
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


.btn:disabled{
  background-color: gray;
}
</style>
