<template>
  <div>
    <AuthComp v-if="!auth" @submited="setMount" />
    <MountComp v-if="gotoMount" @scan="setScanner" />
    <ScanComp v-if="gotoScan" @scaned="setMount" />
  </div>
</template >
    
<script>
import AuthComp from './components/auth/AuthComp.vue'
import ScanComp from './components/scan/ScanComp.vue'
import MountComp from './components/mount/MountComp.vue'

export default {
  name: 'App',
  data() {
    return {
      gotoScan: false,
      auth: false,
      gotoMount: false,
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
      this.auth = true;
    }
  },
  components: {
    ScanComp,
    AuthComp,
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
    