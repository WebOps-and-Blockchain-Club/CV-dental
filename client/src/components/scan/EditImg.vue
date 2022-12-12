<template>
    <div>
        <div class="buttons">
             <!-----------------------CROP|TRANSFORM|FILTER|DRAW BUTTONS---------------------------->
            <button @click="toggleShowCropButtons" class="icnBtn btn btn-light" v-if="showEditBtns ">
                <img :src="cropBtnIcn" title="Crop Image" class="icn-img">
                Crop
            </button>
            <button @click="toggleShowTransfromButtons" class = "icnBtn btn btn-light" v-if="showEditBtns">
                <img :src="transformBtnIcn" title="Transform" class="icn-img">
                Transform
            </button>
            <button @click="toggleShowFilterButtons " class="icnBtn btn btn-light" v-if="showEditBtns">
                <img :src="filterBtnIcn" title="Filters" class="icn-img">
                Filter
            </button>
            <button @click="toggleShowDrawButtons" class="icnBtn btn btn-light" v-if="showEditBtns">
                <img :src="drawBtnIcn" title="Draw" class="icn-img">
                Draw
            </button>

            <!-----------------------CROP|TRANSFORM|FILTER|DRAW'S OPTION BUTTONS------------------------->
            <div v-if = "showCrop">
                <button v-for="buttonDetail in cropBtn" :key="buttonDetail.id" @click="buttonDetail.method"
                    class="icnBtn btn-light ">
                    <img :src="buttonDetail.img" :title="buttonDetail.title" class="icn-img" />
                </button>    
            </div>
            <div v-if = "showTransform">
                <button v-for="buttonDetail in transformBtn" :key="buttonDetail.id" @click="buttonDetail.method"
                    class="icnBtn btn-light">
                    <img :src="buttonDetail.img" :title="buttonDetail.title" class="icn-img" />
                </button> 
            </div>
             
            <div class="d-flex flex-row justify-content-center hidden" id="filter">
                <div class="range_panel display">
                    <span  class="d-flex flex-row">
                        <label class="label">Contrast</label>
                        <input v-model="contrastValue" id="id1" class="fit-val form-range" type="range" min="0" max="200"/>
                        <div class="val mx-2" id="contrast">{{contrastValue}}</div>
                    </span>
                    <span class="d-flex flex-row">
                        <label class="label">Brightness</label>   
                        <input v-model="brightnesValue" id="id2" class="fit-val form-range" type="range" min="0" max="200"/>
                        <div class="val mx-2" id="bright">{{brightnesValue}}</div>
                    </span>
                </div>


                <button @click="clickApplyFilter" class="icnBtn btn btn-light">
                    <img :src="replaceBtnIcn" title="Replace Image" class="icn-img"/>
                </button>
                <button @click="clickFilterCancel" class="icnBtn btn btn-light">
                    <img :src="cancelBtnIcn" title="Cancel Changes" class="icn-img"/>
                </button>
            </div>

            <div class="hidden" id="draw">
                <div>
                    <span>Color: </span>
                    <input type="radio" name="colorRadio" value="black" checked />
                    <label for="black" class="mx-1">Black</label>
                    <input type="radio" name="colorRadio" value="white" />
                    <label for="black" class="mx-1">White</label>
                    <input type="radio" name="colorRadio" value="red" />
                    <label for="black" class="mx-1">Red</label>
                    <input type="radio" name="colorRadio" value="green" />
                    <label for="black" class="mx-1">Green</label>
                    <input type="radio" name="colorRadio" value="blue" />
                    <label for="black" class="mx-1">Blue</label>
                </div>
                <div>
                    <button id="clear" class="icnBtn btn btn-light" >Clear</button>
                    <button @click="clickApplyDrawing" id="clear" class="icnBtn btn btn-light" >
                        <img :src="replaceBtnIcn" title="Replace Image" class="icn-img"/>
                    </button>
                    <button @click="clickDrawCancel" id="clear" class="icnBtn btn btn-light" >
                        <img :src="cancelBtnIcn" title="Cancel Changes" class="icn-img"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="buttons">
        <button @click="mount" class="icnBtn btn btn-success hidden">
            <img :src="replaceBtnIcn" title="Done" class="icn-img">
            done
        </button>
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
            showEditBtns: true,
            showTransform: false,
            showCrop: false,
            showFilters: false,
            showDraw: false,
            contrastValue:100,
            brightnesValue: 100,
            cropBtn: [
                { id: 0, img: replace, title: "Replace Image", method: this.clickApplyCrop },
                { id: 1, img: cancel, title: "Cancel Change", method: this.clickCropCancel}
            ],
            transformBtn: [
                { id: 0, img: rotateLeft, title: "Rotate Left", method: this.clickRotateLeft },
                { id: 1 , img: rotateRight, title: "Rotate Right", method: this.clickRotateRight },
                { id: 2, img: replace, title: "Replace Image", method: this.clickApplyTransform },
                { id: 3, img: cancel, title: "Cancel Change", method: this.clickTransformCancel}
            ]
        }
    },
    methods: {
        toggleShowCropButtons(){
            this.showEditBtns = false;
            this.showCrop = true;
            this.$emit('crop')
        },
        toggleShowTransfromButtons(){
            this.showEditBtns = false;
            this.showTransform = true;
        },
        toggleShowFilterButtons(){
            this.showEditBtns = false;
            document.getElementById("filter").classList.remove("hidden");
        },
        toggleShowDrawButtons(){
            this.showEditBtns = false;
            this.showDraw = true
            document.getElementById("draw").classList.remove("hidden");
            this.$emit('draw')
        },
        clickRotateRight() {
            this.$emit('rotateRight')
        },
        clickRotateLeft() {
            this.$emit('rotateLeft')
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
            document.getElementById("filter").classList.add("hidden");
            this.showEditBtns = true;
            this.$emit('apply_change_filter')
        },
        clickApplyDrawing(){
            document.getElementById("draw").classList.add("hidden");
            this.showEditBtns = true;
            this.$emit('apply_change_draw')
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
            document.getElementById("filter").classList.add("hidden");
            this.showEditBtns = true;
            this.$emit('reset_filter');
        },
        clickDrawCancel(){
            document.getElementById("draw").classList.add("hidden");
            this.showEditBtns = true;
            this.$emit('cancelDraw');
        }
    },
    mounted(){

    },
    
}
</script>

<style scoped>
.icn-img {
    width: 22px;
}
.icnBtn {
    max-height: 50px;
    margin: 3px;
    padding: 8px;
    cursor: pointer;
    border: 1.5px solid rgb(148, 147, 147);
}
.hidden{
    display: none !important;
}
.label{
    text-align: start;
    width: 200px;
}

#red{
    background-color: red;
    width:50px;
    height: 50px;
    border: 1px solid red;
    border-radius: 50%;
}


</style>