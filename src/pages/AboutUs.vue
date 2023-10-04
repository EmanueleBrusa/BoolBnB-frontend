<script>
import AppLoader from '../components/AppLoader.vue';

    export default {
        name: "AboutUs",
        components:{
            AppLoader,
        },
        data() {
            return {
            }
        },
        
    }
</script>


<template>
    <h1 class="text-center pb-4"><i class="fa-solid fa-earth-europe"></i>BoolBnb</h1>
    <div class="container mb-5">
        <div class="row">
            
            <div class="col-6 py-5">
               
                <h3 class="text-center">La nostra storia</h3>
                <p><strong>BoolBnb</strong> è una piattaforma di condivisione di alloggi che è stata fondata nel <strong>2023</strong> da un gruppo di amici con una passione comune per i viaggi e la condivisione di esperienze uniche. La storia della sua nascita inizia con l'esperienza personale dei fondatori <strong>Gianmauro, Giacomo, Emanuele e Stefano</strong> nel cercare alloggi durante un viaggio in Europa.
                Oggi, BoolBnb è diventata una delle principali piattaforme di condivisione di alloggi al mondo, offrendo una vasta gamma di opzioni di alloggio in tutto il mondo. La sua storia di successo è stata alimentata dalla passione dei suoi fondatori per i viaggi e dalla loro visione di creare un modo migliore per le persone di scoprire il mondo e condividere esperienze uniche.
                </p>
            </div>
            <div class="col-6 py-5">
                <img class="rounded-circle" width="400px" height="300px" src="https://www.subito.news/subitonews/wp-content/uploads/2021/06/case-da-sogno-1.jpg" alt="">
            </div>
        </div> 
    </div>
    <div class="container pb-5">
        <div class="row">
            <div class="col-4 ps-3">
                <img class="rounded-circle" width="400px" height="300px" src="https://picsum.photos/id/870/200/300?grayscale&blur=2" alt="">
            </div>
            <div class="col-8">
                <h3 class="text-center">La nostra missione</h3>
                <p class="mt-5">Negli anni successivi, <strong>BoolBnb</strong> ha attirato l'attenzione degli investitori, consentendo loro di espandere e migliorare la piattaforma. Hanno introdotto nuove funzionalità, inclusi sistemi di recensioni e valutazioni per utenti e host, oltre a un sistema di prenotazione online sicuro e affidabile. Con l'obbiettivo di regalare la miglior esperienza possibile ed indimenticabile offrendo una vasta gamma di opzioni di alloggio in tutto il mondo.
                </p>
            </div>
            
        </div> 
        <ContactForm></ContactForm>
    </div>
    
</template>





<style lang="scss" scoped>


    
</style>