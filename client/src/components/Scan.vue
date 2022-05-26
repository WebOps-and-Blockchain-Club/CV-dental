<template>
    <div>
        <h1>Scanning</h1>
        <button v-on:click="scan" class="icnBtn">
            <img src="../../public/scanner.png" class="icn-img" />
        </button>
        <button v-on:click="delScanImg" class="icnBtn" >
            <img src="../../public/trash.png" class="icn-img" />
        </button>
        <button v-on:click="reset" class="icnBtn" >
            <img src="../../public/reset.png" class="icn-img" />
        </button>
        <button v-on:click="undo" class="icnBtn" >
            <img src="../../public/undo.png" class="icn-img" />
        </button>
        <button v-on:click="redo" class="icnBtn" >
            <img src="../../public/redo.png" class="icn-img" />
        </button>

        <div id="scanDiv">
            <img id="scanImg" ref="scanImg" />
        </div>

        <button v-on:click="crop" class="icnBtn">
            <img src="../../public/crop.png" class="icn-img">
        </button>
        <button v-on:click="rotateLeft" class="icnBtn">
            <img src="../../public/circular-counterclockwise-arrow-rotation.png" class="icn-img">
        </button>
        <button v-on:click="rotateRight" class="icnBtn">
            <img src="../../public/rotating-arrow-symbol.png" class="icn-img">
        </button>
        <button v-on:click="replace" class="icnBtn">
            <img src="../../public/true.png" class="icn-img">
        </button>
        <button v-on:click="cancel" class="icnBtn">
            <img src="../../public/forbidden.png" class="icn-img">
        </button>
        <img id="preview">
    </div>
</template>

<script>
import Cropper from "cropperjs"
export default {
    name: 'ScanComp',
    data() {
        return {
            connection: null,
            file: null,
            reader: null,
            cropper: {},
            imgElement:null,
            resetURL: [],
            i:-1
        }
    },
    methods: {
        scan() {
            this.connection.send("1100")
        },
        crop() {
            this.cropper = new Cropper(this.imgElement, {
                viewMode: 1,
                scaleable: false,
                background: false,
                
            })
        },

        replace() {
            if(this.i ==-1){
                this.resetURL.push(this.imgElement.src);
                this.i++
            }
            this.imgElement.src = this.cropper.getCroppedCanvas({
                height:400
            }).toDataURL()
            this.imgElement.cropper.destroy()

            if(this.i<this.resetURL.length-1){
                this.resetURL = this.resetURL.slice(0,this.i+1)
            }
            this.resetURL.push(this.imgElement.src),
            this.i++
        },
        rotateLeft() {
            this.cropper.rotate(-90)
        },
        rotateRight() {
             
            this.cropper.rotate(90)
        },
        delScanImg() {
            this.imgElement.src = ""
            this.resetURL=[]
            this.i=-1
        },
        cancel() {
            this.imgElement.cropper.destroy()
        },
        reset() {
            if(this.resetURL[0]){
                this.imgElement.src = this.resetURL[0]
                this.resetURL=[]
                this.i=-1
            }
        },
        undo() {
            if(this.i>0){
                this.i--;
                this.imgElement.src = this.resetURL[this.i]
            }
        },
        redo(){
            if(this.i< this.resetURL.length-1){
                this.i++;
                this.imgElement.src = this.resetURL[this.i]
            }
        }
    },
    mounted() {
        this.imgElement = document.getElementById("scanImg")
        this.connection = new WebSocket("ws://localhost:8181/")
        this.connection.onmessage = (e) => {
            if (e.data instanceof Blob) {
                this.file = e.data;
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
    #scanImg {
        height: 100%;
    }
    #scanDiv{
        height: 68vh;
        margin: 5px;
        border: 1px solid;
    }
    .icn-img {
        width: 22px;
    }

    .icnBtn {
        margin: 3px;
        padding:8px
    }
</style>