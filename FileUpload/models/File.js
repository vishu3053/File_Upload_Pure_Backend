const mongoose = require("mongoose");
// import transporter from config > transporter
let transporter = require("../config/transporter");

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String
    },
    tags:{
        type: String
    },
    email:{
        type: String
    }
});

// Context: Sending MAIL just after creating or saving Entry in the Database 

// keep in mind: mongoose.model se pehle jo bhi middleware create krna hai krlena varna
// uske baad call krenge toh nhi work krega 

// post middleware -> invokes just after creation of Entry in DB
fileSchema.post("save", async function(doc){
    try{
        console.log("Doc", doc);

        // create transporter object using nodemailer

        // send mail
        let info = await transporter.sendMail({
            from: `Vishwash`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h2> Hello! </h2> <p> File Uploaded... View here: <a href= "${doc.imageUrl}">${doc.imageUrl}</a></p>`
        });

        console.log("Info -> ", info);
    }
    catch(error){
        console.error(error);
    }
});


const File = mongoose.model("File", fileSchema);
module.exports = File;