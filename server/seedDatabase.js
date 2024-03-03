const mongoose = require('mongoose');
const db ="mongodb+srv://CVdental:cvdental@cvdental.wikfuon.mongodb.net/patient";

const { Teeth, Patient } = require('./Model/xray'); 

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Create a new Teeth instance

async function seed () {
for (var r=1000; r<1010;r+=1) {
  for (var e = 0 ; e<32;e+=1) {

    console.log ( r,e);
    const teeth = new Teeth({
      teethType: 'Molar',
      appointmentDate: new Date(),
      remark: 'No issues',
      teethId: e,
      isXray: false,
      imageURL: 'http://example.com/image.jpg'
    });

    // Save the Teeth instance to the database
    await teeth.save()
      .then(() => console.log('Teeth saved'))
      .catch(err => console.error('Could not save teeth', err));

    // Create a new Patient instance

    const patient = new Patient({
      patientId:r,
      patientName:'John Dooo' + toString(r) ,
      teethDetails:[teeth] // you can also add multiple Teeth instances here
    });

    // Save the Patient instance to the database
   await patient.save()
      .then(() => console.log('Patient saved'))
      .catch(err => console.error('Could not save patient', err));
  }
}

}

seed();