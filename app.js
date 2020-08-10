const express = require("express");
const app     = express();
const PORT    = process.env.PORT || 8080;
const logger  = require("morgan");
const cors    = require("cors");
const mongoose  = require("mongoose");
const config    = require("./config/mongocf");
const referralRouter = require("./routes/referral");
const workwithusRouter = require("./routes/workwithus");
require("dotenv").config();

mongoose.Promise = global.Promise;

app.listen(PORT,(err)=>{
    console.log(err)
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use("/api/v1", referralRouter);
app.use("/api/v1",workwithusRouter);

mongoose.connect(config.dbUrl,
    {useUnifiedTopology: true, useNewUrlParser: true}
)
.then(()=>{
    console.log("database connected")
})
.catch(err =>{
    console.log(err)
});

app.use((req,res,next)=>{
    return res.status(404).send({
        status: 404,
        message: "This API endpoint doesnt exist"
    })
})


