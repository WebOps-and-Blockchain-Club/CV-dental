const Xray = require("../Model/xray");
const multer = require('multer');
const path = require('path');
const fs = require("fs");


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../Client/public/Xray-images'),
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single("xray-img");

module.exports.addXray = async function (req, res) {
    try {
        var newXray;
        upload(req, res, (err) => {
            if (!req.file) {
                return res.status(404).json({
                    message: "File not found",
                });
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            let fileName = req.file.filename;

            newXray = new Xray({
                title: req.body.title,
                xray_url: "./Xray-images/" + fileName,
                patient_id: req.body.patient_id
            });
            newXray.save();
            return res.status(200).json({
                success: true,
                data: newXray,
                message: "Xray-img added!",
            });
        })
    }
    catch (err) {
        console.log("Error in adding XrayImg: " + err)
    }
};

module.exports.editXray = async function (req, res) {
    const xray = await Xray.findById(req.query.xray_id);
    try {
        upload(req, res, (err) => {
            if (!req.file) {
                xray.title = req.body.title;
                xray.save();
                return res.status(200).json({
                    success: true,
                    message: "Xray-img edited!",
                });
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            console.log("kru");
            let fileName = req.file.filename;
            if (xray.xray_url != "") {
                try {
                    fs.unlinkSync(path.join(__dirname, "../../Client/public/", xray.xray_url.slice(1)));
                    console.log("Xray-img removed");
                } catch (err) {
                    console.error(err);
                }
            }
            xray.title = req.body.title;
            xray.xray_url = "./Xray-images/" + fileName;
            xray.save();
            return res.status(200).json({
                success: true,
                message: "Xray-img edited!",
            });
        })
    }
    catch (err) {
        console.log("Error in editing Xray-img: " + err)
    }
};

module.exports.deleteXray = async function (req, res) {
    try {
        const xray_id = req.query.xray_id;
        const xray = await Xray.findById(xray_id);
        if (xray) {
            try {
                fs.unlinkSync(path.join(__dirname, "../../Client/public/", xray.xray_url.slice(1)));
            } catch (err) {
                console.error(err);
            }
        }
        else{
            return res.status(404).json({
                message: "Xray-img not found"
            })
        } 
        await xray.delete();

        return res.status(200).json({
            success: true,
            message: "Xray deleted!",
        });
    }
    catch (err) {
        console.log("Error in deleting Xray: " + err)
    }
};


module.exports.getAllXray = async function (req, res) {
    try {
        let xray = await Xray.find({});
        return res.status(200).json({
            "success": true,
            "data": xray
        })
    }
    catch (err) {
        console.log("Error in getting all xray: " + err)
    }
}

module.exports.getXrayByID = async function (req, res) {
    try {
        const xray_id = req.query.xray_id;
        const xray = await Xray.findById(xray_id);
        if(xray){
            return res.status(200).json({
                "success": true,
                "data": xray
            })
        }
        else{
            return res.status(404).json({
                message: "Xray-img not found"
            })
        }
    } catch (err) {
        console.log("Error in getting xray: " + err)
    }
}