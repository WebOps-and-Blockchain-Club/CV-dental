<template>

  <div id="home-wrapper">
    <button v-on:click = "emithome" id="home-button" style="margin:15px;" class="custom"> HOME</button>
  </div>

<div id="main-wrapper">
    <div id="patient-container"> 
          <div id="input-container">
          <input type="text" class="teeth-text-field" v-model="selectedID" list="pid"/>
          <datalist id="pid">
          <option v-for="options in patientIDS"  v-bind:key="options"> {{ options }}</option>
          </datalist>
          </div>
          <div id="submit">
          <button id="special" class="custom" @click="submit">Submit</button> 
          </div>
  </div>
    
    <div v-if="previewmode" id="preview-container">
      <div class="d-flex flex-column chart glass-container">
        <div class="d-flex flex-row">
          <div class="UpperJaw"  v-for="id in ids.slice(0,16)" :key="id">
            <button type="submit"  @click="clickTooth(id)"><img :id="id" :src="buttons[id].image" :title="buttons[id].title"/></button>
          </div>
        </div>
          <br/>
        <div class="d-flex flex-row">
          <div class="LowerJaw"  v-for="id in ids.slice(16,32)" :key="id">
            <button type="submit"  @click="clickTooth(id)"><img  :id="id" :src="buttons[id].image" :title="buttons[id].title"/></button>
          </div>
        </div>
      </div>
      
    </div>

    <div v-if="teethdata" >
      <TeethData  :patient="selectedID"  :teeth="teethinfo" ></TeethData>
    </div>
</div>

</template>

<script>


import sample from "@/assets/avatar.png";

import TeethData from "./TeethData.vue";


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
    components : {
      TeethData,
    },
    data(){
        return{

          teethinfo : -1,
          selectedID :"",
          allData: null,

          patientselectmode : true,
          previewmode:false,
          teethdata:false,

          patientIDS : [],


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
          previewImages: [],
          preview:noImage,
          avatar:sample,
          option: 'scan',
          diseaseDisplay:false,
          current_title:'',
          current_dis:'',
        }
    },
    methods:{

      submit() {

        console.log(this.teethinfo , this.selectedID);
        
        //need to validate
        this.patientselectmode = false;
        this.previewmode = true;
        this.teethdata = false;
        

     
        // axios.get(`http://localhost:8181/xray/getalldata`) // Changed URL to use template literal
        // .then(response => {
        //   console.log(response.data);
        // })
        // .catch(error => {
        //   console.error('Error:', error);
        // });
      },
      emithome() {
          this.$emit('home');
        },
        selectedOption(event) {
          this.option = event.target.value;

        },
        clickTooth(Id){
         //connect to the backend and display the images

         this.teethinfo = Id;
          this.previewmode=false
          this.teethdata =true

          console.log(this.teethinfo , this.selectedID);
        },
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
    },
}
</script>

<style scoped>
  *{
    margin:0%;
    padding:0%;
  }
 
#patient-container {
  display: flex;
  align-content: center;
  align-items: center; 
  justify-content: center;
  flex-grow: 0.25;
}

#preview-container {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-grow: 1;
}

#main-wrapper {
  display:flex;
  flex-direction: column;
  height : 100vh;
  align-items: center;
  align-content: center;
  justify-content: center;
}


#home-wrapper {
    display:block;
    width:100vw;
  }

#input-container {
    margin:10px;
}

#submit {
    margin:10px;
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


  body{
    color: whitesmoke;
    background-color:slategray;
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


  .custom {
    background-color: #808080; 
    color: #ffffff; 
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    transition: none;
    transform: none;
    cursor: pointer;
  }
  
  .custom:hover {
    background-color: #606060; 
    transform : none;
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