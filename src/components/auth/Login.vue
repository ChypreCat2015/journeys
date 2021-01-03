<template>
    <div class="login">
        <h3 class="text-center">Login</h3>
        <div>
            <form @submit.prevent="login">
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        name="email"
                        v-model="email"
                        placeholder="Email"
                    />
                    <small id="emailHelp" class="form-text text-muted"
                        >We'll never share your info with anyone else.</small
                    >
                </div>
                <div class="form-group">
                    <input
                        class="form-control"
                        type="password"
                        name="password"
                        v-model="password"
                        placeholder="Password"
                    />
                    <small id="emailHelp" class="form-text text-muted"
                        >6~8 numbers</small
                    >
                </div>
                <span v-if="feedback" class="text-danger">{{ feedback }}</span>
                <div class="form-group">
                    <button class="btn btn-block" type="submit">LOGIN</button>
                </div>
                <div class="form-group">
                    <div v-on:click="signupwithgoogle">
                        <img
                            src="btn_google_signin_light_normal_web@2x.png"
                            alt="google login"
                            width="100%"
                            class="googlelogin"
                        />
                    </div>
                </div>
                <p>
                    Not a member?
                    <router-link
                        :to="{ name: 'Signup' }"
                        class="font-italic"
                        href="/signup"
                        >Signup here!</router-link
                    >
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: "Login",
    data() {
        return {
            email: null,
            password: null,
            feedback: null,
        };
    },
    methods: {
        login() {
            if (this.email && this.password) {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        this.$router.push({ name: "Index" });
                    })
                    .catch((err) => {
                        this.feedback = err.message;
                    });
            } else {
                this.feedback = "Please fill all fields";
            }
        },
        signupwithgoogle() {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase
                .auth()
                .signInWithPopup(provider)
                .then(() => {
                    this.$router.push({
                        name: "Journeys",
                    });
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    console.log(errorCode);
                    var errorMessage = error.message;
                    console.log(errorMessage);
                });
        },
    },
};
</script>

<style scoped>
h3 {
    margin-top: 50px;
}
form {
    width: 300px;
    margin: 0 auto;
    margin-top: 40px;
}

input {
    margin-top: 20px;
}

.login .btn {
    background-color: #9fb6cd;
    color: white;
}

.login .googlelogin:hover {
    cursor: pointer;
}
.login .btn:hover {
    background-color: rgb(128, 153, 179);
    color: white;
}
</style>