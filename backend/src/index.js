require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app")
const PORT = process.env.PORT;
let server;




mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(async()=> {
    console.log("MongoDB connected")
    server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err)=>console.log("MongoDB connection error"+ err))


