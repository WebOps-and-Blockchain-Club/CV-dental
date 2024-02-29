const mongoose = require("mongoose");

const teethSchema = new mongoose.Schema({
  teethType:{
    type:String,
    required:true
  },
<<<<<<< Updated upstream
  details : {
    type : "objects",
    default : {},
=======
  appointmentDate:{
    type:Date,
    required:true
  },
  remark:{
    type:String,
    required:true
  },
  teethId:{
    type:Number,
    required:true
  },
  isXray:{
    type:Boolean,
    required:true
  },
  imageURL:{
    type:String,
    required:true
>>>>>>> Stashed changes
  }
})

const patientSchema = new mongoose.Schema({
  patientId:{
    type:Number,
    required:true
  },
  patientName:{
    type:String,
    required:true
  },
  teethDetails:[teethSchema]
});

const Teeth = mongoose.model("TeethDetails", teethSchema);
const Patient = mongoose.model("PatientDetails", patientSchema)
module.exports = {
  Teeth,
  Patient
}