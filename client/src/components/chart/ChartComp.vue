<template>
    <h1>Dental Chart</h1>
  <div id="app">
    <div class="UpperJaw">
      <button type="submit" @click="clickTooth"><img :src="tpu1" title="Tooth 1"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu2" title="Tooth 2"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu3" title="Tooth 3"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu4" title="Tooth 4"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu5" title="Tooth 5"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu6" title="Tooth 6"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu7" title="Tooth 7"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu8" title="Tooth 8"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu9" title="Tooth 9"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu10" title="Tooth 10"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu11" title="Tooth 11"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu12" title="Tooth 12"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu13" title="Tooth 13"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu14" title="Tooth 14"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu15" title="Tooth 15"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpu16" title="Tooth 16"/></button>
    </div>
    <div class="LowerJaw">
      <button type="submit" @click="clickTooth"><img :src="tpd32" title="Tooth 32"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd31" title="Tooth 31"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd30" title="Tooth 30"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd29" title="Tooth 29"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd28" title="Tooth 28"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd27" title="Tooth 27"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd26" title="Tooth 26"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd25" title="Tooth 25"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd24" title="Tooth 24"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd23" title="Tooth 23"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd22" title="Tooth 22"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd21" title="Tooth 21"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd20" title="Tooth 20"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd19" title="Tooth 19"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd18" title="Tooth 18"/></button>
      <button type="submit" @click="clickTooth"><img :src="tpd17" title="Tooth 17"/></button>
    </div>
  </div>

</template>

<script>

import tooth1 from "../../assets/Teeth_set/1.png";
import tooth2 from "../../assets/Teeth_set/2.png";
import tooth3 from "../../assets/Teeth_set/3.png";
import tooth4 from "../../assets/Teeth_set/4.png";
import tooth5 from "../../assets/Teeth_set/5.png";
import tooth6 from "../../assets/Teeth_set/6.png";
import tooth7 from "../../assets/Teeth_set/7.png";
import tooth8 from "../../assets/Teeth_set/8.png";
import tooth9 from "../../assets/Teeth_set/9.png";
import tooth10 from "../../assets/Teeth_set/10.png";
import tooth11 from "../../assets/Teeth_set/11.png";
import tooth12 from "../../assets/Teeth_set/12.png";
import tooth13 from "../../assets/Teeth_set/13.png";
import tooth14 from "../../assets/Teeth_set/14.png";
import tooth15 from "../../assets/Teeth_set/15.png";
import tooth16 from "../../assets/Teeth_set/16.png";
import tooth17 from "../../assets/Teeth_set/32.png";
import tooth18 from "../../assets/Teeth_set/31.png";
import tooth19 from "../../assets/Teeth_set/30.png";
import tooth20 from "../../assets/Teeth_set/29.png";
import tooth21 from "../../assets/Teeth_set/28.png";
import tooth22 from "../../assets/Teeth_set/27.png";
import tooth23 from "../../assets/Teeth_set/26.png";
import tooth24 from "../../assets/Teeth_set/25.png";
import tooth25 from "../../assets/Teeth_set/24.png";
import tooth26 from "../../assets/Teeth_set/23.png";
import tooth27 from "../../assets/Teeth_set/22.png";
import tooth28 from "../../assets/Teeth_set/21.png";
import tooth29 from "../../assets/Teeth_set/20.png";
import tooth30 from "../../assets/Teeth_set/19.png";
import tooth31 from "../../assets/Teeth_set/18.png";
import tooth32 from "../../assets/Teeth_set/17.png";


export default
{
    name:'ChartComp',
    data(){
        return{
            tpu1 :tooth1,
            tpu2 :tooth2,
            tpu3 :tooth3,
            tpu4 :tooth4,
            tpu5 :tooth5,
            tpu6 :tooth6,
            tpu7 :tooth7,
            tpu8 :tooth8,
            tpu9 :tooth9,
            tpu10 :tooth10,
            tpu11 :tooth11,
            tpu12 :tooth12,
            tpu13 :tooth13,
            tpu14 :tooth14,
            tpu15 :tooth15,
            tpu16 :tooth16,
            tpd32:tooth32,
            tpd31:tooth31,
            tpd30:tooth30,
            tpd29:tooth29,
            tpd28:tooth28,
            tpd27:tooth27,
            tpd26:tooth26,
            tpd25:tooth25,
            tpd24:tooth24,
            tpd23:tooth23,
            tpd22:tooth22,
            tpd21:tooth21,
            tpd20:tooth20,
            tpd19:tooth19,
            tpd18:tooth18,
            tpd17:tooth17,
        }
    },
    methods:{
        clickTooth(){
            this.$emit('scan')
        }
    }
}
</script>

<style scoped>
  *{
    margin:0%;
    padding:0%;
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

  div .UpperJaw{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px;
  }

  div .LowerJaw{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px;
  }

  body{
    color: whitesmoke;
    background-color:slategray;
  }

  h1{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px;
    background-color: rgb(46, 50, 71);
    color: aliceblue;
    border-radius: 5px;
    font: 1.6rem/1.25 "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

</style>