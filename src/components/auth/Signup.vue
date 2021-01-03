<template>
    <div class="signup">
        <h3 class="text-center">Sign Up</h3>
        <div>
            <form @submit.prevent="signup">
                <div>
                    <input
                        type="text"
                        class="form-control"
                        name="email"
                        v-model="email"
                        placeholder="Email"
                    />
                    <small id="emailHelp" class="form-text text-muted"
                        >We'll never share your info with anyone.</small
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
                <div class="form-group">
                    <input
                        class="form-control"
                        type="text"
                        name="invitcode"
                        v-model="invitecode"
                        placeholder="Invitation Code"
                    />
                    <small id="emailHelp" class="form-text text-muted"
                        >Get the invitation code from admin</small
                    >
                </div>
                <p v-if="feedback" class="text-danger">{{ feedback }}</p>
                <div class="form-group">
                    <button class="btn btn-block" type="submit">
                        Sign Up!
                    </button>
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
                    Already a member?
                    <router-link
                        :to="{ name: 'Login' }"
                        class="font-italic"
                        href="/login"
                        >Login here!</router-link
                    >
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
// import functions from 'firebase/functions'

export default {
    name: "Signup",
    data() {
        return {
            email: null,
            password: null,
            invitecode: null,
            feedback: null,
        };
    },
    methods: {
        signup() {
            let checkinvite = firebase.functions().httpsCallable("checkinvite");
            checkinvite(this.invitecode).then((result) => {
                if (result.data && this.email && this.password) {
                    this.feedback = null;
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            this.email,
                            this.password
                        )
                        .then(() => {
                            this.$router.push({
                                name: "Profile",
                                params: { user_id: this.user_uid },
                            });
                        })
                        .catch((err) => {
                            this.feedback = err.message;
                        });
                } else {
                    this.feedback = "Please finish your signup";
                }
            });
        },
        signupwithgoogle() {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase
                .auth()
                .signInWithPopup(provider)
                .then(() => {
                    // console.log("just checking");
                    // var credential = result.credential;
                    // console.log(credential);

                    // // This gives you a Google Access Token. You can use it to access the Google API.
                    // var token = credential.accessToken;
                    // console.log(token);
                    // // The signed-in user info.
                    // var user = result.user;
                    // console.log(user);
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
                    // The email of the user's account used.
                    var email = error.email;
                    console.log(email);
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    console.log(credential);
                    // ...
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

.signup .googlelogin:hover {
    cursor: pointer;
}

.signup .btn {
    background-color: #9fb6cd;
    color: white;
}

.signup .btn:hover {
    background-color: rgb(128, 153, 179);
    color: white;
}
</style>