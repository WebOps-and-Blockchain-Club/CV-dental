<template>
    <div>
        <button v-for="buttonDetail in buttonDetails" :key="buttonDetail.id" @click="buttonDetail.method" class="icnBtn">
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
                {id:0, img: crop, alt: "Crop Image", method: this.clickCrop },
                {id:1, img: rotateLeft, alt: "Rotate Left", method: this.clickRotateLeft },
                {id:2, img: rotateRight, alt: "Rotate Right", method: this.clickRotateRight },
                {id:3, img: replace, alt: "Replace Image", method: this.clickReplace },
                {id:4, img: cancel, alt: "Cancel Change", method: this.clickCancel },
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