<template>
    <div>
        <button :v-for="buttonDetail in buttonDetails" @click="buttonDetail.method" class="icnBtn">
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
                { img: scanner, alt: "Scan your Image", method: this.methods.clickScan },
                { img: trash, alt: "Del your Image", method: this.methods.clickDelScan },
                { img: reset, alt: "Reset Image", method: this.methods.clickReset },
                { img: undo, alt: "Undo a Change", method: this.methods.clickUndo },
                { img: redo, alt: "Redo a Change", method: this.methods.clickRedo },
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
.icn-img {
    width: 22px;
}

.icnBtn {
    margin: 3px;
    padding: 8px
}
</style>