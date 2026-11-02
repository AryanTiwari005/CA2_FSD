require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const feedbackRoutes = require("./Routes/feedbackroutes");
const connectDB = require("./db");

connectDB();
const app = express();

app.use(express.json());

app.use("/api", feedbackRoutes);

app.listen(port, () => {
    console.log(`server is running on the port ${port}`);
});
