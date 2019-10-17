<template>
    <div class="add-article">
        <h2 class="headline">{{$route.params.id ? "Edit" : "Add"}} article</h2>
        <div class="add-form">
            <h4 v-if="error_text" class="error-text">{{error_text}}</h4>
            <div class="paragraph">
                <p>Title</p>
                <input type="text" v-model="form.title">
            </div>
            <div class="paragraph">
                <p>Short description</p>
                <input type="text" v-model="form.short_description">
            </div>
            <div class="paragraph">
                <p>Description</p>
                <textarea v-model="form.description"></textarea>
            </div>
            <div class="paragraph">
                <button @click="add()" class="add-btn">{{$route.params.id ? "Edit" : "Add"}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/types"
    export default {
        name: "addArticle",
        data() {
            return {
                error_text: null,
                form: {
                    title: "",
                    short_description: "",
                    description: ""
                }
            }
        },
        computed: {
            valid() {
                return this.form.title.length > 0 && this.form.short_description.length > 0 && this.form.description.length > 0
            }
        },
        mounted() {
            if (this.$route.params.id) {
                let article = {};
                this.$store.getters["getArticles"].forEach( val => {
                    if (val.id == this.$route.params.id) {
                        article = {...val}
                    }
                });
                this.form.title = article.title;
                this.form.short_description = article.short_description;
                this.form.description = article.description;
            }
        },
        methods: {
            add() {
                if (this.valid) {
                    if (this.$route.params.id) {
                        this.$store.dispatch(types.A_EDIT_ARTICLE, {
                            form: {...this.form},
                            id: this.$route.params.id
                        })
                            .then( () => {
                                this.$router.push("/")
                            })
                    } else {
                        this.$store.dispatch(types.A_ADD_ARTICLE, this.form)
                            .then( () => {
                                this.$router.push("/")
                            })
                    }
                } else {
                    this.error_text = "Fill in all the fields"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.add-article {
    padding: 80px;

    .headline {
        color: #17145b;
        font-size: 16px;
        margin-bottom: 10px;
    }
    .add-form {
        width: max-content;
        min-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 5px 0 rgba(100,100,100,.2);

        .error-text {
            color: red;
            text-align: center;
        }
        .paragraph {
            padding-bottom: 15px;
            display: grid;

            p {
                color: #17145b;
                margin-bottom: 6px;
            }
            input, textarea {
                outline: none;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 6px 8px;
                font-size: 13px;
            }
            textarea {
                height: 50px;
                resize: none;
            }
            .add-btn {
                justify-self: end;
                font-size: 14px;
                color: #ffffff;
                background-color: #039BE5;
                border: none;
                border-radius: 4px;
                padding: 6px 14px;
                box-shadow: 0 2px 4px 0 rgba(50, 50, 50, .2);
                cursor: pointer;
                transition: all .2s;

                &:hover {
                    background-color: #039ee8;
                    box-shadow: 0 2px 5px 0 rgba(50, 50, 50, .4);
                }
            }
        }
    }
}
</style>