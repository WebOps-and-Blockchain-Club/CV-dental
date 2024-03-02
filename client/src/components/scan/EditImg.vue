<template>
    <div>
        <div class="buttons">
            <!-----------------------CROP|TRANSFORM|FILTER|DRAW BUTTONS---------------------------->
            <div v-if="showEditBtns">
                <button v-for="buttonDetail in editBtn" :key="buttonDetail.id" @click="buttonDetail.method"
                    class="btn btn-light" :title="buttonDetail.title" >
                    <img :src="buttonDetail.img" class="btn-img" />
                    {{buttonDetail.text}}
                </button> 
            </div>

            <!-----------------------CROP|TRANSFORM|FILTER|DRAW'S OPTION BUTTONS------------------------->
            <div v-if = "showCrop">
                <button v-for="buttonDetail in cropBtn" :key="buttonDetail.id" @click="buttonDetail.method"
                    class="btn btn-light" :title="buttonDetail.title">
                    <img :src="buttonDetail.img"  class="btn-img" />
                </button>    
            </div>

            <div v-if ="showTransform">
                <button v-for="buttonDetail in transformBtn" :key="buttonDetail.id" @click="buttonDetail.method"
                    class="btn btn-light" :title="buttonDetail.title">
                    <img :src="buttonDetail.img" class="btn-img" />
                </button> 
            </div>
             
            <div v-show="showFilters">
                <div class="d-flex flex-row justify-content-center align-items-center">
                    <div class="range_panel">
                        <span  class="d-flex flex-row">
                            <label class="filter-label">Contrast</label>
                            <input v-model="contrastValue" class="form-range slider" type="range" min="-100" max="100" @input="adjustContrast"/>
                            <div class="mx-2 inputValue">{{contrastValue}}</div>
                        </span>
                        <span class="d-flex flex-row">
                            <label class="filter-label">Brightness</label>   
                            <input v-model="brightnessValue" class="form-range slider" type="range" min="-100" max="100" @input="adjustBrightness"/>
                            <div class="mx-2 inputValue">{{brightnessValue}}</div>
                        </span>
                    </div>
    
                    <button @click="clickApplyFilter" class="btn btn-light">
                        <img :src="replaceBtnIcn" title="Replace Image" class="btn-img"/>
                    </button>
                    <button @click="clickFilterCancel" class="btn btn-light">
                        <img :src="cancelBtnIcn" title="Cancel Changes" class="btn-img"/>
                    </button>
                </div>
            </div>

            <div v-show="showDraw">
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <div class="d-flex flex-row align-items-center justify-content-center">
                        <button @click = "clickSelectMoveMode" :class="{btnSelected:!paintMode}" class="btn btn-light">
                            <img :src="moveBtnIcn" class="btn-img"/>
                        </button>
                        <button @click = "clickSelectPaintMode" :class="{btnSelected:paintMode}" class="btn btn-light">
                            <img :src="drawBtnIcn" class="btn-img"/>
                        </button>
                        <div @click="clickSelectColor($event)" class="color-panel d-flex flex-row align-items-center">
                            <button v-for="buttonDetail in colorBtn" :key="buttonDetail.id" 
                                class="colorBtn" :id="buttonDetail.color" :style="buttonDetail.style" :class="{selected: buttonDetail.selected}">
                            </button>  
                        </div>
                    </div>
                    <span class="d-flex flex-row">
                        <label class="filter-label">Brush Size</label>   
                        <input v-model="brushSize" id="id2" class="form-range slider" type="range" min="1" max="30" step="1" @input="adjustBrushSize"/>
                        <div class="mx-2 inputValue">{{brushSize}}</div>
                    </span>  
              </div>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center zoom-panel my-2 mx-auto" >
            <img :src="minusBtnIcn" class="zoom-icn" @click="zoomOut" title="Zoom Out">
            <input v-model="zoomValue" class="form-range slider" type="range" min="10" max="500" @input="adjustZoom"/>
            <img :src="plusBtnIcn" class="zoom-icn" @click="zoomIn" title="Zoom In">
            <div class="mx-2 inputValue">{{zoomValue}}%</div>
            <img :src="fitZoomBtnIcn" class="zoom-icn" @click="fitZoom" title="Fit Zoom">
        </div>
        <!-- <div v-if="showEditBtns" class="buttons">
            <button @click="mount" class="btn btn-success hidden">
                <img :src="replaceBtnIcn" title="Done" class="btn-img">
                done
            </button>
        </div> -->
    </div>
</template>
<script>
// import editBtnImg from "../../assets/edit-button-image-custom-icon.png"
import crop from "../../assets/crop.png"
import transform from "../../assets/transform.png"
import draw from "../../assets/draw.png"
import filter from "../../assets/filter.png"
import rotateLeft from "../../assets/circular-counterclockwise-arrow-rotation.png"
import rotateRight from "../../assets/rotating-arrow-symbol.png"    
import replace from "../../assets/true.png"
import cancel from "../../assets/forbidden.png"
import plus from "../../assets/plus.png"
import minus from "../../assets/minus.png"
import fitZoom from "../../assets/fit-zoom.png"
import move from "../../assets/move.png"


export default {
    name: 'EditImg',
    emits : ['crop','draw','rotateRight','rotateLeft','apply_change_crop','apply_change_transform','apply_change_filter','cancelTransform','cancelCrop','reset_filter'],
    data() {
        return {
            drawBtnIcn : draw,
            transformBtnIcn : transform,
            cropBtnIcn: crop,
            filterBtnIcn: filter,
            replaceBtnIcn: replace,
            cancelBtnIcn: cancel,
            plusBtnIcn : plus,
            minusBtnIcn: minus,
            fitZoomBtnIcn : fitZoom,
            moveBtnIcn : move,
            paintMode:true,
            rotation : 0,
            showEditBtns: true,
            showTransform: false,
            showCrop: false,
            showFilters: false,
            showDraw: false,
            contrastValue:0,
            brightnessValue: 0,
            zoomValue:100,
            selectedColor: 'black',
            brushSize:10,
            editBtn:[
                {id:0, img: crop, title: "Crop Image", text:"Crop", method: this.toggleShowCropButtons},
                {id:1, img: transform, title: "Transform Image", text:"transform", method: this.toggleShowTransfromButtons},
                {id:2, img: filter, title: "Filter", text:"Filter", method: this.toggleShowFilterButtons},
                {id:3, img: draw, title: "Draw", text:"Draw", method: this.toggleShowDrawButtons},
            ],
            cropBtn: [
                { id: 0, img: replace, title: "Replace Image", method: this.clickApplyCrop },
                { id: 1, img: cancel, title: "Cancel Change", method: this.clickCropCancel}
            ],
            transformBtn: [
                { id: 0, img: rotateLeft, title: "Rotate Left", method: this.clickRotateLeft },
                { id: 1 , img: rotateRight, title: "Rotate Right", method: this.clickRotateRight },
                { id: 2, img: replace, title: "Replace Image", method: this.clickApplyTransform },
                { id: 3, img: cancel, title: "Cancel Change", method: this.clickTransformCancel}
            ],
            colorBtn:[
                {id:"0",color:"black",style:{"background-color":"black"},selected:true},
                {id:"1",color:"yellow",style:{"background-color":"yellow"},selected:false},
                {id:"2",color:"red",style:{"background-color":"red"},selected:false},
                {id:"3",color:"green",style:{"background-color":"green"},selected:false},
                {id:"4",color:"blue",style:{"background-color":"blue"},selected:false},
            ]
        }
    },
    methods: {

        // ------------------Toggle Methods ------------------
        toggleShowCropButtons(){
            this.showEditBtns = false;
            this.showCrop = true;
            this.$emit('crop');
        },
        toggleShowTransfromButtons(){
            this.showEditBtns = false;
            this.showTransform = true;
        },
        toggleShowFilterButtons(){
            this.showEditBtns = false;
            this.showFilters = true;
            this.brightnessValue=0;
            this.contrastValue=0;
        },
        toggleShowDrawButtons(){
            this.showEditBtns = false;
            this.showDraw = true;
            this.paintMode = true;
            this.$emit('draw',{"brushColor": this.selectedColor,"brushSize":this.brushSize});
        },

       
        // ----------------Apply Methods-----------------------
        clickApplyCrop() {
            this.showEditBtns = true;
            this.showCrop = false;
            this.$emit('apply_change_crop')
        },
        clickApplyTransform(){
            this.showEditBtns = true;
            this.showTransform = false;
            this.$emit('apply_change_transform')
        },
        clickApplyFilter(){   
            this.showEditBtns = true;
            this.showFilters = false;
            this.$emit('apply_change_filter')
        },
        clickApplyDrawing(){
            this.$emit('zoom',100);
            this.showEditBtns = true;
            this.showDraw = false;
            this.$emit('apply_change_draw')
            this.$emit('zoom',this.zoomValue);
        },
        clearDrawing(){
            this.$emit('clearDraw')
        },
        
        // ----------------Cancel Methods-----------------------
        clickTransformCancel(){
            this.showEditBtns = true;
            this.showTransform = false;
            this.$emit('cancelTransform')
        },
        clickCropCancel() {
            this.showEditBtns = true;
            this.showCrop = false;
            this.$emit('cancelCrop')  
        },
        clickFilterCancel(){   
            this.showEditBtns = true;
            this.showFilters = false;
            this.$emit('reset_filter');
        },
        clickDrawCancel(){      
            this.showEditBtns = true;
            this.showDraw = false;
            this.$emit('cancelDraw');
        },

        // ---------------- Other Methods --------------------

        clickRotateRight() {
            this.$emit('rotate',90);
        },
        clickRotateLeft() {
            this.$emit('rotate',-90);
        },
        adjustBrightness(){
            this.$emit('adjustBrightness',this.brightnessValue);
        },
        adjustContrast(){
            this.$emit('adjustContrast',this.contrastValue);
        },
        adjustBrushSize(){
            this.$emit('draw',{"brushColor": this.selectedColor,"brushSize":this.brushSize});
        },
        adjustZoom(){
            this.$emit('zoom',this.zoomValue);
        },
        zoomIn(){
            this.zoomValue+=20;
            this.$emit('zoom',this.zoomValue);
        },
        zoomOut(){
            this.zoomValue-=20;
            this.$emit('zoom',this.zoomValue);
        },
        fitZoom(){
            this.zoomValue=100;
            this.$emit('zoom',this.zoomValue);
        },
        clickSelectMoveMode(){
            this.paintMode = false;
            this.$emit('moveMode');
        },
        clickSelectPaintMode(){
            this.paintMode = true;
            this.$emit('draw',{"brushColor": this.selectedColor,"brushSize":this.brushSize});
        },
        clickSelectColor(e){
            if(e.target!==e.currentTarget){
                this.selectedColor = e.target.id;
                for(var i=0; i<this.colorBtn.length;i++){
                    if(this.colorBtn[i].color===this.selectedColor){
                        this.colorBtn[i].selected = true;
                    }
                    else{
                        this.colorBtn[i].selected = false;
                    }
                }
                this.$emit('draw',{"brushColor": this.selectedColor,"brushSize":this.brushSize});
            }
        }
    },    
}
</script>

<style scoped>
*{
    overflow-y: hidden;
}
.btn-img {
    width: 22px;
    user-select: none;
    -webkit-user-drag: none;
}
.zoom-icn{
    margin:5px;
    width: 25px;
    height: 16px;
    cursor: pointer;
    user-select: none;
    -webkit-user-drag: none;
}
.btn{
    max-height: 50px;
    margin: 3px;
    padding: 8px;
    border: 1.5px solid black;
    /* box-shadow: 0 1px 2px black; */
}
.filter-label{
    text-align: start;
    width: 200px;
}
.selected{
    box-shadow: 0px 0px 15px v-bind(selectedColor);
    border: none;
}
.btnSelected{
    background-color: rgb(140, 140, 140);
}

.colorBtn{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border:none;
    margin:6px;
}
.zoom-panel{
    position: absolute;
    bottom: 5px;
    right: 10px;
    padding: 5px;
    background-color: white;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0px 1px 2px gray;
}
.color-panel{
    height: 43.45px;
    margin: 3px;
    border-radius: 5px;
    border:1.5px solid rgb(148, 147, 147)
}

.slider{
    overflow: hidden;
}

.slider::-webkit-slider-thumb{
    transition: all 0.15s ease-in-out;
    background: black;  
    box-shadow: 0px 0px 5px  black;
}
.slider::-webkit-slider-thumb:hover{
    transform: scale(1.2);
}

.slider::-webkit-slider-runnable-track{
    margin: 15px;
    height: 0.4rem;
}

.slider::-moz-range-thumb{
    transition: all 0.15s ease-in-out;
    background: black;
    box-shadow: 0px 0px 5px  black;
}
.slider::-moz-range-thumb:hover{
    transform: scale(1.2);
}

.inputValue{
    width: 80px;
}
</style>