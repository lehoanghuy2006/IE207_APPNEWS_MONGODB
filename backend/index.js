    const express = require('express');
    const mongoose = require('mongoose');
    const authRoute = require("./routes/auth");
    const userRoute = require("./routes/user")
   
   
   
    const app = express();
    const port = 3000;

    const uri = 'mongodb+srv://lehoanghuy2006:f3K5xkMpdpNDQ2LG@cluster0.goun8wf.mongodb.net/taikhoan';
    mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

    app.use(express.json());

//ROUTES
    app.use("/v1/auth", authRoute);
    app.use("/v1/user", userRoute);


    app.listen(port, () => {
        console.log(`Ứng dụng đang chạy trên cổng ${port}`);
    });

//JSON WEB TOKEN ( JWT )
    