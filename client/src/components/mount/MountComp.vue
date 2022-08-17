<template>
    <div class="main">
        <div class="containers">
            <div v-for="id in ids.slice(0, 8)" :key="id" class="container">
                <img :src="img" class="icn-img">
                <button class="button" v-if="!isAdded[id]" @click="clickAdd(id)"> Scan </button>
                <button class="button" v-if="isAdded[id]" @click="clickEdit"> Edit </button>
            </div>
        </div>
        <div class="containers">
            <div v-for="id in ids.slice(8)" :key="id" class="container">
                <img :src="img" class="icn-img">
                <button class="button" v-if="!isAdded[id]" @click="clickAdd(id)"> Scan </button>
                <button class="button" v-if="isAdded[id]" @click="clickEdit"> Edit </button>
            </div>
        </div>
    </div>
</template>

<script>

import imgicon from "../../assets/image_upload.jpg";

export default {
    name: 'MountComp',
    data() {
        return {
            isAdded: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            img: imgicon,
            ids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        }
    },
    methods: {
        clickAdd(id) {
            this.isAdded[id] = true;
            this.$emit('scan');
        },
        clickEdit() {
            this.$emit('scan');
        }
    }
}
</script>

<style scoped>
.main {
    height: 100%;
    width: auto;
    border: 1px solid black;
}

.containers {
    display: flex;
    justify-content: space-between;
}

.container {
    margin: 10px auto;
    width: 100px;
    padding: 10px;
    border: 2px solid black;
}

.icn-img {
    width: 80px;
}

.icnBtn {
    margin: 10px;
    width: 60px;
    padding: 8px
}
</style>