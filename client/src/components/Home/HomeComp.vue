<template>
<div id="main">
  <div id="scan" v-on:click="emitScan">
    <div id="text"> Scan </div>
  </div>
  <div id="preview" v-on:click="emitPreview">
    <div id="text"> Preview </div>
  </div>
</div>
</template>

<script>
export default {
    name: "HomePage",
    methods : {
            emitScan() {
          this.$emit('gotoScan');
        },
        emitPreview() {
          this.$emit('gotoPreview');
      },
    },
}


</script>

<style scoped>


#main {
  display:flex;
  align-content: center;
  align-items: center;
  height:100vh;
  width:100vw;
  align-self: center;
  justify-content: center;
  background-image: "../../assets/chartbg.jpg";

}


#scan , #preview {

  height : 70vh;
  width : 35vw;
  display : flex;
  align-content: center;
  align-items: center;
  align-self: center;
  justify-content: center;
  border-style: solid;
  border-color: cadetblue;
  background: white;
  opacity: 0.4;
  border-width: 1px;
}

#scan {
  margin-right:10px
}

#preview {
  margin-left: 10px;
}

#text {
  font-size: 30px;
  color:rgb(60, 58, 58);
  font-weight: bold;
}
</style>