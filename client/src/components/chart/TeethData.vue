<template>

    <div id="main-wrapper">
    
        <button id="prev" @click="prev"> <img src="./chevron-left.svg" height="50px" width="50px"> </button>
        <div  id="item">
            <div style="display:flex; align-items:center; justify-content:center;">
            <img id="images" src="imagesrc">
            <div id="images">
            <div id="date"> <h1>{{ toothcurrdate }} </h1></div>
            <div id="toothID">{{ toothcurrID}} </div>
            <div id="remark"> {{ toothcurrremark }}</div>
            </div>
            </div>
        </div>
    
        <button id="next" @click="next"> <img src="./chevron-right.svg" height="50px" width="50px">  </button>
    </div>
    
    
    </template>
    
    <script>
    
    const axios = require('axios');
    
    export default {
        name: "TeethData",
        props : {
            patient : String,
            teeth : String,
        },
        data () {
            return {
                r : 0,

            toothdetail : [ { 
                teethType : "teeth-type1" , 
                appointmentDate : "0000-00-00" ,
                remark : "this is doctor remark for 1",
                teethId : 1111,
                isXray : 0,
                imageURL : "string",  
            } ,
            
            { 
                teethType : "teeth-type2" , 
                appointmentDate : "0000-10-00" ,
                remark : "this is doctor remark for 2",
                teethId : 1122,
                isXray : 1,
                imageURL : "string",  
            } ,
            
            { 
                teethType : "teeth-type3" , 
                appointmentDate : "0000-00-10" ,
                remark : "this is doctor remark for 3",
                teethId : 1133,
                isXray : 0,
                imageURL : "string",  
            } 
        ],
    
        imagesrc : "",
        toothcurrID : "",
        toothcurrdate : "",
        toothcurrremark :"",
    
            ImageCount : 0,  
        }
    }
        ,
        methods: {
            prev() {
                this.r = Math.max((this.r - 1 ) ,0)
                this.updateCurrentTeethData();
            },
            next() {
                this.r = Math.min( (this.r + 1) ,this.toothdetail.length-1 )
                this.updateCurrentTeethData();
            },
            updateCurrentTeethData() {
                this.imagesrc = this.toothdetail[this.r].imageURL;
                this.toothcurrID = this.toothdetail[this.r].teethId;
                this.toothcurrdate = this.toothdetail[this.r].appointmentDate;
                this.toothcurrremark = this.toothdetail[this.r].remark;
            }
        },
        created() {
            this.updateCurrentTeethData();
            console.log(this.patient);
            console.log(this.teeth);

            axios.get(`mongodb+srv://CVdental:cvdental@cvdental.wikfuon.mongodb.net/patient/xray/getteethdetails/:${this.patient}/:${this.teeth}`) // Changed URL to use template literal
        .then(response => {
          console.log(response.data);
          this.toothdetail = response.data;
        })
        .catch(error => {
          console.error('Error:', error);
        });
        }
    };
    
    
    
    </script>
    
    <style scoped>
    
    #main-wrapper {
        display: flex;
        flex-direction: row !important ; 
        align-content: center;
        align-items: center;
        width : 100vw;

    }
    
    #item {
        width: 80vw;
        flex-grow : 1;
        display: inline-block;
        color:aliceblue
    }

    #next,#prev {
        display: inline-block;
        margin:15px;
    }
    
    
    #images {
        display: inline-block;
        width : 25%;
        height: inherit;
        margin:10px;
    }

    
    </style>