<template>
    <div class="main">
        <div class="d-flex flex-row">
            <div class ="d-flex flex-column flex-fill">
                <div class = "d-flex flex-row">
                    <div v-for="id in ids.slice(4, 6)" :key="id" class="container1 d-flex flex-column justify-content-between">
                        <p class="num d-flex align-items-center justify-content-center">{{id+1}}</p>
                        <button class="btn btn-secondary align-self-center my-2" v-if="!isAdded[id]" @click="clickAdd(id)"> Scan </button>
                        <button class="btn btn-secondary align-self-center my-2" v-if="isAdded[id]" @click="clickEdit"> Edit </button>
                    </div>
                </div>
                <div class = "d-flex flex-row justify-content-evenly">
                    <div v-for="id in ids.slice(0, 2)" :key="id" class="container2 d-flex flex-column justify-content-between">
                        <p class="num d-flex align-items-center justify-content-center">{{id+1}}</p>
                        <button class="btn btn-secondary align-self-center my-2" v-if="!isAdded[id]" @click="clickAdd(id)"> Scan </button>
                        <button class="btn btn-secondary align-self-center my-2" v-if="isAdded[id]" @click="clickEdit"> Edit </button>
                    </div>
                </div>
                <div class = "d-flex flex-row">
                    <div v-for="id in ids.slice(8, 10)" :key="id" class="container1 d-flex flex-column justify-content-between">
                        <p class="num d-flex align-items-center justify-content-center">{{id+1}}</p>
                        <button class="btn btn-secondary align-self-center my-2" v-if="!isAdded[id]" @click="clickAdd(id)"> Scan </button>
                        <button class="btn btn-secondary align-self-center my-2" v-if="isAdded[id]" @click="clickEdit"> Edit </button>
                    </div>
                </div>
            </div>
            <div class ="d-flex flex-column justify-content-between flex-fill">
                <div class = "d-flex flex-row">
                    <div v-for="id in ids.slice(12, 15)" :key="id" class="container2 d-flex flex-column justify-content-between">
                        <p class="num d-flex align-items-center justify-content-center">{{id+1}}</p>
                        <button class="btn btn-secondary align-self-center my-2" v-if="!isAdded[id]" @click="clickAdd(id)"> Scan </button>
                        <button class="btn btn-secondary align-self-center my-2" v-if="isAdded[id]" @click="clickEdit"> Edit </button>
                    </div>
                </div>
             
                <div class = "d-flex flex-row">
                    <div v-for="id in ids.slice(15, 18)" :key="id" class="container2 d-flex flex-column justify-content-between">
                        <p class="num d-flex align-items-center justify-content-center">{{id+1}}</p>
                        <button class="btn btn-secondary align-self-center my-2" v-if="!isAdded[id]" @click="clickAdd(id)"> Scan </button>
                        <button class="btn btn-secondary align-self-center my-2" v-if="isAdded[id]" @click="clickEdit"> Edit </button>
                    </div>
                </div>
            </div>
            <div class ="d-flex flex-column flex-fill">
                <div class = "d-flex flex-row-reverse">
                    <div v-for="id in ids.slice(10, 12)" :key="id" class="container1 d-flex flex-column justify-content-between">
                        <p class="num d-flex align-items-center justify-content-center">{{id+1}}</p>
                        <button class="btn btn-secondary align-self-center my-2" v-if="!isAdded[id]" @click="clickAdd(id)"> Scan </button>
                        <button class="btn btn-secondary align-self-center my-2" v-if="isAdded[id]" @click="clickEdit"> Edit </button>
                    </div>
                </div>
                <div class = "d-flex flex-row-reverse justify-content-evenly">
                    <div v-for="id in ids.slice(2, 4)" :key="id" class="container2 d-flex flex-column justify-content-between">
                        <p class="num d-flex align-items-center justify-content-center">{{id+1}}</p>
                        <button class="btn btn-secondary align-self-center my-2" v-if="!isAdded[id]" @click="clickAdd(id)"> Scan </button>
                        <button class="btn btn-secondary align-self-center my-2" v-if="isAdded[id]" @click="clickEdit"> Edit </button>
                    </div>
                </div>
                <div class = "d-flex flex-row-reverse">
                    <div v-for="id in ids.slice(6, 8)" :key="id" class="container1 d-flex flex-column justify-content-between">
                        <p class="num d-flex align-items-center justify-content-center">{{id+1}}</p>
                        <button class="btn btn-secondary align-self-center my-2" v-if="!isAdded[id]" @click="clickAdd(id)"> Scan </button>
                        <button class="btn btn-secondary align-self-center my-2" v-if="isAdded[id]" @click="clickEdit"> Edit </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import imgicon from "../../assets/logo.png";

export default {
    name: 'MountComp',
    data() {
        return {
            isAdded: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            img: imgicon,
            ids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14,15,16,17]
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
    width: 100%;
    border: 2px solid gray;
    background-color: black;
}

.container1 {
    height: 160px;
    width: 100%;
    border: 2px solid gray;
}
.container2{
    height: 220px;
    width: 100%;
    border: 2px solid gray;
}

.icn-img {
    width: 100px;
}
.num{
    height: 100%;
    color: gray;
}
.icnBtn {
    margin: 10px;
    width: 60px;
    padding: 8px
}
</style>