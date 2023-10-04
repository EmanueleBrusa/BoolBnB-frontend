
<!-- JAVASCRIPT & VUE.JS -->
<script>
export default {

    name:'AppLoader',

}
</script>

<!-- TEMPLATE HTML -->
<template lang="">
    <div class="loader"></div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;

.loader {
    border: 16px solid #f3f3f3;
    /* Light grey */
    border-top: 16px solid #EF7039;
    /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>