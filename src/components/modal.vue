<template>
    <div v-if="modal_show" class="modal-content">
        <div  @click="close()" class="bg-effect"></div>
        <div class="modal">
            <div @click="close()" class="close">
                <img src="../assets/images/svg/close.svg" width="15px" alt="">
            </div>
            <div class="blog-info">
                <h3 class="title">{{article.title}}</h3>
                <p class="description">{{article.description}}</p>
                <div class="blog-footer">
                    <p @click="editArticle()">Edit</p>
                    <p @click="deleteArticle()">Delete</p>
                </div>
            </div>
            <div class="blog-comments">
                <div class="headline">
                    <h3 class="title">Comments</h3>
                    <img
                            src="../assets/images/svg/delete.svg"
                            width="16"
                            :class="{'active': active_comment.length > 0}"
                            @click="deleteComments()"
                    >
                </div>
                <div class="comment-wrap">
                    <div
                            v-for="(item, key) in comments"
                            :key="key"
                            @click="selectComment(key)"
                            :class="['comments-list', {'active': checkActive(key)}]"
                    >
                        <h4 class="author">{{item.author}}</h4>
                        <p class="comment">{{item.text}}</p>
                    </div>
                </div>
                <div class="comment-form">
                    <h5 v-if="error_text" class="error-text">{{error_text}}</h5>
                    <input type="text" v-model="form.author" placeholder="Enter your name">
                    <textarea v-model="form.text" placeholder="Comment..."></textarea>
                    <button @click="addComment()" class="add-btn">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/types"

    export default {
        name: "modal",
        props: {
            modalShow: {
                type: Boolean,
                default: false
            },
            articleId: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                active_comment: [],
                comments: [],
                error_text: null,
                modal_show: this.modalShow,
                form: {
                    author: "",
                    text: ""
                }
            }
        },
        computed: {
            valid() {
                return this.form.author.length > 0 && this.form.text.length > 0
            },
            article() {
                let res = null;
                this.$store.getters["getArticles"].forEach(val => {
                    if (val.id === this.articleId)
                        res = val
                });
                return res
            }
        },
        methods: {
            deleteComments() {
                if (this.active_comment.length > 0) {
                    this.$store.dispatch(types.A_DELETE_COMMENTS, {
                        comments: this.active_comment,
                        id: this.articleId
                    });
                    this.active_comment = [];
                }
            },
            deleteArticle() {
                this.close();
                this.$store.dispatch(types.A_DELETE_ARTICLE, this.articleId)
                    .then(() => {
                        this.$store.state.key++
                    })
            },
            editArticle() {
                this.$router.push(`/add/${this.articleId}`)
            },
            checkActive(key) {
                return this.active_comment.some( val => {
                    return val === key
                })
            },
            selectComment(key) {
                this.active_comment.push(key)
            },
            close() {
                this.$emit("hide", false)
            },
            addComment() {
                if (this.valid) {
                    this.error_text = null;
                    this.$store.dispatch(types.A_ADD_COMMENT, {
                        form: {...this.form},
                        id: this.articleId
                    })
                        .then( () => {
                            this.form.author = "";
                            this.form.text = "";
                        })
                } else {
                    this.error_text = "Fill in all the fields"
                }
            }
        },
        beforeDestroy() {
            document.querySelector("body").style.overflow = "auto"
        },
        watch: {
            modalShow(val) {
                this.modal_show = val;
                this.active_comment = [];
                if (val)
                    document.querySelector("body").style.overflow = "hidden";
                else
                    document.querySelector("body").style.overflow = "auto"
            },
            "article.comments"(val) {
                if (val)
                    this.comments = [...val]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-content {
        min-width: 1000px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        padding: 60px 0;
        overflow: auto;
        .bg-effect {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #3333;
        }
        .modal {
            min-height: 50vh;
            position: relative;
            background-color: #ffffff;
            border-radius: 4px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            margin: 0 80px;
            padding: 30px;
            .close {
                position: absolute;
                top: 20px;
                right: 20px;
                opacity: .4;
                transition: all .2s;
                cursor: pointer;
                &:hover {
                    opacity: .8;
                }
            }
            .title {
                color: #17145b;
                font-size: 16px;
                margin-bottom: 15px;
            }
            .blog-info {
                border-right: 1px solid #ddd;
                padding-right: 20px;
                display: grid;
                grid-template-rows: auto 1fr auto;
                .description {
                    font-size: 14px;
                    color: #626262;
                }
                .blog-footer {
                    align-self: end;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p {
                        font-size: 15px;
                        color: #8a8a8a;
                        cursor: pointer;
                        transition: all .2s;
                        &:hover {
                            color: #626262;
                        }
                    }
                }
            }
            .blog-comments {
                padding: 20px;
                display: grid;
                grid-template-rows: auto 1fr auto;
                align-content: space-between;

                .headline {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    h3 {
                        margin: 0;
                    }
                    img {
                        opacity: .4;
                        &.active {
                            opacity: 8;
                            cursor: pointer;
                        }
                    }
                }
                .comment-wrap {
                    border-bottom: 1px solid #ddd;
                    padding: 10px;
                    overflow: auto;
                    max-height: 200px;

                    .comments-list {
                        margin-bottom: 10px;
                        cursor: pointer;
                        transition: all .2s;
                        &:hover {
                            background-color: #efefef;
                        }
                        &.active {
                            background-color: #efefef;
                        }
                        .author {
                            font-size: 14px;
                            color: #3a3748;
                            margin-bottom: 5px;
                        }
                        .comment {
                            font-size: 13px;
                            color: #626262;
                        }
                    }
                }
                .comment-form {
                    align-self: end;
                    display: grid;

                    .error-text {
                        margin-top: 5px;
                        color: red;
                        text-align: center;
                    }
                    input, textarea {
                        margin-top: 10px;

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
                        margin-top: 10px;
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
    }

</style>