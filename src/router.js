import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

let router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'Blog',
            component: () => import('./views/home.vue'),
        },
        {
            path: '/add',
            name: 'Add article',
            component: () => import('./views/addArticle.vue'),
            children: [
                {
                    path: '/add/:id',
                    name: 'Edit article',
                    component: () => import('./views/addArticle.vue')
                }
            ]
        },
    ]
});


router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

export default router;