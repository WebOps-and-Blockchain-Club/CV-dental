<template>
    <div>
        <button :v-for="buttonDetail in buttonDetails" @click="buttonDetail.method" class="icnBtn">
            <img :src="buttonDetail.img" :alt="buttonDetail.alt" class="icn-img" />
        </button>
    </div>
</template>

<script>
import crop from "../../assets/crop.png"
import rotateLeft from "../../assets/circular-counterclockwise-arrow-rotation.png"
import rotateRight from "../../assets/rotating-arrow-symbol.png"
import replace from "../../assets/true.png"
import cancel from "../../assets/forbidden.png"

export default {
    name: 'EditImg',
    data() {
        return {
            buttonDetails: [
                { img: crop, alt: "Crop Image", method: this.methods.clickCrop },
                { img: rotateLeft, alt: "Rotate Left", method: this.methods.clickRotateLeft },
                { img: rotateRight, alt: "Rotate Right", method: this.methods.clickRotateRight },
                { img: replace, alt: "Replace Image", method: this.methods.clickReplace },
                { img: cancel, alt: "Cancel Change", method: this.methods.clickCancel },
            ],
        }
    },
    methods: {
        clickCrop() {
            this.$emit('crop')
        },
        clickRotateRight() {
            this.$emit('rotateRight')
        },
        clickRotateLeft() {
            this.$emit('rotateLeft')
        },
        clickReplace() {
            this.$emit('replace')
        },
        clickCancel() {
            this.$emit('cancel')
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