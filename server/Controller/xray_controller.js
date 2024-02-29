const {Patient,Teeth} = require("../Model/xray");

const processFile = require("../Utils/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("cvteam");

//add the patient data 
module.exports.addPatient = async function (req, res) {
  try {
    await processFile(req, res);
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data) => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        await bucket.file(req.file.originalname).makePublic();
      } catch {
        return res.status(500).send({
          message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
          url: publicUrl,
        });
      }
      const newTeeth = new Teeth({
        teethType:req.body.teethType,
        appointmentDate:req.body.appointmentDate,
        remark:req.body.remark,
        teethId:req.body.teethId,
        isXray:req.body.isXray,
        imageURL:publicUrl
      })
      const newPatient = new Patient({
        patientName: req.body.name,
        patientId:req.body.patientId,
        teethDetails:newTeeth
      })
      newPatient.save()
      return res.status(200).json({
        success: true,
        data: newPatient,
        message: "File uploaded Succesfully and Xray-img added!",
      });
    });
    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

//get the patient data
module.exports.getAllPatients = async function (req, res) {
  try {
    let patient = await Patient.find({});
    return res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (err) {
    console.log("Error in getting all patient data: " + err);
  }
};

module.exports.downloadXray = async function (req, res) {
  try {
    const [metaData] = await bucket.file(req.params.name).getMetadata();
    res.redirect(metaData.mediaLink);
  } catch (err) {
    console.log("Error in downloading xray: " + err);
  }
};

module.exports.dummyApi = async (req, res) => {
  console.log("working")
  res.status(200).send({
    urls: [
      "https://source.unsplash.com/user/c_v_r/1900x800",
      "https://source.unsplash.com/user/c_v_r/100x100",
      "https://picsum.photos/id/237/200/300",
    ],
  });
};
