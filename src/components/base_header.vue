<template>
    <header>
        <router-link tag="h1" to="/">MY BLOG</router-link>
        <router-link
                tag="button"
                :to="$route.path === '/add' || $route.params.id ? '/' : '/add'"
                class="add-btn"
        >
            {{$route.path === "/add" || $route.params.id ? "Go Back" : "Add"}}
        </router-link>
    </header>
</template>

<script>
    export default {
        name: "base_header"
    }
</script>

<style lang="scss" scoped>
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 10px 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #039BE5;

        h1 {
            font-size: 22px;
            color: #ffffff;
            cursor: pointer;
        }
        .add-btn {
            font-size: 14px;
            color: #ffffff;
            background-color: #1dc739;
            border: none;
            border-radius: 4px;
            padding: 6px 14px;
            box-shadow: 0 2px 4px 0 rgba(50, 50, 50, .2);
            cursor: pointer;
            transition: all .2s;

            &:hover {
                background-color: #22d43b;
                box-shadow: 0 2px 5px 0 rgba(50, 50, 50, .4);
            }
        }
    }
</style>