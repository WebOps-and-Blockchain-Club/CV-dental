<template>
  <div>
    <MountComp v-if="gotoMount" @scan="setScanner" />
    <ScanComp v-if="gotoScan" @scaned="setMount" />
  </div>
</template >
    
<script>
import ScanComp from './components/scan/ScanComp.vue'
import MountComp from './components/mount/MountComp.vue'

export default {
  name: 'App',
  data() {
    return {
      gotoScan: false,
      gotoMount: true,
    }
  },
  methods: {
    setScanner() {
      this.gotoScan = true;
      this.gotoMount = false;
    },
    setMount() {
      this.gotoMount = true
      this.gotoScan = false;
    }
  },
  components: {
    ScanComp,
    MountComp
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
  color: #13232b;
  margin-top: 60px;
}
</style>
    