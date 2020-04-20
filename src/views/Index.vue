<template>
    <div class="index">
        <Navbar />  
        <router-view></router-view> 
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'Index',
    components:{
        Navbar
    },
    data(){
        return {

        }
    }
}
</script>

<style>

</style>