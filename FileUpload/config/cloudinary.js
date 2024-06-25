const cloudinary = require("cloudinary").v2;

require("dotenv").config();

// config method ka use karke connection establish kr rhe application ka database ke saath

const cloudinaryConnect = () => {
    try{
        // cloudinary ke config method use karke connection establish kara dete hai
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
    }
    catch(error){
        console.log(error);
    }
};

module.exports = {cloudinaryConnect};

