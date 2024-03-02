<template>
  <div id>
    <div class="appBar">
      <img class="logo" :src="logo"/>
      Dental Appointment
    </div>
  <HomePage  v-if="home" @gotoScan="setScanner"   @gotoPreview="setChart" /> 
  <ChartComp :imageUrl="imageLink" :isImageDisplayed="showImage" :fileName = "fileName"  v-if="preview" @scan="setScanner" @home="setHome" />
   <ScanComp v-if="scan" @scaned="setChart" @home="setHome"/>
</div>
</template>

<script> 
import HomePage from './components/Home/HomeComp.vue'
import ChartComp from './components/chart/ChartComp.vue'
import ScanComp from './components/scan/ScanComp.vue'

import dummy1 from "@/assets/logo.jpg";

export default {
    name : "App",
    components : {
        ScanComp,
        ChartComp,
        HomePage,
    },
    data () {
        return  {
          logo:dummy1,
            home: true,
            scan: false,
            preview : false,
        }
    },
    methods: {
    setScanner() {
      this.scan = true;
      this.preview = false;
      this.home = false;
    },
    setChart() {
      this.preview = true;
      this.scan = false;
      this.home = false;
      
    },
    setHome() {
      this.preview = false;
      this.scan = false;
      this.home = true;
    }
},
}
</script>

<style >
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  letter-spacing: 1px;
  font-weight: bold;
  color: #13232b;
  background-image: url('~@/../src/assets/chartbg.jpg');
  background-size: cover;
  background-position: center;
  background-position: fixed;
  
  height: 100vh;

  
}
.appBar{
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: rgb(46, 50, 71);
  color: whitesmoke;
  font: 1.2rem/1 "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.logo{
  max-width: 50px;
  max-height: 50px;
  padding: 0.5%;
}




</style>