<template>
    <div class="signup">
        <h3 class="text-center">Sign Up</h3>
        <div>
            <form @submit.prevent="signup">
                <div>
                    <input type="text" class="form-control" name="email" v-model="email" placeholder="Email" >
                    <small id="emailHelp" class="form-text text-muted">We'll never share your info with anyone else.</small>
                </div>
                <div class="form-group">
                    <input class="form-control" type="password" name="password" v-model="password" placeholder="Password">
                    <small id="emailHelp" class="form-text text-muted">6~8 numbers</small>
                </div>
                <div class="form-group">
                    <input class="form-control" type="text" name="invitcode" v-model="invitecode" placeholder="Invitation Code">
                    <small id="emailHelp" class="form-text text-muted">Get the invitation code from admin</small>
                </div>
                <p v-if="feedback" class="text-danger">{{ feedback }}</p>
                <div class="form-group">
                    <button class="btn btn-block" type="submit">Sign Up!</button>
                </div>
                <p>
                    Already a member? <router-link :to="{ name: 'Login' }" class="font-italic" href="/login">Login here!</router-link>
                </p>
            </form>
        </div>

    </div>
</template>

<script>
import firebase from 'firebase'
// import functions from 'firebase/functions'

export default {
    name: 'Signup',
    data(){
        return {
            email: null,
            password: null,
            invitecode: null,
            feedback: null
        }
    },
    methods:{
        signup(){
            let checkinvite = firebase.functions().httpsCallable('checkinvite');
            checkinvite(this.invitecode).then(result => {    
                if(result.data && this.email && this.password){
                    this.feedback = null
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        this.$router.push({ name: 'Profile', params: {user_id: this.user_uid} });
                    }).catch(err => {
                        this.feedback = err.message;
                    })
                } else {
                    this.feedback = 'Please finish your signup';
                }
            })
        }
    }
}
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


.signup .btn {
    background-color: #9FB6CD;
    color:white;
}

.signup .btn:hover {
    background-color: rgb(128, 153, 179);
    color:white;
}
</style>