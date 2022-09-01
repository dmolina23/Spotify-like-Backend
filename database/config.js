const mongoose = require("mongoose")

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
        throw Error("Can't connect to db")
    }
}

module.exports = { connection }