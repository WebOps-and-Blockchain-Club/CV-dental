const mongoose = require('mongoose');
const db = process.env.DATABASE;

const { Teeth, Patient } = require('./Model/xray'); 

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Create a new Teeth instance
const teeth = new Teeth({
  teethType: 'Molar',
  appointmentDate: new Date(),
  remark: 'No issues',
  teethId: 1,
  isXray: false,
  imageURL: 'http://example.com/image.jpg'
});

// Save the Teeth instance to the database
teeth.save()
  .then(() => console.log('Teeth saved'))
  .catch(err => console.error('Could not save teeth', err));

// Create a new Patient instance
const patient = new Patient({
  patientId:2,
  patientName:'John Dooo',
  teethDetails:[teeth] // you can also add multiple Teeth instances here
});

// Save the Patient instance to the database
patient.save()
  .then(() => console.log('Patient saved'))
  .catch(err => console.error('Could not save patient', err));