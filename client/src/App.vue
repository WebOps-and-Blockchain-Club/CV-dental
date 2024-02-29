<template>
  <HomePage  v-if="home" @gotoScan="setScanner"   @gotoPreview="setChart" /> 
  <ChartComp :imageUrl="imageLink" :isImageDisplayed="showImage" :fileName = "fileName"  v-if="preview" @scan="setScanner" @home="setHome" />
   <ScanComp v-if="scan" @scaned="setChart" @home="setHome"/>
</template>

<script> 
import HomePage from './components/Home/HomeComp.vue'
import ChartComp from './components/chart/ChartComp.vue'
import ScanComp from './components/scan/ScanComp.vue'

export default {
    name : "App",
    components : {
        ScanComp,
        ChartComp,
        HomePage,
    },
    data () {
        return  {
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

<style scoped>

</style>