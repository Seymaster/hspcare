const Workwithus = require("../models/Workwithus");
const { cloudinaryConfig, uploader } = require("../config/cloud");


function sendmail(){
    var raw = JSON.stringify({ "provider": "sendgrid",
    "subject": "Booking Completed",
    "recipients": [
        "alugbinoluwaseyi1@gmail.com"
    ],
    "header": {
        "title": "The Email Header",
        "bgColor": "",
        "appName": "MyApp",
        "appURL": "http://myapp.com",
        "appLogo": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
    },
    "content": "Inside Content: <br>Testing email attachment content<br> <p>KKD</p>",
    "body": {
        "content": "Inside Content: <br>Testing email content<br> <p>KKD</p>",
        "greeting": "Greetings,",
        "introLines": [
            "Introduction Line",
            "You can still add more intro"
        ],
        "outroLines": [
            "1. Content below button",
            "2. Still below button or rather main content"
        ]
    },
    "button": {
        "level": "success",
        "actionUrl": "https://google.com/hello",
        "actionText": "The Button text"
    },
    "attachments": [
        {
            "type":"url",
            "filename":"invoice.png",
            "data":"https://res.cloudinary.com/tm30global/image/upload/v1593685114/meygwiis1vnqgug6icnq.png"
        }
    ]});

    var requestOptions = {
    method: 'POST',
    headers:  {
                "Accept": "application/json",
                "Content-Type":"application/json",
                "client-id": "humber"
            },
    body: raw,
    redirect: 'follow'
    };

    fetch("https://staging.api.humbergames.com/notifications/v1/email",requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


exports.getAllWorkwithus = (req,res,next) =>{
    Workwithus.find()
    .then(data =>{
        if(data === null){
            res.status(200).send({
                status: 200,
                message: "No Workwithus yet"
            })
        }
        else{
            res.status(200).send({
                status: 200,
                message: "Workwithus Loaded Successfully",
                data: data
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            status: 500,
            message: "Error loading Workwithus",
            err: err
        })
    });
};

exports.postWorkwithus = (req,res,next)=>{
    const {fullName,gender,coverLetter} = req.body;
    const uploadfile = req.file.path
    uploader.upload(uploadfile).then((data) =>{
        let fileUrl = data.secure_url
        Workwithus.save({
            fullName: fullName,
            gender: gender,
            coverLetter:coverLetter,
            uploadResume: fileUrl
        })
        .then((result)=>{
            console.log(result);
            res.send({
                status: 200,
                message: "workwithus saved",
                result: result
            }),201
        })
        .catch((err)=>{
            console.log(err);
            res.status(422).send({
                status: 422,
                message: "error saving workwithus"+ err
            });
        });
    })
    .catch((err)=>{
        console.log(err);
        res.status(422).json(); 
    });
}