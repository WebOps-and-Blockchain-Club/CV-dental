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
                @cancelDraw = "cancelDraw"
                @clearDraw = "clearDraw"
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
            canvas:null,
            canvasBGColor:"#E1E3E9",
            canvasWidth:500,
            canvasHeight:500,
            currentImage:null,
            img:new Image(), 
            replaceBtnIcn : replace,
            cancelBtnIcn : cancel,
            rotation:0,
            temp_rotation:0,
            connection: null,
            selectionRect:null,
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
            // this.canvas.centerObject(this.selectionRect);
            this.selectionRect.visible = true;
            this.canvas.add(this.selectionRect);
        },  
        apply_change_crop() {
            this.rotation =0;
            this.temp_rotation=0;
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
            this.temp_rotation+=degree;
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
        flipCanvas(axis){   
            if(axis==='X') this.currentImage.flipX = !this.currentImage.flipX;
            else if(axis==="Y") this.currentImage.flipY = !this.currentImage.flipY;
            this.canvas.renderAll()
        },
        apply_change_transform(){
            this.rotation = this.temp_rotation;
            this.take_data();
        },
        cancelTransform(){
            this.temp_rotation =this.rotation;
            this.canvas.loadFromJSON(this.actionStack[this.currentActionIndex]);
        },

        // ------------------------------------------------------------------------------

        adjustBrightness(brightness){
            // console.log(this.currentImage.getOriginalSize())
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
            let left = this.currentImage.left;
            let top = this.currentImage.top;
            fabric.fabric.Image.fromURL(this.currentImage.getSrc(true),(image)=>{
                // image.left = 0;
                // image.left = this.currentImage.top;
                image.scaleToHeight(this.currentImage.getScaledHeight());
                image.setCoords();
                image.setControlsVisibility({ mtr: false })
                this.currentImage = image;
                this.canvas.clear();
                this.canvas.backgroundColor = this.canvasBGColor;
                this.canvas.add(image);
                this.pushFilter();
                this.enableObjectScaling();
                this.rotateCanvas(this.rotation);
            })
            setTimeout(() => {
                this.currentImage.top = top;
                this.currentImage.left = left;
                this.enableObjectScaling();
                this.take_data();
            }, 1); 

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
            this.rotation =0;
            this.temp_rotation=0;
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
            this.canvas.setWidth(this.canvasWidth);
            this.canvas.setHeight(this.canvasHeight);
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
            this.connection.onopen = function () {
                console.log("successfully connected")
            }
        }

    },
    mounted() {
        this.initializeFabricCanvas();
        this.make_connection();
    },
}
</script>

<style scoped>

.can {
  border: 1px solid black;
}




</style>