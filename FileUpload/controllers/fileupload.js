// Server ke andar ek directory ke andar MEDIA Store/Upload krna sikh rahe hai

const cloudinary = require("cloudinary").v2;

// import the Model
const File = require("../models/File");

// localfileupload -> handler function
exports.localFileUpload = async(req, res) => {
    try{
        // 1) fetch file from request
        const file = req.files.file;
        console.log("Printing file content: " , file);
        
        // 2) kiss path pe file ko store krna chahte hai server pe?
        // create path where file needs to be stored on server

        // controller ke andar files naam ka folder rkha hua hai
        // yeh path server ka path hai -> qki file server m upload/store krna chahte hai 
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path -> ", path);

        // 3) jo file request mae send kari thi usse move kara dia hai server ke ek particular path pe
        // add path to move function 
        file.mv(path, (error) => {
            console.log(error);
        });


        // 4) create a successful response 
        res.json({
            success: true,
            message: "Local File Uploaded Successfully"
        });
    }
    catch(error){
        console.log(error);
    }
}

// to check is type exists in SupportedTypes or not!
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

// upload file to cloudinary
async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload ka handler
exports.imageUpload = async(req, res) => {
    try{
        // 1) data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        // req.files.fileName
        const file = req.files.imageFile;
        console.log(file);

        // 2) Validation
        const supportedTypes = ["jpg", "jpeg", "png"]; // -> yeh files supported hai 
        // khud ki file ka type nikalna chahte hai
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // file format supported hai
            // - upload to cloudinary
            // - db save
            // - return successful response


        const response = await uploadFileToCloudinary(file, "Vishwash");
        console.log("Response: ", response);

        // db m entry save krni hai
        const fileData = await File.create({
            name,
            tags, 
            email,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully Uploaded"
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}



// video upload handler 
exports.videoUpload = async(req, res) => {
    try{
        // 1) data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        // req.files.fileName
        const file = req.files.videoFile;
        console.log(file);


        // 2) Validation
        const supportedTypes = ["mp4", "mov"]; // -> yeh files supported hai 
        // khud ki file ka type nikalna chahte hai
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // file format supported hai
            // - upload to cloudinary
            // - db save
            // - return successful response


            const response = await uploadFileToCloudinary(file, "Vishwash");
            console.log(response);
    
            // db m entry save krni hai
            const fileData = await File.create({
                name,
                tags, 
                email,
                imageUrl: response.secure_url
            });
    
            res.json({
                success: true,
                imageUrl: response.secure_url,
                message: "Video Successfully Uploaded"
            })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}



// Image Reducer Upload Handler
exports.imageReducerUpload = async(req, res) => {
    try{
        // 1) data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        // req.files.fileName
        const file = req.files.imageFile;
        console.log(file);

        // 2) Validation
        const supportedTypes = ["jpg", "jpeg", "png"]; // -> yeh files supported hai 
        // khud ki file ka type nikalna chahte hai
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // file format supported hai
            // - upload to cloudinary
            // - db save
            // - return successful response


        const response = await uploadFileToCloudinary(file, "Vishwash", 30);
        console.log(response);

        // db m entry save krni hai
        const fileData = await File.create({
            name,
            tags, 
            email,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully Uploaded"
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
}