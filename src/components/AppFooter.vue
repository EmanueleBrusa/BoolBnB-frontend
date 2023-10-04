<script>

export default {
    name: 'AppFooter',

    data() {
        return {

        }
    },


}

</script>

<template>
    <div class="jumbotron-footer pb-3">

        <!--  -->
        <hr class="m-0 mb-4">
        <div class="container">
            <div class="row">
                <!-- LINK UTILI FOOTER -->
                <div class="col-12 d-flex align-items-center justify-content-evenly footer-flex-lists">
                    <!-- parte dell'assistenza -->
                    <div class="footer-container">
                        <ul class="list-unstyled">
                            <li>
                                <span><strong>Assistenza</strong></span>
                            </li>
                            <li>
                                <a href="#">Centro Assistenza</a>
                            </li>
                            <li>
                                <a href="#">Antidiscriminazione</a>
                            </li>
                            <li>
                                <a href="#">Supporto alla disabilita</a>
                            </li>
                            <li>
                                <a href="#">Opzioni di cancellazione</a>
                            </li>
                            <li>
                                <a href="#">Segnala un problema</a>
                            </li>
                        </ul>
                    </div>

                    <!-- parte del host -->
                    <div class="footer-container">
                        <ul class="list-unstyled">
                            <li>
                                <span><strong>Ospitare</strong></span>
                            </li>
                            <li>
                                <a href="#">Apri un BoolBnB</a>
                            </li>
                            <li>
                                <a href="#">Risorse per gli Host</a>
                            </li>
                            <li>
                                <a href="#">Forum della community</a>
                            </li>
                            <li>
                                <a href="#">Ospitare responsabilmente</a>
                            </li>
                            <li>
                                <a href="#">AirCover per gli host</a>
                            </li>
                        </ul>
                    </div>

                    <!-- parte del host -->
                    <div class="footer-container">
                        <ul class="list-unstyled">
                            <li>
                                <span><strong>BoolBnB</strong></span>
                            </li>
                            <li>
                                <a href="#">Newroom</a>
                            </li>
                            <li>
                                <a href="#">Nuove funzionalita</a>
                            </li>
                            <li>
                                <a href="#">Opportunità di lavoro</a>
                            </li>
                            <li>
                                <a href="#">investitori</a>
                            </li>
                            <li>
                                <a href="#">Gift card</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <!-- PRIVACY -->
            <hr>
            <div class="col-12 d-flex justify-content-evenly align-items-center footer-flex">
                <!-- left side privacy -->
                <div class="privacy-conainter">
                    <p class="m-0">&#169; 2023 BoolBnb, SrL &#8226; 
                        <a href="#" class="footer-link">Privacy</a> &#8226;
                        <a href="#" class="footer-link">Termini e condizioni</a> &#8226; 
                        <a href="#" class="footer-link">Dettagli dell'azienda</a> 
                    </p>
                </div>
                <!-- right side privacy -->
                <div class="social-container">
                    <ul class="list-unstyled d-flex fs-5  m-0">
                        <li class="ms-2"><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                        <li class="ms-2"><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                        <li class="ms-2"><a href="#"><i class="fa-brands fa-reddit"></i></a></li>
                        <li class="ms-2"><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
a{
    text-decoration: none;
}

p a:hover{
    text-decoration: underline;
}

.jumbotron-footer{
    background-color: #ffca4a;
}

li a{
    color: black;
}

li a:hover{
    text-decoration: underline;
}

@media screen and (max-width: 792px){

.footer-flex-lists{
    display: flex;
    flex-direction: column;
    text-align: center;
}
    .footer-flex{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
}
}
</style>