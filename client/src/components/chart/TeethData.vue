<template>

    <div id="main-wrapper">
    
        <button id="prev" @click="prev">PREVIOUS</button>
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
    
        <button id="next" @click="next">NEXT</button>
    </div>
    
    
    </template>
    
    <script>
    
    
    
    export default {
        name: "TeethData",
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
                this.r = (this.r - 1 + this.toothdetail.length) % this.toothdetail.length;
                this.updateCurrentTeethData();
            },
            next() {
                this.r = (this.r + 1) % this.toothdetail.length;
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
    }

    #next,#prev {
        display: inline-block;
        margin:15px;
    }
    
    
    #images {
        display: inline-block;
        width : 25%;
        height: inherit;
    }

    
    </style>