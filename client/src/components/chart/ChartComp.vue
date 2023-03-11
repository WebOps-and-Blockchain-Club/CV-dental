<template class="app">

    <div class="appBar">
      <img class="logo" :src="logo"/>
      Dental Appointment
    </div>
    
    <div class="d-flex flex-row p-3 mx-3">
      <div class="mx-3 glass-container selction-panel d-flex flex-column align-items-start justify-content-center">
        <label class="mx-3 option-title d-flex flex-row align-items-center justify-content-center">
          <input class ="form-check-input" type="radio" name="selection" value="scan" @click="selectedOption" checked>
          <h5 class="mx-2">Scan </h5>
        </label>
        <label class="mx-3 option-title d-flex flex-row align-items-center justify-content-center">
          <input class ="form-check-input" type="radio" name="selection" value="preview" @click="selectedOption">
          <h5 class="mx-2">Preview </h5>
        </label>
      </div>
      <div class="d-flex flex-column chart glass-container">
        <div class="d-flex flex-row">
          <div class="UpperJaw"  v-for="id in ids.slice(0,16)" :key="id">
            <button type="submit"  @click="clickTooth"><img :id="id" :src="buttons[id].image" :title="buttons[id].title"/></button>
          </div>
        </div>
          <br/>
        <div class="d-flex flex-row">
          <div class="LowerJaw"  v-for="id in ids.slice(16,32)" :key="id">
            <button type="submit"  @click="clickTooth"><img  :id="id" :src="buttons[id].image" :title="buttons[id].title"/></button>
          </div>
        </div>
      </div>
      
      <div class="mx-3">
        <img class="preview img-fluid rounded glass-container" :src="preview" alt="preview goes here"/>
      </div>
    </div>
    <div v-if="diseaseDisplay" class="m-3 p-3 glass-container disease-container">
        <div>
          <h3 class="disease-title">{{ current_title }}</h3>
          <h6 class="my-2">{{ current_dis }}</h6>
        </div>
    </div>

</template>

<script>

import sample from "@/assets/avatar.png";

import dummy1 from "@/assets/logo.jpg";

// import placeholder from "@/assets/Sample.jpg"

import tooth1 from "@/assets/Teeth_set/1.png";
import tooth2 from "@/assets/Teeth_set/2.png";
import tooth3 from "@/assets/Teeth_set/3.png";
import tooth4 from "@/assets/Teeth_set/4.png";
import tooth5 from "@/assets/Teeth_set/5.png";
import tooth6 from "@/assets/Teeth_set/6.png";
import tooth7 from "@/assets/Teeth_set/7.png";
import tooth8 from "@/assets/Teeth_set/8.png";
import tooth9 from "@/assets/Teeth_set/9.png";
import tooth10 from "@/assets/Teeth_set/10.png";
import tooth11 from "@/assets/Teeth_set/11.png";
import tooth12 from "@/assets/Teeth_set/12.png";
import tooth13 from "@/assets/Teeth_set/13.png";
import tooth14 from "@/assets/Teeth_set/14.png";
import tooth15 from "@/assets/Teeth_set/15.png";
import tooth16 from "@/assets/Teeth_set/16.png";
import tooth17 from "@/assets/Teeth_set/17.png";
import tooth18 from "@/assets/Teeth_set/18.png";
import tooth19 from "@/assets/Teeth_set/19.png";
import tooth20 from "@/assets/Teeth_set/20.png";
import tooth21 from "@/assets/Teeth_set/21.png";
import tooth22 from "@/assets/Teeth_set/22.png";
import tooth23 from "@/assets/Teeth_set/23.png";
import tooth24 from "@/assets/Teeth_set/24.png";
import tooth25 from "@/assets/Teeth_set/25.png";
import tooth26 from "@/assets/Teeth_set/26.png";
import tooth27 from "@/assets/Teeth_set/27.png";
import tooth28 from "@/assets/Teeth_set/28.png";
import tooth29 from "@/assets/Teeth_set/29.png";
import tooth30 from "@/assets/Teeth_set/30.png";
import tooth31 from "@/assets/Teeth_set/31.png";
import tooth32 from "@/assets/Teeth_set/32.png";
import noImage from "@/assets/noImages.png";


export default
{
    name:'ChartComp',
    data(){
        return{
          buttons:[
            {image:tooth1,title:"tooth 1"},
            {image:tooth2,title:"tooth 2"},
            {image:tooth3,title:"tooth 3"},
            {image:tooth4,title:"tooth 4"},
            {image:tooth5,title:"tooth 5"},
            {image:tooth6,title:"tooth 6"},
            {image:tooth7,title:"tooth 7"},
            {image:tooth8,title:"tooth 8"},
            {image:tooth9,title:"tooth 9"},
            {image:tooth10,title:"tooth 10"},
            {image:tooth11,title:"tooth 11"},
            {image:tooth12,title:"tooth 12"},
            {image:tooth13,title:"tooth 13"},
            {image:tooth14,title:"tooth 14"},
            {image:tooth15,title:"tooth 15"},
            {image:tooth16,title:"tooth 16"},
            {image:tooth17,title:"tooth 32"},
            {image:tooth18,title:"tooth 31"},
            {image:tooth19,title:"tooth 30"},
            {image:tooth20,title:"tooth 29"},
            {image:tooth21,title:"tooth 28"},
            {image:tooth22,title:"tooth 27"},
            {image:tooth23,title:"tooth 26"},
            {image:tooth24,title:"tooth 25"},
            {image:tooth25,title:"tooth 24"},
            {image:tooth26,title:"tooth 23"},
            {image:tooth27,title:"tooth 22"},
            {image:tooth28,title:"tooth 21"},
            {image:tooth29,title:"tooth 20"},
            {image:tooth30,title:"tooth 19"},
            {image:tooth31,title:"tooth 18"},
            {image:tooth32,title:"tooth 17"},
          ],
          ids:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
          diseaseData:[
            {title:"Tooth decay (cavities)", des:"It is the most prevalent dental disease, caused by the buildup of plaque and bacteria on the tooth surface that produces acid that erodes the enamel"},
            {title:"Abscess", des:"An abscess is a painful infection that can occur anywhere in the body, including the mouth. A dental abscess is an infection at the root of a tooth or in the gum tissue surrounding a tooth. It is typically caused by a bacterial infection that occurs as a result of tooth decay, gum disease, or trauma to the tooth"},
            {title:"Bone loss", des:"Bone loss refers to the gradual deterioration of the bone tissue in the body. It can occur for a variety of reasons, including age, genetics, hormonal changes, and certain medical conditions. Bone loss can lead to osteoporosis, a condition in which bones become weak and brittle and are more prone to fractures."},
            {title:"Gum disease (periodontal disease)", des:"Gum disease, also known as periodontal disease, is an inflammatory condition that affects the gum tissue and supporting structures of the teeth. It is caused by a buildup of bacteria in the mouth that can lead to the formation of plaque and tartar on the teeth. If left untreated, gum disease can lead to tooth loss and other serious health problems."},
            {title:"Gum disease (periodontal disease)", des:"Gum disease, also known as periodontal disease, is an inflammatory condition that affects the gum tissue and supporting structures of the teeth. It is caused by a buildup of bacteria in the mouth that can lead to the formation of plaque and tartar on the teeth. If left untreated, gum disease can lead to tooth loss and other serious health problems."},
            {title:"Gum disease (periodontal disease)", des:"Gum disease, also known as periodontal disease, is an inflammatory condition that affects the gum tissue and supporting structures of the teeth. It is caused by a buildup of bacteria in the mouth that can lead to the formation of plaque and tartar on the teeth. If left untreated, gum disease can lead to tooth loss and other serious health problems."},
            {title:"Impacted tooth", des:"It is the most prevalent dental disease, caused by the buildup of plaque and bacteria on the tooth surface that produces acid that erodes the enamel"},

          ],
          previewImages: [],
          preview:noImage,
          avatar:sample,
          logo:dummy1,
          option: 'scan',
          diseaseDisplay:false,
          current_title:'',
          current_dis:'',
        }
    },
    methods:{
        selectedOption(event) {
          this.option = event.target.value;

        },
        clickTooth(event){
          if(this.option=='scan'){
            this.$emit('scan')
          }
          else if(this.option=='preview'){
            // from preview Images array get the image of the clicked tooth
            console.log(event.target.id);
            this.preview=this.previewImages[event.target.id]
            this.diseaseDisplay=false;
          }
        },
        setscan(){
          this.scan=!this.scan
          
        },
        setpreview(){
          this.pview=!this.pview
          
        }
    },
    props: {
        imageUrl: {
            type: String,
            required: true
        },
        isImageDisplayed: {
            type: Boolean,
            required: true
        },
        fileName: {
            type: String,
            required: true
        }
    },
    mounted(){
      // previwImages arrays add 32 dummy images with noImage
      for (let i = 0; i < 32; i++) {
        this.previewImages.push(noImage);
      }
      if(this.isImageDisplayed){
        this.preview=this.imageUrl
        this.diseaseDisplay=true
        this.current_title = this.diseaseData[parseInt(this.fileName[0])-1].title
        this.current_dis = this.diseaseData[parseInt(this.fileName[0])-1].des
      }
    }
}
</script>

<style scoped>
  *{
    margin:0%;
    padding:0%;
  }
  
  .option-title{
    font-size: 1.2rem;
    font-weight: 500;
    color: rgb(0, 0, 0);
  }
  .flex-parent-element {
  display: flex;
  margin: 10px;
  }
  .selction-panel{
    height: 70px;
  }
  .flex-child-element {
  flex: 1;
  box-shadow:2px 2px 2px 2px rgb(24, 24, 24);
  margin: 10px;
  }

  button{
    cursor: pointer;
    border:none;
    appearance: none;
    background-color:rgb(33, 36, 51);
  }

  button {
    transition: all 1s ease;
    transform: scale(1);
  }

  button:hover {
  transform: scale(1.25) perspective(1px);
  }

  .patient_card{
    background-color: whitesmoke;
    max-height: 290px;
  }
  div .preview-pane{
    max-width: max-content;
    max-height: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
  }

  body{
    color: whitesmoke;
    background-color:slategray;
  }

  .appBar{
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: rgb(46, 50, 71);
    color: whitesmoke;
    font: 1.2rem/1 "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  p{
    display: flex;
    justify-content: center;
    font-size: xx-small;
    margin: 4%;
    color: black;
    font: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .cardbar{
    font: 1.1rem/1.3 "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin:0%;
    background-color: rgb(46, 50, 71);
    color:whitesmoke;
  }
  
  .Avatar{
    margin-top:5%;
  }
  .logo{
    max-width: 50px;
    max-height: 50px;
    padding: 0.5%;
  }
  .preview{
    max-height: 270px;
    padding: 13px;
    /* border: 2px solid white; */
  }
  .glass-container{
    backdrop-filter: blur(11px) saturate(156%);
    -webkit-backdrop-filter: blur(11px) saturate(156%);
    background-color: rgba(255, 255, 255, 0.55);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
  }
  .chart{
    /* max-height: 270px; */
    padding: 13px;
  }

  .disease-container{
    max-width: 79vw;
  }
</style>