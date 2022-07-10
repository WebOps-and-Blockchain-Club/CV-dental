<template>
  <div>
    <AuthComp v-if="!gotoScan" @submited="setScanner" />
    <ScanComp v-if="gotoScan" />
  </div>
</template >
    
    <script>
import AuthComp from './components/auth/AuthComp.vue'
import ScanComp from './components/scan/ScanComp.vue'

export default {
  name: 'App',
  data() {
    return {
      gotoScan: false
    }
  },
  methods: {
    setScanner() {
      this.gotoScan = true;
      console.log(this.gotoScan);
    }
  },
  components: {
    ScanComp,
    AuthComp,
  },
}
</script>
    
    <style>
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      letter-spacing: 1px;
      font-weight: bold;
      color: #acaeaf;
      margin-top: 60px;
    }
    </style>
    