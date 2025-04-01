require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT;
console.log(process.env.MONGO_URI);  
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => console.error("MongoDB connection error:", err));

// Graceful shutdown
process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("MongoDB connection closed due to app termination");
        process.exit(0);
    });
});
