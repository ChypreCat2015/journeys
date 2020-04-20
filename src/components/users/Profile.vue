<template>
    <div class="profile container mt-3">
        <form @submit.prevent="updateName">
            <h2 class="text-center">Update Profile</h2>
            <div class="form-group">
                <label>Update your Display Name for a cooler one?</label>
                <input type="text" class="form-control" name="nickname" v-model="nickname">
                <p v-if="feedback" class="text-info  mt-2 text-monospace">{{ feedback }}</p>
                <button class="btn mt-2">UPDATE</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'Profile',
    data(){
        return {
            nickname: null,
            feedback: null
        }
    },
    methods: {
        updateName(){
            const user = firebase.auth().currentUser
            if(user){
                user.updateProfile({
                    displayName: this.nickname                   
                }).then(() => {
                    this.feedback = 'Refresh the page to checkout your new name!'
                    //update journey author name
                    db.collection('journeys').where('author_id', '==', user.uid).get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            db.collection('journeys').doc(doc.id).update({
                                "author": this.nickname
                            })
                        })
                    })
                    //update comment author/from name 
                    db.collection('comments').where('from_id', '==', user.uid).get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            db.collection('comments').doc(doc.id).update({
                                "from": this.nickname
                            })
                        })
                    })
                }).catch(err => {
                    console.log(err)
                })
            } else {
                console.log('from profile page ' + 'no current user' )
            }
        }
    }
}
</script>

<style>
.profile .form-group {
    width: 400px;
    margin: 0 auto;
}
.profile .btn {
    background-color: #9FB6CD;
    color:white;
}

.profile .btn:hover {
    background-color: rgb(128, 153, 179);
    color:white;
}
</style>

