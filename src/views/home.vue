<template>
    <div class="home">
        <div class="blog-content">
            <template v-if="articles_list.length > 0">
                <div
                        v-for="(item, key) in articles_list"
                        :key="key"
                        class="blog-item"
                        @click="showBlogInfo(item.id)"
                >
                    <div class="headline">
                        <h3>{{item.title}}</h3>
                    </div>
                    <p class="description">{{item.short_description}}</p>
                    <div class="comments-wrap">
                        <p class="comments">{{item.comments.length}} comments</p>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="blog-item">
                    <div class="headline">
                        <h3 class="align-center">You have no articles</h3>
                    </div>
                </div>
            </template>
        </div>
        <modal
                :modal-show="modal_status"
                @hide="modal_status = $event"
                :article-id="selected_article_id"
        ></modal>
    </div>
</template>

<script>
    import modal from "../components/modal"

    export default {
        name: "home",
        components: {
            modal
        },
        data() {
            return {
                modal_status: false,
                selected_article_id: null,
                articles_list: [],
                articles_load: 5
            }
        },
        mounted() {
            this.articles = this.articles_load;
            window.addEventListener("scroll", () => {
                let d = document.documentElement;
                let offset = d.scrollTop + window.innerHeight;
                let height = d.offsetHeight;
                if (offset === height) {
                    setTimeout( () => {
                        this.articles_load +=5;
                        this.articles = this.articles_load;
                    },400)
                }
            })
        },
        computed: {
            articles: {
                get() {
                    return this.articles_list
                },
                set(val) {
                    this.articles_list = [];
                    for (let i = 0; i < val; i++) {
                        if (this.$store.getters["getArticles"][i])
                            this.articles_list.push(this.$store.getters["getArticles"][i])
                    }
                }
            },
        },
        methods: {
            showBlogInfo(id) {
                this.selected_article_id = id;
                this.modal_status = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/blog_content";
</style>