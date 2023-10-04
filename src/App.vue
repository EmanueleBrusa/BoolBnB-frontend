<script>
  // IMPORTO AXIOS
  import axios from 'axios';
  // IMPORTO STORE.JS
  import { store } from './store.js';

  import HomePage from './pages/HomePage.vue';
  import AppHeader from './components/AppHeader.vue';
  import AppFooter from './components/AppFooter.vue';

  export default {
    components: {
      HomePage,
      AppHeader,
      AppFooter,
    },
    data() {
      return {
        // DICHIARO STORE.JS
        store,
      };
    },
    methods: {
      // getApartment() {
      //   // CONTROLLO CHE L'UTENTE ABBIA INSERITO UNA STRINGA NELLA SEARCH-BAR
      //   if (store.userSearch !== '') {
      //     // CREO L'URL PER LA CHIAMATA API APARTMENT CON IL FILTRAGGIO RICHIESTO DALL'UTENTE
      //     const apartmentUrl = `${store.apartmensUrl}?api_key=${store.apiKey}&query=${store.userSearch}`;
      //     // EFFETTUO LA CHIAMATA API PER OTTENERE I FILM RICERCATI DALL'UTENTE
      //     axios.get(apartmensUrl).then((result) => {
      //       // INSERISCO DENTRO L'ARRAY APARTMENTS GLI OGGETTI OTTENUTI DALLA CHIAMATA API
      //       store.apartments = result.data.results;
      //     });
      //   }
      // }
    },
  };
</script>

<template>
  <div class="margin-top">
    <AppHeader />
    <search-bar></search-bar>
    <router-view></router-view>
    <AppFooter />
  </div>
</template>

<style lang="scss">
  @use './styles/generals.scss' as *;

  .margin-top {
    margin-top: 120px;
  }
</style>
