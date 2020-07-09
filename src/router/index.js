import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Signup from '../components/auth/Signup.vue'
import Login from '../components/auth/Login.vue'
import Journeys from '../components/journeys/Journeys.vue'
import AddJourney from '../components/journeys/AddJourney.vue'
import EditJourney from '../components/journeys/EditJourney.vue'
import ShowJourney from '../components/journeys/ShowJourney.vue'
import AddComment from '../components/comments/AddComments.vue'
import Profile from '../components/users/Profile.vue'
import MyJourneys from '../components/users/MyJourneys.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/:journey_slug/addcomment',
        name: 'AddComment',
        component: AddComment,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/index',
        name: 'Index',
        redirect: 'Journeys',
        component: Index,
        children: [
            {
                path: '/signup',
                name: 'Signup',
                component: Signup
            },
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/journeys',
                name: 'Journeys',
                component: Journeys,
                props: true
            },
            {
                path: '/journeys/add',
                name: 'AddJourney',
                component: AddJourney,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/journeys/edit/:journey_slug',
                name: 'EditJourney',
                component: EditJourney,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/journeys/:journey_slug',
                name: 'ShowJourney',
                component: ShowJourney
            },
            {
                path: '/profile/:user_id',
                name: 'Profile',
                component: Profile
            },
            {
                path: '/myjourneys/:user_id',
                name: 'MyJourneys',
                component: MyJourneys
            }
        ]
    }

    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    //check to see if route require auth
    if (to.matched.some(rec => rec.meta.requiresAuth)) {
        //check auth stat of user
        let user = firebase.auth().currentUser
        if (user) {
            //user signed in, proceed to route
            next()
        } else {
            next({ name: 'Login' })
        }
    } else {
        next()
    }
})

export default router
