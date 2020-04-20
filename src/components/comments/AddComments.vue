<template>
    <div id="addcomments">

        <form @submit.prevent="addComment">
            <div class="form-group">
                <button class="btn btn-sm">Add Comment</button>    
            </div>
            <span v-if="feedback" class="text-danger text-monospace">{{ feedback }}</span>
            <div class="form-group card">
                <input type="text" class="form-control" name="comment" v-model="newComment">
            </div>
        </form>
        <div v-if="comments.length !== 0" class="card bg-light my-2 ">
            <div v-for="(comment,index) in comments" :key="index" class="ml-2 mt-2">
                <strong class="mr-2">{{ comment.from }}</strong>
                <small>{{ comment.time }}</small>
                <p class="font-weight-light">{{ comment.content }}</p>
            </div>


        </div>

    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import moment from 'moment' 

export default {
    name: 'AddComments',
    data(){
        return {
            newComment: null,
            feedback: null,
            commentAuthor: null,
            comments:[],
            user: null
        }
    },
    created(){
        //get current user's displayName from firebase.auth
        firebase.auth().onAuthStateChanged(user => {
            if(user){
               // console.log('comment page :you got the user')  
                this.commentAuthor = user.displayName;
                this.user = user;
            } else {
               // console.log('comment page : no user at this time')
            }
        })
        //get comments 无法获取params，可能是因为comments 插入了showpage？
        db.collection('comments').where('to', '==', this.$route.params.journey_slug).orderBy('time')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added') {
                    let doc = change.doc
                    this.comments.unshift({
                        from: doc.data().from,
                        content: doc.data().content,
                        time: moment(doc.data().time).format('L') + ' ' + moment(doc.data().time).format('LT')
                    })
                }
            })
        })
    },
    methods: {
        addComment(){
           let user = firebase.auth().currentUser
            if(user){
                if(this.newComment){
                    this.feedback = null;
                    db.collection('comments').add({
                        to: this.$route.params.journey_slug,
                        from: this.commentAuthor || user.email,
                        from_id: user.uid,
                        content: this.newComment,
                        time: Date.now()
                    }).then(() => {
                        this.newComment = null;
                    })
                    // console.log('thanks for your comment')
                } else {
                    this.feedback =" Please enter your comment";
                }
            } else {
                this.$router.push({ name: 'Login' })
            }
        }
    }
}
</script>
<style>
#addcomments .btn{
    display: inline-block;
    width: 100px;
    padding-left: 0;
    margin-top: 10px;
    background-color: #9FB6CD;
    color:white;
}
#addcomments .btn:hover {
    background-color: rgb(113, 138, 163);
}
</style>