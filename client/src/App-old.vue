<template>
  <ChartComp :imageUrl="imageLink" :isImageDisplayed="showImage" :fileName = "fileName"  v-if="gotoChart" @scan="setScanner" />
  <ScanComp v-if="gotoScan" @scaned="setChart" />
</template >
    
<script>
import ScanComp from './components/scan/ScanComp.vue'
//import MountComp from './components/mount/MountComp.vue'
import ChartComp from './components/chart/ChartComp.vue'

export default {
  name: 'App-old',
  data() {
    return {
      gotoScan: false,
      gotoMount: false,
      gotoChart: true,
      imageLink: '',
      showImage: false
    }
  },
  methods: {
    setScanner() {
      this.gotoScan = true;
      this.gotoChart = false;
    },
    setChart(data) {
      this.gotoChart = true
      this.gotoScan = false;
      if(data.flag){
        this.imageLink = data.img;
        this.showImage = true;
        this.fileName = data.fileName;
      }
      else{
        this.showImage = false;
      }

    }
  },
  components: {
    ScanComp,
    ChartComp
  },
}
</script>
    
<style>
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
  
  height: 100vh;
}
</style>
    