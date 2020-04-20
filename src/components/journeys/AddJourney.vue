<template>
    <div id="addjourney" class="container">
        <div class=row>
            <div class="col">
                <h2 class="text-center mt-3">Create a New Journey</h2>
                <form @submit.prevent="addJourney"> 
                    <div class="form-group">
                        <label for="title">Journey Title</label>
                        <input type="text" class="form-control" name="title" v-model="title"> 
                    </div>
                    <div class="form-group">
                        <label for="location">Location</label>
                        <input type="text" class="form-control" name="location" v-model="location"> 
                    </div>
                    <!-- upload file -->
                    <form class="upload" @submit.prevent="uploadImg">
                        <label for="upload">Only .jpg .jpeg .png file, less than 8MB</label>
                        <input type="file" name ="file" id="file" @change="filePicked" accept=".jpg, .jpeg, .png">
                        <input type="submit" value="Upload" class="btn btn-outline-secondary">
                        <small v-if="imageFeedback" class="text-success">{{ imageFeedback }}</small>
                    </form>
                     <!-- upload file end-->
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="15" name="des" v-model="description"></textarea>
                    </div>
                    <div class="form-group">
                        <p v-if="feedback">{{ feedback }}</p>
                        <button class="btn btn-outline-info btn-block">SUBMIT</button>
                    </div>	
                </form>
            </div>

        </div>

    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';
import firebase from 'firebase';

export default {
    name: 'AddJourney',
    data(){
        return {
            user:null,
            title: null,
            location: null,
            image: [],
            description: null,
            createdAt: null,
            slug:null,
            feedback: null,
            imageFeedback: null,
        }
    },
    methods: {
        addJourney(){ 
            if(this.title && this.location && this.image.url && this.description){
                this.feedback = null;
                //create slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_=~.()'"!\-:@]/g,
                    lower: true
                });
                db.collection('journeys').add({
                    title: this.title,
                    location: this.location,
                    image: this.image.url,
                    description: this.description,
                    createdAt: Date.now(),
                    slug: this.slug,
                    author: this.user.displayName,
                    author_id: this.user.uid
                }).then(() => {
                    this.$router.push({ name: 'Index'})
                }).catch(err => {
                    console.log(err)
                });
                // console.log('here we go')
            } else {
                this.feedback = "Please fill all the information and upload the file"
            }

        },
        filePicked(){     
            const file = document.getElementById("file").files
            this.image = file[0]
            
        },
        uploadImg(){
            if(this.image.type && this.image.size < 8000000){
                this.imageFeedback = "uploading";
                const storageRef = firebase.storage().ref();
                const mountainsRef = storageRef.child(`journeyimg/${this.image.name}`);
                mountainsRef.put(this.image).then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        this.image.url = url;       
                        // const bucketName = 'my-journeys-be363.appspot.com/journeyimg';
                        // const filePath = this.imageName;
                        // this.imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/images` +
                        // "%2F" + 
                        // `${encodeURIComponent(filePath)}?alt=media`
                        this.imageFeedback = "Image uploaded successfully"
                    })
                })
                .catch(err => console.log(err))
            } else {
                this.imageFeedback = "Only png,jpg,jpeg can be uploaded and less than 8MB"
            }
         }
    },
    created(){
        //acquire currentUser's data
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.user = user;
            } else {
                this.user.uid = null;
            }
        })
    }
}
</script>

<style scoped>
h2 {
    margin-top: 10px;
}
#addjourney form {
    width: 60%;
    margin: 30px auto;
}
#addjourney form .upload{
    width: 100%;
    margin: auto;
}
#addjourney label {
    font-size: 0.8em;
    color: gray;
}

#addjourney .upload {
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
}
#addjourney .upload #file {
    border:1px solid #ced4da;
    border-radius: 5px;
    max-width: 100%;
    padding: 5px 0;
}
#addjourney .upload .btn{
    border-color: #ced4da;
}
#addjourney .upload small,label  {
    flex:1 1 100%
}


</style>