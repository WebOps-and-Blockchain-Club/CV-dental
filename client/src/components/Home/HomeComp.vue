<template>
    <button v-on:click="emitScan"> Scan </button>
    <button v-on:click="emitPreview"> Preview </button>

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

</style>