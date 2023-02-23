import cheerio from 'cheerio';    // Import the cheerio library to parse HTML content
import nodemailer from 'nodemailer';    // Import the nodemailer library to send emails
import axios from 'axios';    // Import the axios library to make HTTP requests

const url = "https://nodemailer.com/about/";    // The URL to scrape for email content

// Make an HTTP GET request to the URL using axios
axios.get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);    // Load the HTML content of the response into cheerio
    const featureList = $("#body-inner ul").html();    // Extract the feature list using cheerio
    console.log(featureList);    // Log the feature list to the console

    // Create a nodemailer transporter object to send emails
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io", // Enter whatever host you're using
      port: 2525,
      auth: {
        user: "z-orsvf5@mailtrap.io", // Enter whatever test email is provided to you
        pass: "your_mailtrap_password_mail", // enter whatever test password is provided to you
      },
    });

    // Create an email message using nodemailer
    const mailOptions = {
      from: "z-orsvf5@mailtrap.io", // enter whatever outbound test email is provided to you
      to: "z-orsvf5@developermail.com", // enter whatever inbound test email is provided to you
      subject: "Nodemailer Features",
      html: featureList,
    };

    // Send the email using the transporter object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {    // If an error occurred while sending the email
        console.log(error);    // Log the error to the console
      } else {    // If the email was sent successfully
        console.log("Email sent: " + info.response);    // Log the response message to the console
      }
    });
  })
  .catch((error) => {    // If an error occurred during the HTTP GET request
    console.log(error);    // Log the error to the console
  });