<template>
    <div>
        <button v-for="buttonDetail in buttonDetails" :key="buttonDetail.id" @click="buttonDetail.method" class="icnBtn">
            <img :src="buttonDetail.img" :alt="buttonDetail.alt" class="icn-img" />
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
                {id:0 ,img: scanner, alt: "Scan your Image", method: this.clickScan },
                {id:1, img: trash, alt: "Del your Image", method: this.clickDelScan },
                {id:2, img: reset, alt: "Reset Image", method: this.clickReset },
                {id:3, img: undo, alt: "Undo a Change", method: this.clickUndo },
                {id:4, img: redo, alt: "Redo a Change", method: this.clickRedo },
            ],
        }
    },
    methods: {
        clickScan() {
            console.log("hi")
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
.icn-img {
    width: 22px;
}

.icnBtn {
    margin: 3px;
    padding: 8px
}
</style>