<template>
    <div>
        <h1>SCANNING</h1>

        <AddImg @scan="scanImg" @del="delScanImg" @reset="resetImg" @undo="undoChange" @redo="redoChange" />

        <div id="scanDiv">
            <img id="scanImg" ref="scanImg" />
        </div>

        <button @click="toggleShowEditButtons" class="icnBtn" v-if="!showEditBtns">
            <img :src="editBtnImg" title="Edit Image" class="icn-img">
        </button>

        <EditImg v-if="showEditBtns" @crop="cropImg" @setFilters="adjustFilters" @rotateLeft="rotateImgLeft"
            @rotateRight="rotateImgRight" @replace="replaceImg" @cancel="cancelCrop" />
    </div>
</template>

<script>
import AddImg from './AddImg.vue'
import EditImg from './EditImg.vue'
import Cropper from "cropperjs"

import editBtnImg from "../../assets/edit-button-image-custom-icon.png"

export default {
    components: {
        AddImg,
        EditImg,
    },
    data() {
        return {
            connection: null,
            file: null,
            reader: null,
            cropper: {},
            imgElement: null,
            resetURL: [],
            i: -1,
            editBtnImg: editBtnImg,
            showEditBtns: false,
            imgBrightness: 100,
            imgContrast: 100,
        }
    },
    methods: {
        // add methods
        scanImg() {
            // this.connection.send("1100")
            this.$emit('scaned');
        },
        delScanImg() {
            this.imgElement.src = ""
            this.resetURL = []
            this.i = -1
        },
        resetImg() {
            if (this.resetURL[0]) {
                this.imgElement.src = this.resetURL[0]
                this.resetURL = []
                this.i = -1
            }
        },
        undoChange() {
            if (this.i > 0) {
                this.i--
                this.imgElement.src = this.resetURL[this.i]
            }
        },
        redoChange() {
            if (this.i < this.resetURL.length - 1) {
                this.i++
                this.imgElement.src = this.resetURL[this.i]
            }
        },
        // show/hide edit buttons
        toggleShowEditButtons() {
            this.showEditBtns = !this.showEditBtns
        },
        // edit methods
        cropImg() {
            this.cropper = new Cropper(this.imgElement, {
                viewMode: 1,
                scaleable: false,
                background: false,
            })
        },
        adjustFilters(brightness, contrast) {
            this.imgBrightness = brightness
            this.imgContrast = contrast
        },
        rotateImgLeft() {
            this.cropper.rotate(-90)
        },
        rotateImgRight() {
            this.cropper.rotate(90)
        },
        replaceImg() {
            this.showEditBtns = !this.showEditBtns
            if (this.i == -1) {
                this.resetURL.push(this.imgElement.src)
                this.i++
            }
            this.imgElement.src = this.cropper.getCroppedCanvas({
                height: 400
            }).toDataURL()
            this.imgElement.cropper.destroy()

            if (this.i < this.resetURL.length - 1) {
                this.resetURL = this.resetURL.slice(0, this.i + 1)
            }
            this.resetURL.push(this.imgElement.src),
                this.i++
        },
        cancelCrop() {
            this.imgElement.cropper.destroy()
        }
    },
    mounted() {
        this.imgElement = document.getElementById("scanImg")
        this.connection = new WebSocket("ws://localhost:8181/")
        this.connection.onmessage = (e) => {
            if (e.data instanceof Blob) {
                this.file = e.data
                this.file.name = "File"
                this.reader = new FileReader()
                this.reader.readAsDataURL(this.file)
                this.reader.onload = function (e) {
                    document.getElementById("scanImg").src = e.target.result
                }
            }
        }

        this.connection.onopen = function (e) {
            console.log(e)
            console.log("successfully connected")
        }
    },
}
</script>

<style scoped>
.icn-img {
    width: 22px;
}

.icnBtn {
    margin: 3px;
    padding: 8px;
}

#scanImg {
    height: 100%;
}

#scanDiv {
    height: 60vh;
    margin-right: 10%;
    margin-left: 10%;
    border: 1px solid;
}
</style>