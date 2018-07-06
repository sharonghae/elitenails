/**
 * Created by Sharon on 8/7/2016.
 */

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var reCAPTCHA = require('recaptcha2');

//get new appointment page
router.get('/', function(req, res, next){
   res.render('appointment', {
       title: 'Elite Nails | Willow Park, TX',
       errorMessage: null,
       successMessage: null,
       formDetails: {
           name: null,
           email: null,
           phone: null,
           date: null,
           numberOfPeople: null,
           message: null
       }
   });
});

router.post('/new', function (req, res, next) {
    //recaptcha set up
    var recap = new reCAPTCHA({
        siteKey: process.env.RECAPTCHA_SITE_KEY,
        secretKey: process.env.RECAPTHA_SECRET_KEY
    });

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    function sendConfirmation() {
        var options = {
            from: process.env.GMAIL_USER_FULL_NAME,
            to: req.body.email,
            subject: 'Appointment Confirmation',
            html: '<p>Hello. This e-mail is to confirm your appointment made at ' + new Date().toDateString() + ' from ' + req.connection.remoteAddress + '.</p>' +
                '<p>Please feel free to come by at the requested time. If there are any problems, we will contact you. See you soon!</p>' +
                '<hr />' +
                '<p><strong>Name:</strong> ' + req.body.name + '</p>' +
                '<p><strong>Email:</strong> ' + req.body.email + '</p>' +
                '<p><strong>Phone:</strong> ' + req.body.phone + '</p>' +
                '<p><strong>Date:</strong> ' + req.body.date + '</p>' +
                '<p><strong>Time:</strong> ' + req.body.time + '</p>' +
                '<p><strong>People:</strong> ' + req.body.numberOfPeople + '</p>' +
                '<p><strong>Comments:</strong> ' + req.body.message + '</p>' +
                '<p>-Elite Nails Team</p>'
        };

        transporter.sendMail(options, function(error, info) {
           //do nothing
        });
    }

    function sendEmail() {
        var options = {
            from: process.env.GMAIL_USER_FULL_NAME,
            to: process.env.APPOINTMENT_RECIEVER,
            subject: '[ELITE NAILS] New appointment from ' + req.body.name,
            // text: 'ttteeessssssssssssstttttt Name: ' + req.body.name +
            // '\nEmail: ' + req.body.email +
            // '\nMessage: ' + req.body.message,
            html: '<p><strong>Name:</strong> ' + req.body.name + '</p>' +
                '<p><strong>Email:</strong> ' + req.body.email + '</p>' +
                '<p><strong>Phone:</strong> ' + req.body.phone + '</p>' +
                '<p><strong>Date:</strong> ' + req.body.date + '</p>' +
                '<p><strong>Time:</strong> ' + req.body.time + '</p>' +
                '<p><strong>People:</strong> ' + req.body.numberOfPeople + '</p>' +
                '<p><strong>Comments:</strong> ' + req.body.message + '</p>'
        };

        transporter.sendMail(options, function(error, info){
            if(error) {
                console.log(error);
                //res.redirect('/');
            } else {
                console.log("Message sent: " + info.response);
                //res.redirect('/');
                res.render('appointment', {
                    title: 'Elite Nails | Willow Park, TX',
                    errorMessage: null,
                    successMessage: 'Appointment booked! We will see you soon.',
                    formDetails: {
                        name: null,
                        email: null,
                        phone: null,
                        date: null,
                        numberOfPeople: null,
                        message: null
                    }
                });
            }
        });
    }

    //validate form request
    recap.validateRequest(req).then(function(){
        //validation success! :)
        if(req.body.email)
            sendConfirmation();
        
        sendEmail();
    }).catch(function(errorCodes){
        res.render('appointment', {
            title: 'Elite Nails | Willow Park, TX',
            errorMessage: "Sorry, we couldn't verify that you are are not a robot. Try again.",
            successMessage: null,
            formDetails: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                date: req.body.date,
                numberOfPeople: req.body.numberOfPeople,
                message: req.body.message
            }
        });
    });
});

module.exports = router;
