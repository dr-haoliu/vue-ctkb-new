import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchCondition from "../views/SearchCondition";
import SearchCriteria from "../views/SearchCriteria";
import CriteriaList from "../views/CriteriaList";
import API from "../views/API";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/condition',
        name: 'SearchCondition',
        component: SearchCondition
    },
    {
        path: '/criteria',
        name: 'SearchCriteria',
        component: SearchCriteria
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/criterialist',
        name: 'CriteriaList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/CriteriaList')
    },
    {
        path: '/API',
        name: 'API',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/API')
    }
]

const router = new VueRouter({
    routes
})

export default router
