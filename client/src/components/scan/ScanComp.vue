<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <h1 >SCANNING</h1>
        <AddImg @scan="scanImg" 
                @del="delScanImg" 
                @reset="resetImg" 
                @undo="undoChange" 
                @redo="redoChange" />
        
        
        <div id="fabric-canvas-wrapper">
            <canvas ref="canvas" id="drawingCanvas" class="can"></canvas>
        </div>

        <EditImg @crop="cropImg"
                @reset_filter = "resetFilter" 
                @rotateLeft="rotateImgLeft"
                @rotateRight="rotateImgRight" 
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
                @cancelDraw = "cancelDraw"
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
            canvas:null,
            currentImage:null,
            img:null, 
            replaceBtnIcn : replace,
            cancelBtnIcn : cancel,
            connection: null,
            selectionRect:null,
            temp_rotation: 0,
            rotation: 0,
            imgBrightness: 0,
            tempBrightness:0,
            imgContrast: 0,
            tempContrast:0,
            currentBrushColor:"black",
            brushSize: 1,
            tempCanvasJSON:null,
            actionStack: [],
            currentActionIndex: -1,
            file: null,    // connection
            reader: null,  // connection
        }
    },
    methods: {
        scanImg() {
            this.connection.send("1100")
        },
        delScanImg() {
            this.canvas.dispose();
            this.initializeFabricCanvas();
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
        // -------------------------------------------------------------------------------------------------
        
        cropImg() {   
            this.tempCanvasJSON = this.canvas.toJSON();
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
                width: this.canvas.width,
                height: this.canvas.height,
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
            this.selectionRect.scaleToWidth(300);
            this.canvas.centerObject(this.selectionRect);
            this.selectionRect.visible = true;
            this.canvas.add(this.selectionRect);
        },  
        apply_change_crop() {
            let rect = new fabric.fabric.Rect({
                left: this.selectionRect.left,
                top: this.selectionRect.top,
                width: this.selectionRect.getScaledWidth(),
                height: this.selectionRect.getScaledHeight(),
                absolutePositioned: true
            });
            this.currentImage.clipPath = rect;
            this.canvas.remove(this.selectionRect);

            var cropped = new Image();
            cropped.src = this.canvas.toDataURL({
                multiplier:5,   // for maintaing Quality
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
                image.scaleToWidth(image.width/5); // for viewing scale down again
                image.scaleToHeight(image.height/5);
                image.setCoords();
                image.setControlsVisibility({ mtr: false })
                this.currentImage = image;
                this.pushFilter();
                this.canvas.add(image);
                let objects = this.canvas.getObjects();
                var selection = new fabric.fabric.ActiveSelection(objects, {
                    canvas: this.canvas,
                });
                this.canvas.setActiveObject(selection);   //selecting all objects...
                this.canvas.discardActiveObject();        //...and deselecting them
                this.canvas.requestRenderAll();
                this.canvas.backgroundColor = "#E1E3E9";
                this.canvas.renderAll();
                this.take_data();
            }
        },
        cancelCrop() {
            this.canvas.loadFromJSON(this.tempCanvasJSON);
        },

        // ----------------------------------------------------------------------------

        rotateImgLeft() {
            this.temp_rotation-=90    
            this.rotateCanvas(-90)
        },
        rotateImgRight() {
            this.temp_rotation+=90
            this.rotateCanvas(90)
        },
        rotateCanvas(degree){
            let canvasCenter = new fabric.fabric.Point(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2) // center of canvas
            let radians = fabric.fabric.util.degreesToRadians(degree)
            this.canvas.getObjects().forEach((obj) => {
                let objectOrigin = new fabric.fabric.Point(obj.left, obj.top)
                let new_loc = fabric.fabric.util.rotatePoint(objectOrigin, canvasCenter, radians)
                obj.top = new_loc.y
                obj.left = new_loc.x
                obj.angle += degree
                obj.setCoords()
            });
            this.canvas.renderAll()
        },
        apply_change_transform(){
            this.rotation = this.temp_rotation;
            this.take_data();
        },
        cancelTransform(){
            this.rotateCanvas(this.rotation-this.temp_rotation);
            this.temp_rotation = this.rotation;
        },

        // ------------------------------------------------------------------------------

        adjustBrightness(brightness){
            this.tempBrightness = brightness;
            this.currentImage.filters[0].brightness = this.tempBrightness / 200;
            this.currentImage.applyFilters();
            this.canvas.renderAll();
        },
        adjustContrast(contrast){
            this.tempContrast = contrast;
            this.currentImage.filters[1].contrast = this.tempContrast / 200;
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
            this.tempBrightness = this.brightness;
            this.tempContrast = this.contrast;
            this.adjustBrightness(0)
            this.adjustContrast(0)
        },
        apply_change_filter(){
           this.brightness = this.tempBrightness
           this.contrast = this.tempContrast;
        //    this.take_data();
        },

        //------------------------------------------------------
        
        draw(data){
            if(!this.canvas.isDrawingMode){
                this.tempCanvasJSON= this.canvas.toJSON();
                this.canvas.isDrawingMode = true;
            }
            if(this.canvas.freeDrawingBrush.width!==data.brushSize){
                this.canvas.freeDrawingBrush.width = parseInt(data.brushSize, 10);
            }
            this.canvas.freeDrawingBrush.color = data.brushColor;
        },
        apply_change_draw(){
            this.canvas.isDrawingMode = false;
            this.take_data();
        },
        cancelDraw(){
            this.canvas.loadFromJSON(this.tempCanvasJSON);
            this.canvas.isDrawingMode = false;
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
            fabric.fabric.Image.fromURL(this.img.src, img => {
                img.selectable = true;
                img.setControlsVisibility({ mtr: false })
                img.scaleToWidth(this.canvas.width)
                img.scaleToHeight(this.canvas.height)
                this.canvas.add(img);
                this.canvas.centerObject(img);
                this.currentImage = img;
                let objects = this.canvas.getObjects();
                var selection = new fabric.fabric.ActiveSelection(objects, {
                    canvas: this.canvas,
                });
                this.canvas.setActiveObject(selection);   
                this.canvas.discardActiveObject();        
                this.canvas.requestRenderAll();
                this.pushFilter();
                this.take_data();
            });
        },
        initializeFabricCanvas(){
            this.canvas = new fabric.fabric.Canvas(this.$refs.canvas);
            this.canvas.backgroundColor = "#E1E3E9";
            this.canvas.preserveObjectStacking = true;
            this.canvas.setWidth(500);
            this.canvas.setHeight(500);
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
                            this.img.src = value
                            this.imageLoadToCanvas();
                        })
                    }
                   
                }
            }
        }

    },
    mounted() {
        this.img = new Image();
        this.initializeFabricCanvas();
        this.make_connection();

        this.connection.onopen = function () {
            console.log("successfully connected")
        }
       
    },
}
</script>

<style scoped>

.can {
  border: 1px solid black;
}




</style>