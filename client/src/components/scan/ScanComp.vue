<template>
    <div>
        <h1>SCANNING</h1>

        <AddImg @scan="scanImg" 
            @del="delScanImg" 
            @reset="resetImg" 
            @undo="undoChange" 
            @redo="redoChange" />
        
        
        <div id="scanDiv" class="d-flex justify-content-center align-items-center">
            <img id="scanImg" ref="scanImg" />
            <canvas class="hidden" id="drawingCanvas"></canvas>
        </div>

        <EditImg @crop="cropImg"
            @reset_filter = "resetFilter" 
            @rotateLeft="rotateImgLeft"
            @rotateRight="rotateImgRight" 
            @draw = "draw"
            @apply_change_crop="apply_change_crop"
            @apply_change_transform = "apply_change_transform" 
            @apply_change_filter = "apply_change_filter"
            @apply_change_draw = "apply_change_draw"
            @cancelCrop="cancelCrop" 
            @cancelTransform = "cancelTransform"
            @cancelDraw = "cancelDraw" />
    
    </div>
</template>

<script>
import AddImg from './AddImg.vue'
import EditImg from './EditImg.vue'
import Cropper from "cropperjs"
import replace from "../../assets/true.png"
import cancel from "../../assets/forbidden.png"


export default {
    components: {
        AddImg,
        EditImg,
    },
    data() {
        return {
            replaceBtnIcn : replace,
            cancelBtnIcn : cancel,
            connection: null,
            cropper: {},
            edit_data: [],
            temp_rotation: 0,
            rotation: 0,
            crop:{},
            imgBrightness: 100,
            imgContrast: 100,
            imgElement: null, // image element
            img:null, 
            idx: -1,
            file: null,    // connection
            reader: null,  // connection
        }
    },
    methods: {
        scanImg() {
            this.connection.send("1100")
        },
        delScanImg() {
            this.imgElement.src = ""
            this.crop = {}
            this.rotation = 0
            this.temp_rotation = 0
            this.edit_data = []
            this.imgBrightness = 100
            this.imgContrast = 100
            this.idx = -1
            this.imgElement.style.transform = `rotate(0deg)`
            
        },
        resetImg() {
            this.imgElement.src = this.img.src
            this.crop = {}
            this.rotation = 0
            this.temp_rotation = 0
            this.edit_data = []
            this.imgBrightness = 100
            this.imgContrast = 100
            this.idx = -1
            this.imgElement.style.transform = `rotate(0deg)`      
        },
        undoChange() {
            this.idx--;
            if(this.idx<-1){
                this.idx = -1
            }
            else if(this.idx==-1){
                this.imgElement.src = this.img.src;
                this.rotation = 0;
                this.imgElement.style.transform = `rotate(${this.rotation}deg)`
                this.crop = {}
                this.resetFilter();
            }
            else{
                console.log(this.edit_data[this.idx]["crop_data"])
                if(!(this.edit_data[this.idx]["crop_data"] && Object.keys(this.edit_data[this.idx]["crop_data"]).length === 0 && Object.getPrototypeOf(this.edit_data[this.idx]["crop_data"]) === Object.prototype )){
                    const canvas = document.createElement("canvas")
                    const ctx = canvas.getContext("2d")
                    this.crop = this.edit_data[this.idx]["crop_data"]
                    canvas.width = this.crop["width"]
                    canvas.height = this.crop["height"]
                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.drawImage(this.img,this.crop["x"], this.crop["y"],canvas.width,canvas.height,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
                    this.imgElement.src = canvas.toDataURL();      
                }
                
                this.rotation = this.edit_data[this.idx]["rotation_data"];
                this.temp_rotation = this.rotation
                this.imgElement.style.transform = `rotate(${this.rotation}deg)` 

                
                this.imgBrightness = this.edit_data[this.idx]["filter_data"][0]
                this.imgContrast = this.edit_data[this.idx]["filter_data"][1]
                
                this.updateFilters()
            }
        },
        redoChange() {
            this.idx++;
            if(this.idx>this.edit_data.length-1){
                this.idx = this.edit_data.length-1
            }
            else{
                if(!(this.edit_data[this.idx]["crop_data"] && Object.keys(this.edit_data[this.idx]["crop_data"]).length === 0 && Object.getPrototypeOf(this.edit_data[this.idx]["crop_data"]) === Object.prototype )){
                    const canvas = document.createElement("canvas")
                    const ctx = canvas.getContext("2d")
                    this.crop = this.edit_data[this.idx]["crop_data"]
                    canvas.width = this.crop["width"]
                    canvas.height = this.crop["height"]
                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.drawImage(this.img,this.crop["x"], this.crop["y"],canvas.width,canvas.height,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
                    this.imgElement.src = canvas.toDataURL();      
                } 
            
                this.rotation = this.edit_data[this.idx]["rotation_data"];
                this.temp_rotation = this.rotation
                this.imgElement.style.transform = `rotate(${this.rotation}deg)` 
                
                 
                this.imgBrightness = this.edit_data[this.idx]["filter_data"][0]
                this.imgContrast = this.edit_data[this.idx]["filter_data"][1]

                this.updateFilters()
            }
        },
        // -------------------------------------------------------------------------------------------------
        
        cropImg() {         
            this.cropper = new Cropper(this.imgElement, {
                viewMode: 1,
                scaleable: true,
                background: false,
                autoCropArea: 1, 
            })
            setTimeout(()=>{  // find better way when cropper intitializes then it should run
                this.cropper.rotate(this.rotation)
            },500)
        },  
        apply_change_crop() {
            var temp = this.cropper.getData();
            if(this.rotation==90){
                let p = temp["x"]
                temp["x"] = temp["y"];
                temp["y"] = this.imgElement.naturalHeight - p- temp["width"];
                p = temp["width"]
                temp["width"] = temp["height"]
                temp["height"] = p
            }
            else if(this.rotation==-90){
                let p = temp["y"]
                temp["y"] = temp["x"]
                temp["x"] = this.imgElement.naturalWidth - p- temp["height"]
                p = temp["width"]
                temp["width"] = temp["height"]
                temp["height"] = p
            }
            else if(this.rotation==180){
                temp["x"] = this.imgElement.naturalWidth - temp["x"] - temp["width"];
                temp["y"] = this.imgElement.naturalHeight - temp["y"] - temp["height"];
            }

            if(this.idx!=-1){ 
                temp["x"] += this.crop["x"];
                temp["y"] += this.crop["y"];
            }

            this.crop = temp;

            this.take_data();
            
            this.imgElement.cropper.destroy() 
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            canvas.width = temp["width"]
            canvas.height = temp["height"]
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.drawImage(this.img,temp["x"], temp["y"],canvas.width,canvas.height,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
            this.imgElement.src = canvas.toDataURL();            
        },
        cancelCrop() {
            if(this.cropper){
                this.imgElement.cropper.destroy()
            }
        },

        // ----------------------------------------------------------------------------

        rotateImgLeft() {
            this.temp_rotation -= 90
            this.imgElement.style.transform = `rotate(${this.temp_rotation}deg)`
        },
        rotateImgRight() {
            this.temp_rotation += 90
            this.imgElement.style.transform = `rotate(${this.temp_rotation}deg)`
        },
        apply_change_transform(){
            this.rotation = this.temp_rotation;
            this.rotation = Math.floor(this.rotation%360);
            this.take_data()
        },
        cancelTransform(){
            this.imgElement.style.transform = `rotate(${this.rotation}deg)`
            this.temp_rotation = this.rotation
        },

        // ------------------------------------------------------------------------------

        setFilters(){
            this.imgContrast = document.getElementById("id1").value
            this.imgBrightness = document.getElementById("id2").value
            this.updateFilters()
        },
        updateFilters(){
            this.imgElement.style.filter = "brightness(" + this.imgBrightness + "%) contrast(" + this.imgContrast +"%)"
        },
        resetFilter(){
            document.getElementById("id1").value = 100
            document.getElementById("id2").value = 100
            this.imgBrightness = 100
            this.imgContrast = 100
            this.updateFilters()
        },
        apply_change_filter(){
            this.take_data()
        },

        //------------------------------------------------------
        
        draw(){
            let canvas = document.getElementById("drawingCanvas");
            let ctx = canvas.getContext("2d");
            if(this.rotation===0){
                canvas.width = this.imgElement.naturalWidth;
                canvas.height = this.imgElement.naturalHeight;
                ctx.save();
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.drawImage(this.imgElement,0,0);
                ctx.restore();
            }
            else if(this.rotation===90 || this.rotation===-270){
                canvas.height = this.imgElement.naturalWidth;
                canvas.width = this.imgElement.naturalHeight;
                ctx.save();
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.drawImage(this.imgElement,0,-canvas.width);
                ctx.restore();
            }
            else if(this.rotation===180 || this.rotation===-180){
                canvas.width = this.imgElement.naturalWidth;
                canvas.height = this.imgElement.naturalHeight;
                ctx.save();
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.drawImage(this.imgElement,-canvas.width,-canvas.height);
                ctx.restore();
            }
            else if(this.rotation===270 || this.rotation===-90){
                canvas.height = this.imgElement.naturalWidth;
                canvas.width = this.imgElement.naturalHeight;
                ctx.save();
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.drawImage(this.imgElement,-canvas.height,0);
                ctx.restore();
            }

            let x = this.imgElement.naturalWidth/this.imgElement.width
            let y = this.imgElement.naturalHeight/this.imgElement.height
            canvas.classList.remove("hidden")
            this.imgElement.classList.add("hidden")
            
            let isDrawing;
            canvas.onmousedown = (e) => {
                isDrawing = true;
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.strokeStyle = "red";
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                ctx.moveTo(x*e.offsetX, y*e.offsetY);
            };

            canvas.onmousemove = (e) => {
                if (isDrawing) {
                    ctx.lineTo(x*e.offsetX, y*e.offsetY);
                    ctx.stroke();
                }
            };

            canvas.onmouseup = function () {
                isDrawing = false;
                ctx.closePath();
            };
        },
        apply_change_draw(){
            let canvas = document.getElementById("drawingCanvas");
            this.imgElement.src = canvas.toDataURL();
            canvas.classList.add("hidden")
            this.imgElement.classList.remove("hidden")
        },
        cancelDraw(){
            let canvas = document.getElementById("drawingCanvas");
            canvas.classList.add("hidden")
            this.imgElement.classList.remove("hidden")
        },

        // ----------------- Other Methods --------------------

        take_data(){
            if(this.idx < this.edit_data.length-1){ 
                this.edit_data = this.edit_data.slice(0,this.idx+1);
                this.edit_data.push({"crop_data": this.crop,"rotation_data":this.rotation,"filter_data":[this.imgBrightness,this.imgContrast]});
                this.idx++; 
            }
            else if(this.idx == this.edit_data.length-1){
                this.edit_data.push({"crop_data": this.crop,"rotation_data":this.rotation,"filter_data":[this.imgBrightness,this.imgContrast]});
                this.idx++; 
            }
        },
        
        async make_connection(){
            this.connection = new WebSocket("ws://localhost:8181/")
            this.connection.onmessage = (e) => {
                if (e.data instanceof Blob) {
                    this.file = e.data
                    this.file.name = "File"
                    this.reader = new FileReader()
                    this.reader.readAsDataURL(this.file)
                    this.reader.onload = async (e)=> {
                        let v = new Promise((resolve)=>{
                            resolve(e.target.result)
                        })
                        v.then((value)=>{
                            document.getElementById("scanImg").setAttribute("src",value)
                            this.img.src = value
                        })
                    }
                   
                }
            }
        }
    },
    mounted() {
        this.imgElement = document.getElementById("scanImg")
        this.img = new Image();     
        this.make_connection();
        this.connection.onopen = function (e) {
            console.log(e)
            console.log("successfully connected")
        }

        document.getElementById("id1").addEventListener("input",this.setFilters)
        document.getElementById("id2").addEventListener("input",this.setFilters)
       
    },
}
</script>

<style scoped>
.display{
    display: none;
}
.hidden{
    display: none !important;
}
/* Image Element */
#scanImg { 
    overflow: hidden;
    max-height: 60vh; 
    max-width: 60vh;
}
#drawingCanvas{
    border: 1px solid black;
    overflow: hidden;
    max-height: 60vh; 
    max-width: 60vh;
}
#scanDiv {
    height: 60vh;
    margin-right: 10%;
    margin-left: 10%;
    border: 1px solid;
}

span {
    display: block;
    margin: 10px;
}

</style>