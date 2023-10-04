<script>

export default {
    name: 'AppHeader',

    data() {
        return {
            menuItems: [
                {
                    label: 'Home',
                    routeName: 'Home'
                },
                {
                    label: 'Chi siamo',
                    routeName: 'AboutUs'
                },
     

            ]
        }
    },


}

</script>

<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light nav-background shadow-sm fixed z-3">
            <div class="container">

                <!-- Left side nav bar -->
                <router-link class="navbar-brand d-flex align-items-center transition-logo" :to="{ name: 'Home' }">
                    <div class="logo-laravel ">
                        <h2 class="logo p-4 rounded-5 shadow-lg"><i class="fa-solid fa-earth-europe"></i>BoolBnB
                        </h2>                        
                    </div>
                </router-link>


                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse text-center display-manual-flex" id="navbarSupportedContent" >
                    <div class="colapse-content">
                        <!-- Right side navbar -->
                        <ul class="navbar-nav">
                            <li class="nav-item " v-for="(item, index) in menuItems" :key="index">
                                <router-link class="nav-link fs-4 fw-semibold link-hover-header px-3 py-2 rounded-5" :to="{ name: item.routeName }">
                                    {{ item.label }}
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <a href="http://127.0.0.1:8000/" class="nav-link fs-4 fw-semibold link-hover-header px-3 py-2 rounded-5" >Diventa Host</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
        
    </div>
</template>


<style lang="scss" scoped>
.logo {
    color: white;
    transition: background-color 1s;
}

.logo:hover {
    background-color: #FFBC19;
    color: white;
}

.link-hover-header {
    color: white;
}

.link-hover-header:hover {
    background-color: #FFBC19;
}

.nav-background {
    background-color: #EF7039;
}

.drop-down:hover {
    background-color: #FFBC19;
}

.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

@media screen and (min-width: 992px){
    .display-manual-flex{
        display: flex;
        align-items: end;
        justify-content: end;
    }

}


</style>