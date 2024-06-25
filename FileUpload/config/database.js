const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewURLParser: true,
        useUnifiedTopology: true
    })
    .then( () => console.log("Connection with DB Successful") )
    .catch( (err) => {
        console.log("DB Connection Issues");
        console.log(err);
        process.exit(1);
    })
}

module.exports = {dbConnect};