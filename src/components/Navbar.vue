<template>
    <div class="navbarpage">
        <nav
            class="navbar navbar-expand-sm navbar-light"
            style="background-color: #9fb6cd"
        >
            <router-link
                :to="{ name: 'Home' }"
                class="navbar-brand font-weight-bolder text-white"
                >Home</router-link
            >
            <!-- //mobile navbar toggler -->
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navlinks"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- //mobile navbar toggler -->

            <div class="collapse navbar-collapse" id="navlinks">
                <ul class="navbar-nav mr-auto">
                    <li class="navbar-item active">
                        <router-link
                            :to="{ name: 'Journeys' }"
                            class="nav-link text-white"
                            >My W Journeys</router-link
                        >
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li v-if="!user" class="nav-item">
                        <router-link
                            :to="{ name: 'Signup' }"
                            class="nav-link text-white"
                            >Signup</router-link
                        >
                    </li>
                    <li v-if="!user" class="nav-item">
                        <router-link
                            :to="{ name: 'Login' }"
                            class="nav-link text-white"
                            >Login</router-link
                        >
                    </li>
                    <li v-if="user" class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle text-white"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            {{ user.displayName || user.email }}
                        </a>
                        <div
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            <router-link
                                :to="{
                                    name: 'Profile',
                                    params: { user_id: this.user.uid },
                                }"
                                class="dropdown-item"
                                >Profile</router-link
                            >
                            <router-link
                                :to="{
                                    name: 'MyJourneys',
                                    params: { user_id: this.user.uid },
                                }"
                                class="dropdown-item"
                                >My Journeys</router-link
                            >
                        </div>
                    </li>
                    <li v-if="user" class="nav-item">
                        <a @click="logout" class="nav-link text-white"
                            >Logout</a
                        >
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: "Navbar",
    data() {
        return {
            user: null,
        };
    },
    methods: {
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.push({ name: "Journeys" });
                })
                .catch((err) => console.log(err));
        },
    },
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
        });
    },
};
</script>

<style>
body {
    min-width: 350px;
}
.navbarpage .nav-link {
    cursor: pointer;
}
.navbarpage .dropdown-item {
    color: rgb(128, 153, 179);
}
</style>