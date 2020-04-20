<template>
  <div class="home">
    <div id="landing-header">
      <h1>Welcome to My Wonderful Journeys</h1>
      <router-link :to="{ name: 'Journeys' }" class="btn btn-lg btn-success">View All Journeys</router-link>
    </div>

    <ul class="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>


  </div>
</template>

<script>



export default {
  name: 'Home',
  components: {

  }
}
</script>

<style scoped>
 body {
	background-color: #000;
}

#landing-header h1 {
	color:white;
} 

#landing-header {
	z-index: 1;
	position: relative;
	text-align: center;
	padding-top: 40vh;
};


.slideshow {
	position:fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left:0;
	z-index: 0;
	list-style: none;
	margin: 0;
	padding: 0;
}

.slideshow li {
	width:100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-size: cover;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	opacity: 0;
	z-index: 0;
	animation: imageAnimation 50s linear infinite;
}


.slideshow li:nth-child(1) { 
  background-image: url(https://live.staticflickr.com/65535/49452716863_807c3c5d51_b.jpg) 
}
.slideshow li:nth-child(2) { 
  background-image: url(https://live.staticflickr.com/65535/49453195401_1c94117e63_b.jpg);
  animation-delay: 10s; 
}
.slideshow li:nth-child(3) { 
  background-image: url(https://live.staticflickr.com/65535/49453195476_787aba2698_b.jpg);
  animation-delay: 20s; 
}
.slideshow li:nth-child(4) { 
  background-image: url(https://live.staticflickr.com/65535/49453430442_4d4d98d59d_b.jpg);
  animation-delay: 30s; 
}
.slideshow li:nth-child(5) { 
  background-image: url(https://live.staticflickr.com/65535/49453441807_6911a73990_b.jpg);
  animation-delay: 40s; 
} 


@keyframes imageAnimation { 
  0% { 
    opacity: 0; 
    animation-timing-function: ease-in;
  }
  10% {
    opacity: 1;
    animation-timing-function: ease-out;
  }
  20% {
    opacity: 1
  }
  30% {
    opacity: 0
  }
}


/* Older browser support - .no-cssanimations class added by modernizr */
.no-cssanimations .slideshow li {
	opacity: 1;
}
</style>