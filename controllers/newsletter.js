const NewsletterModel = require("../models/Newsletter");
const fetch  = require("node-fetch");


function sendmail(recipient){
    var raw = JSON.stringify({ "provider": "sendgrid",
    "subject": "Booking Completed",
    "recipients": [
        recipient
    ],
    "header": {
        "title": "You have subscribed to newsletter",
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


exports.getAllNewsletter = (req,res,next)=>{
    NewsletterModel.find()
    .then(data =>{
        if(data === null){
            res.status(200).send({
                status: 200,
                message: "No subscriber yet"
            })
        }
        else{
            res.status(200).send({
                status: 200,
                message: "Subscriber Loaded Successfully",
                data: data
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            status: 500,
            message: "Error loading Subscribers",
            err: err
        })
    });
};

exports.postNewsletter = (req,res,next) =>{
    const {email} = req.body;
    const newsLetter = NewsletterModel({email});
    newsLetter.save((err,data)=>{
        if(err){
            if (err.code == 11000) {
                let error = err['errmsg'].split(':')[2].split(' ')[1].split('_')[0];
                res.status(500).send({
                    message: `${error} saved already`,
                    status: 11000,
                    error: err
                });
                return false;
            }
            res.status(500).send({
                status:500,
                message:"Could not save Subscriber"
            });
        }
        else{
            // console.log(data)
            sendmail(data.email);
            res.status(200).send({
                status:200,
                message: "Subscriber saved successfully",
                data: data
            });
        }
    });
};