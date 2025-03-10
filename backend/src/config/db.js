const mongoose = require("mongoose");
const diotenv = require("dotenv");

diotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            userNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected");
    }catch (error) {
        console.error("error al conectar MongoDB", error);
        process.exit(1);
    }
};

module.exports = connectDB;