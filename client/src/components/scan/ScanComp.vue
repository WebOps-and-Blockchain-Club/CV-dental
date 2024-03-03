<template>


    <button v-on:click = "emithome"  style="margin:15px" class="custom"> HOME </button>

    <div id="selection-wrapper"> 

        <div>
            <div id="selection-items">
                <input type="text"  class="teeth-text-field" v-model="selectedID" list="pid"/>
                <datalist id="pid">
                <option v-for="options in patientIDS"  v-bind:key="options"> {{ options }}</option>
                </datalist>
            </div>
            <div id="selection-items">
                <button @click="submit" class="custom">Submit</button>
            </div>
            <div id="selection-items">
                <button @click="addNew" class="custom">Add New</button>
            </div>
          </div>
    
    </div>

    <div v-if="scanmode" class="d-flex flex-column justify-content-center align-items-center">
        <AddImg @scan="scanImg"
                @upload="uploadImg" 
                @del="delScanImg" 
                @reset="resetImg" 
                @undo="undoChange" 
                @redo="redoChange"
                @done="doneScan"
                @cancel="cancelScan"/>
        
        
        <div id="fabric-canvas-wrapper">
            <canvas ref="canvas" id="drawingCanvas" width="400" height="400" class="can"></canvas>
        </div>

        <EditImg @crop="cropImg"
                @reset_filter = "resetFilter" 
                @rotate="rotateCanvas"
                @draw = "draw"
                @apply_change_crop="apply_change_crop"
                @apply_change_transform = "apply_change_transform"
                @pushFilter = "pushFilter"
                @adjustBrightness = "adjustBrightness"
                @adjustContrast = "adjustContrast" 
                @apply_change_filter = "apply_change_filter"
                @apply_change_draw = "apply_change_draw"
                @cancelCrop="cancelCrop" 
                @cancelTransform = "cancelTransform"
                @moveMode = "moveMode"
                @zoom = "zoom" />
    </div>

</template>

<script>
import AddImg from './AddImg.vue'
import EditImg from './EditImg.vue'
import replace from "../../assets/true.png"
import cancel from "../../assets/forbidden.png"

import fabric from 'fabric';


export default {
    components: {
        AddImg,
        EditImg,
    },
    data() {
        return {

            patientselectmode:true,
            scanmode:false,
            
            selectedID : "",

            patientIDS : ["3243","423","546"],

            canvas:null,
            canvasBGColor:"#E1E3E9",
            canvasWidth:500,
            canvasHeight:500,
            currentImage:null,
            img:new Image(), 
            replaceBtnIcn : replace,
            cancelBtnIcn : cancel,
            connection: null,
            selectionRect:null,
            actionStack: [],
            currentActionIndex: -1,
            file: null,    // connection
            reader: null,  // connection
            fileName: null
        }
    },
    
    methods: {


        submit() {
            var flag =0
            for (var r=0; r< this.patientIDS.length; ++r) {
                console.log(this.patientIDS[r])
                if (this.patientIDS[r] == this.selectedID) {flag=1 }
            }
            if (flag==0) alert("ID not found")
            else {
                this.scanmode = true;
                this.patientselectmode=false;
            }
        },

        addNew() {
            this.patientIDS.push(this.selectedID);
            this.scanmode = true;
            this.patientselectmode=false;
        },

        emithome() {
          this.$emit('home');
        },
        scanImg() {
            this.connection.send("1100")
        },
        uploadImg() {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.addEventListener("change", (event) => {
                const selectedFile = event.target.files[0];
                const reader = new FileReader();
                reader.onload= () => {
                    this.img.src = reader.result;
                    this.fileName = selectedFile.name;
                    console.log(this.fileName);
                    this.imageLoadToCanvas();
                };
                reader.readAsDataURL(selectedFile);
            });
            fileInput.click();
        },
        delScanImg() {
            this.canvas.dispose();
            this.initializeFabricCanvas();
            this.actionStack = [];
            this.currentActionIndex =-1
        },
        resetImg() {
            this.currentActionIndex = 0;
            this.actionStack.splice(this.currentActionIndex + 1);
            this.canvas.loadFromJSON(this.actionStack[0],()=>{
                this.canvas.getObjects().forEach((obj)=>{
                    if(obj.type==='image'){
                        this.currentImage = obj;
                    }
                });
            });
        },
        undoChange() {
            if (this.currentActionIndex > 0) {
                this.currentActionIndex--;
                this.canvas.loadFromJSON(this.actionStack[this.currentActionIndex],()=>{
                    this.canvas.getObjects().forEach((obj)=>{
                        if(obj.type==='image'){
                            this.currentImage = obj;
                        }
                    });
                });
            }
        },
        redoChange() {
            if (this.currentActionIndex < this.actionStack.length - 1) {
                this.currentActionIndex++;
                this.canvas.loadFromJSON(this.actionStack[this.currentActionIndex],()=>{
                    this.canvas.getObjects().forEach((obj)=>{
                        if(obj.type==='image'){
                            this.currentImage = obj;
                        }
                    });
                });
            }
        },
        doneScan() {
            //backend scan
            this.delScanImg();
        },
        cancelScan() {
            this.$emit('home')
        },
        // -------------------------------------------------------------------------------------------------
        
        cropImg() {   
            this.canvas.setViewportTransform([1,0,0,1,0,0]);
            this.canvas.setZoom(1);
            this.canvas.getObjects().forEach((obj) => {
                obj.selectable = false;
            });
            this.addSelectionRect();
            this.canvas.setActiveObject(this.selectionRect);
            this.canvas.renderAll();   
        },
        addSelectionRect() {
            this.selectionRect = new fabric.fabric.Rect({
                fill: "rgba(0,0,0,0.3)",
                originX: "left",
                originY: "top",
                stroke: "black",
                opacity: 1,
                top: this.currentImage.top,
                left: this.currentImage.left,
                width: this.currentImage.width,
                height: this.currentImage.height,
                transparentCorners: false,
                cornerColor: "white",
                cornerStrokeColor: "black",
                borderColor: "black",
                cornerSize: 12,
                padding: 0,
                cornerStyle: "circle",
                borderDashArray: [5, 5],
                borderScaleFactor: 1.3,
            });
            this.selectionRect.setControlVisible('mtr', false);
            this.selectionRect.scaleToHeight(this.currentImage.getScaledHeight());
            this.selectionRect.scaleToWidth(this.currentImage.getScaledWidth());
            this.selectionRect.visible = true;
            // this.canvas.centerObject(this.selectionRect);
            this.canvas.add(this.selectionRect);
        },  
        apply_change_crop() {
            var width = this.selectionRect.getScaledWidth();
            var height = this.selectionRect.getScaledHeight();
            if(this.selectionRect.top + this.selectionRect.getScaledHeight() > this.currentImage.top + this.currentImage.getScaledHeight()){
                height-= (this.selectionRect.top + this.selectionRect.getScaledHeight() - this.currentImage.top - this.currentImage.getScaledHeight());
            }
            if(this.selectionRect.left + this.selectionRect.getScaledWidth() > this.currentImage.left + this.currentImage.getScaledWidth()){
                width-= (this.selectionRect.left + this.selectionRect.getScaledWidth() - this.currentImage.left - this.currentImage.getScaledWidth());
            }
            if(this.selectionRect.left<this.currentImage.left){
                width+= (this.selectionRect.left-this.currentImage.left);
            }
            if(this.selectionRect.top<this.currentImage.top){
                height+=(this.selectionRect.top-this.currentImage.top);
            }
            let rect = new fabric.fabric.Rect({
                left: Math.max(this.selectionRect.left,this.currentImage.left),
                top: Math.max(this.selectionRect.top,this.currentImage.top),
                width: width,
                height: height,
                absolutePositioned: true
            });
            this.currentImage.clipPath = rect;
            this.canvas.remove(this.selectionRect);

            var cropped = new Image();
            cropped.src = this.canvas.toDataURL({
                multiplier:4,   // for maintaing Quality
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
            });
            this.canvas.clear();

            cropped.onload = () => {
                let image = new fabric.fabric.Image(cropped);
                image.left = rect.left;
                image.top = rect.top;
                image.scaleToWidth(image.width/4); // for viewing scale down again
                image.scaleToHeight(image.height/4);
                image.setCoords();
                image.setControlsVisibility({ mtr: false })
                this.currentImage = image;
                this.canvas.add(image);
                this.canvas.backgroundColor = "#E1E3E9";
                this.enableObjectScaling();
                this.pushFilter();
                this.canvas.renderAll();
                this.take_data();
            }
        },
        cancelCrop() {
            this.canvas.loadFromJSON(this.actionStack[this.currentActionIndex]);
        },

        // ----------------------------------------------------------------------------

        rotateCanvas(degree){
            let canvasCenter = new fabric.fabric.Point(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2) // center of canvas
            let radians = fabric.fabric.util.degreesToRadians(degree)
            this.canvas.getObjects().forEach((obj) => {
                let objectOrigin = new fabric.fabric.Point(obj.left, obj.top)
                let new_loc = fabric.fabric.util.rotatePoint(objectOrigin, canvasCenter, radians)
                obj.top = new_loc.y
                obj.left = new_loc.x
                obj.angle += degree
                console.log(obj.aCoords);
                // obj.setCoords();
                fabric.fabric.Image.fromURL(obj.toDataURL({multiplier:4}),(image)=>{
                    if(obj.angle===90){
                        image.top = obj.aCoords.bl.y;
                        image.left = obj.aCoords.bl.x;
                    }
                    else if(obj.angle===-90){
                        image.top = obj.aCoords.tr.y;
                        image.left = obj.aCoords.tr.x;
                    }
                    image.scaleToWidth(this.currentImage.getScaledHeight());
                    image.setCoords();
                    image.setControlsVisibility({ mtr: false })
                    this.currentImage = image;
                    this.canvas.clear();
                    this.canvas.backgroundColor = this.canvasBGColor;
                    this.canvas.add(image);
                    this.pushFilter();
                    this.enableObjectScaling();
                })
            });
            this.canvas.renderAll()
        },
        flipCanvas(axis){   
            if(axis==='X') this.currentImage.flipX = !this.currentImage.flipX;
            else if(axis==="Y") this.currentImage.flipY = !this.currentImage.flipY;
            this.canvas.renderAll()
        },
        apply_change_transform(){ 
            this.take_data();
        },
        cancelTransform(){
            this.canvas.loadFromJSON(this.actionStack[this.currentActionIndex]);
        },

        // ------------------------------------------------------------------------------

        adjustBrightness(brightness){
            this.currentImage.filters[0].brightness = brightness / 200;
            this.currentImage.applyFilters();
            this.canvas.renderAll();
        },
        adjustContrast(contrast){
            this.currentImage.filters[1].contrast = contrast / 200;
            this.currentImage.applyFilters();
            this.canvas.renderAll();
        },
        pushFilter(){
            this.currentImage.filters.push(new fabric.fabric.Image.filters.Brightness({
                brightness: 0
            }))
            this.currentImage.filters.push(new fabric.fabric.Image.filters.Contrast({
                contrast: 0
            }));
            this.currentImage.applyFilters()
            this.canvas.renderAll();
        },
        resetFilter(){
            this.adjustBrightness(0)
            this.adjustContrast(0)
        },
        apply_change_filter(){
            fabric.fabric.Image.fromURL(this.currentImage.getSrc(true),(image)=>{
                image.left = this.currentImage.left;
                image.top = this.currentImage.top;
                image.scaleToHeight(this.currentImage.getScaledHeight());
                image.setCoords();
                image.setControlsVisibility({ mtr: false })
                this.currentImage = image;
                this.canvas.clear();
                this.canvas.backgroundColor = this.canvasBGColor;
                this.canvas.add(image);
                this.pushFilter();
                this.enableObjectScaling();
                this.take_data();
            })
        },

        //------------------------------------------------------
        
        draw(data){
            if(!this.canvas.isDrawingMode){
                this.canvas.isDrawingMode = true;
            }
            if(this.canvas.freeDrawingBrush.width!==data.brushSize){
                this.canvas.freeDrawingBrush.width = parseInt(data.brushSize, 10);
            }
            this.canvas.freeDrawingBrush.color = data.brushColor;
        },
        apply_change_draw(){
            this.canvas.isDrawingMode = false;
            let rect = new fabric.fabric.Rect({
                left: this.currentImage.left,
                top: this.currentImage.top,
                width: this.currentImage.getScaledWidth(),
                height: this.currentImage.getScaledHeight(),
                absolutePositioned: true
            });
            this.currentImage.clipPath = rect;
            var cropped = new Image();
            cropped.src = this.canvas.toDataURL({
                multiplier:4,   // for maintaing Quality
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
            });
            console.log(cropped.src);
            this.canvas.clear();
            cropped.onload = () => {
                let image = new fabric.fabric.Image(cropped);
                image.left = rect.left;
                image.top = rect.top;
                image.scaleToWidth(image.width/4); // for viewing scale down again
                image.scaleToHeight(image.height/4);
                image.setCoords();
                image.setControlsVisibility({ mtr: false })
                this.currentImage = image;
                this.canvas.add(image);
                this.canvas.backgroundColor = "#E1E3E9";
                this.enableObjectScaling();
                this.pushFilter();
                this.canvas.renderAll();
                this.take_data();
            }
        },
        cancelDraw(){
            this.canvas.loadFromJSON(this.actionStack[this.currentActionIndex]);
            this.canvas.isDrawingMode = false;
        },
        moveMode(){
            this.canvas.isDrawingMode = false;
        },
        clearDraw(){
            this.canvas.loadFromJSON(this.actionStack[this.currentActionIndex]);
        },

        // ------------------------------------------------------

        zoom(zoomLevel){
            this.canvas.zoomToPoint({ x: this.canvas.width / 2, y: this.canvas.height / 2 }, zoomLevel/100);
            this.canvas.requestRenderAll();
        },
        // ----------------- Other Methods --------------------

        take_data(){
            this.actionStack.splice(this.currentActionIndex + 1);
            this.actionStack.push(this.canvas.toJSON());
            this.currentActionIndex++;
        },
        imageLoadToCanvas(){
            fabric.fabric.Image.fromURL(this.img.src, (image) => {
                if(image.width>image.height){
                    image.scaleToWidth(this.canvas.width)
                }
                else{
                    image.scaleToHeight(this.canvas.height)
                }
                image.setCoords();
              
                image.setControlsVisibility({ mtr: false })
                this.currentImage = image;
                this.canvas.add(image);
                this.canvas.centerObject(image);
                this.pushFilter();
                this.enableObjectScaling();
                this.take_data();
            });
        },
        enableObjectScaling(){
            let objects = this.canvas.getObjects();
            var selection = new fabric.fabric.ActiveSelection(objects, {
                canvas: this.canvas,
            });
            this.canvas.setActiveObject(selection);   
            this.canvas.discardActiveObject();        
            this.canvas.requestRenderAll();
        },
        initializeFabricCanvas(){
            this.canvas = new fabric.fabric.Canvas(this.$refs.canvas);
            this.canvas.backgroundColor = this.canvasBGColor;
            this.canvas.preserveObjectStacking = true;
            this.canvas.setWidth(400);
            this.canvas.setHeight(400);
        },
        async make_connection(){
            this.connection = new WebSocket("ws:///192.168.0.193:8181")
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
                            this.img.src = value
                            this.imageLoadToCanvas();
                        })
                    }
                   
                }
            }
            this.connection.onopen = function () {
                console.log("successfully connected")
            }
        }

    },
    mounted() {
        this.initializeFabricCanvas();
        try {
            this.make_connection();
        } catch (error) {
            console.log(error);
        } 
    },
}
</script>

<style scoped>

.can {
  border: 1px solid black;
}

#selection-wrapper {
    display: block;
}
#selection-items {
    margin:10px;
    display: inline-block;
}

.custom {
    background-color: #808080; /* Grey background color */
    color: #ffffff; /* Text color */
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .custom:hover {
    background-color: #606060; /* Darker grey on hover */
  }

  
  .teeth-text-field {
    padding: 10px;
    font-size: 16px;
    border: 2px solid #bbb;
    border-radius: 20px;
    outline: none;
    transition: border-color 0.3s;
    width: 200px;
    color:aliceblue;
  }

 
  .teeth-text-field:focus {
    border-color: #666; 
  }


</style>