<!-- JAVASCRIPT & VUE.JS -->
<script>
import axios from 'axios';
import { store } from '../store';

export default {
    props: {
        apartment: {
            type: Array,
            required: true
        }
    },

    name:'MapApartament',

    data() {
        return {
            // apartment:'',
        }
    },

    watch:{apartment(newValue, oldValue){
        console.log("newValue", newValue)
        if(newValue)
            this.viewMap()
    }

    },

    mounted() {
        this.viewMap()
    },

    methods: {
       viewMap(){
            // chiamata api degli appartamenti
            // axios.get(`${store.apartmentsUrl}/api/apartments/${this.$route.params.slug}`).then((response) =>{
            //     if(response.data.success){
            //         this.apartment =response.data.apartment
            //         store.loading=false
            //     }else{
            //         this.$router.push({name:'not-found'});
            //     }

            // });
            let map, long, lat;
            if(this.apartment){
                // debugger
                if(this.apartment.length>1){
                    this.apartment.forEach((element, i) => {
                    
                })

                }
                this.apartment.forEach((element, i) => {
                    if (i==0){
                        map = tt.map({
                            container: "map",
                            key: "zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p", //zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p brusa ||  hThUeWOkuwn7VZV1hYMz1TA6KlJr6vsL eugeniu
                            center: [element.longitude, element.latitude],
                            zoom:13
                        })
                    }
                    
                    new tt.Marker().setLngLat([element.longitude, element.latitude]).addTo(map)
                });    

                // funzione introduzione mappa prendendo la latitudine e la longitudine dalla chiamata api degli appartamenti
                // let long = this.apartment.longitude
                // let latitude = this.apartment.latitude
            }
        }
    },
}
</script>

<!-- TEMPLATE HTML -->
<template lang="">
    <div id='map'></div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
#map{
    height: 500px;
    width: 100%;
        
}


</style>