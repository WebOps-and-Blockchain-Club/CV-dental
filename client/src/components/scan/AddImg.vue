<template>
    <div>
        <button v-for="buttonDetail in buttonDetails" :key="buttonDetail.id" @click="buttonDetail.method"
            class="btn btn-light">
            <img :src="buttonDetail.img" :title="buttonDetail.title" class="btn-img" />
        </button>
    </div>
</template>

<script>
import scanner from "../../assets/scanner.png"
import trash from "../../assets/trash.png"
import reset from "../../assets/reset.png"
import undo from "../../assets/undo.png"
import redo from "../../assets/redo.png"

export default {
    name: 'AddImg',
    data() {
        return {
            buttonDetails: [
                { id: 0, img: scanner, title: "Scan", method: this.clickScan },
                { id: 1, img: trash, title: "Delete Image", method: this.clickDelScan },
                { id: 2, img: reset, title: "Reset Image", method: this.clickReset },
                { id: 3, img: undo, title: "Undo", method: this.clickUndo },
                { id: 4, img: redo, title: "Redo", method: this.clickRedo },
            ],
        }
    },
    methods: {
        clickScan() {
            this.$emit('scan')
        },
        clickDelScan() {
            this.$emit('del')
        },
        clickReset() {
            this.$emit('reset')
        },
        clickUndo() {
            this.$emit('undo')
        },
        clickRedo() {
            this.$emit('redo')
        }
    }
}
</script>

<style scoped>
.btn-img {
    width: 22px;
}

.btn {
    margin: 3px;
    padding: 8px;
    cursor: pointer;
    border: 1.5px solid rgb(148, 147, 147); 
}
</style>