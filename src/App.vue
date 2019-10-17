<template>
    <div id="app">
        <base-header></base-header>
        <router-view :key="key"/>
    </div>
</template>

<script>
    import baseHeader from "./components/base_header"

    export default {
        name: 'app',
        components: {
            baseHeader
        },
        computed: {
            key() {
                return this.$store.state.key
            }
        }
    }
</script>

<style lang="scss">
    @import "assets/css/reset.css";
</style>
