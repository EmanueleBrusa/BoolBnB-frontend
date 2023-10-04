<script>
    import axios from 'axios';
    import { store } from '../store';
    import AppLoader from '../components/AppLoader.vue';
    import ContactForm from '../components/ContactForm.vue';
    import MapApartament from '../components/MapApartament.vue';

    export default {
        name:'SingleApartment',
        
        components:{
                AppLoader,
                ContactForm,
                MapApartament,
            },

        data() {
            
            return {
                store,
                apartment:'',
               
            }
        },

        created() {
            this.getSingleApartment()
        },

        methods: {
            getSingleApartment(){
                store.loading=true
                axios.get(`${store.apartmentsUrl}/api/apartments/${this.$route.params.slug}`).then((response) =>{
                    if(response.data.success){
                        this.apartment =response.data.apartment
                        store.loading=false
                    }else{
                        this.$router.push({name:'not-found'});
                    }
                });
            }
        },


        mounted() {
        axios
            .get("https://api.ipify.org?format=json")
            .then((response) => {
                const ipAddress = response.data.ip;

                axios
                    .post("http://localhost:8000/api/visitor/store", {
                        apartment_id: this.apartment.id,
                        ip_address: ipAddress,
                    })
                    .then((response) => {
                        if (response.data.success) {
                            console.log("View has been registered.");
                        } else {
                            console.log("Error: " + response.data.message);
                        }
                    })
                    .catch((error) => {
                        console.error("Error while storing view: " + error);
                    });
            })
            .catch((error) => {
                console.error("Error while fetching IP address: " + error);
            });
    },




    }

</script>


<template lang="">

    <div class="container" v-if="store.loading">
        <div class="row" >
            <div class="col-12 d-flex justify-content-center" >
                <AppLoader/>
            </div>
        </div> 
    </div>

    
    <div class='container py-3' v-else>
        <div class='row border-bottom pb-5 border-2'>
            <div class="col-12 col-md-8">
                <div class="apartment-content">
                    <!-- Titolo e Indirizzo -->
                    <div class="top-text-content mb-3">
                        <h2>{{ apartment.title}}</h2>
                        <span ><i class="fa-solid fa-location-dot"></i> {{apartment.address}}</span>
                    </div>
                    <!-- Immagine -->
                    <div class="img-container border-top pt-3">
                        <img :src="`${store.apartmentsUrl}/storage/${apartment.cover_img}`" class="img-fluid rounded-5" :alt="apartment.title"/>
                    </div>
                    <!-- Apartment description -->
                    <div class="description border-top mt-3">
                        <h4 class="mt-2">Descrizione</h4>
                        <p class="my-2 ">{{apartment.description}} </p>
                    </div>
                    <!-- numero delle stanze letti e bagni  -->
                    <div class="mt-3 d-flex">
                        <div class="me-2"><i class="fa-solid fa-house-user"></i> {{apartment.n_rooms}} stanze &#8226;</div>
                        <div class="me-2"><i class="fa-solid fa-bed"></i>  {{apartment.n_beds}} letti &#8226;</div>
                        <div class="me-2"><i class="fa-solid fa-bath"></i> {{apartment.n_bathrooms}} bagni &#8226;</div> 
                        <div class="me-2"><i class="fa-solid fa-ruler-combined"></i>  {{apartment.square_meters}}m&sup2;</div>
                    </div>
                    <!-- Servi -->
                    <div class="service">
                        <h4 class="mt-3">Servizi accessori</h4>
                        <div class="service-container d-flex flex-wrap" >
                            <span class="me service-color px-2 rounded-pill me-1 my-1" v-for='item in apartment.services' :key='item.id'>
                                <span v-html="item.icon"></span>
                                {{item.type}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact form -->
            <div class="col-12 col-md-4 border-start mt-3">
                <div class="d-flex justify-content-end flex-column align-items-center">
                    <ContactForm :apartment="apartment"/>
                </div> 
            </div>
        </div>
    </div>

    <!-- Map -->
    <div class="container">
        <div class="row mb-5">
            <div class="col-12">
                <MapApartament :apartment="[apartment]" v-if="apartment"/>
            </div>
        </div>
    </div>
  
</template>


<style lang="scss" scoped>
  .service-color{
    background-color: #C1DBE3;
  }

.img-container{
    width: 100%;

    img{
        width: 100%;
    }
}

</style>