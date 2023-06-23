require("dotenv").config();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("node:path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.set("views", path.join(__dirname));
app.set("view engine", "hbs");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "./views",
      defaultLayout: "index",
    },
    viewPath: "./views",
    extName: ".handlebars",
  })
);

const PORT = process.env.PORT;

// const dayArr = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

app.post("/send-mail", (req, res) => {
  // const { toMail, subject, fileName, filePath, messageBody, schedule } =
  //   req.body;
  // const cronStr = "";
  // const { day, date } = schedule;

  // dayArr.includes(req.body.day) ? cronStr.concat(`* * * ${day}`) : cronStr;
  // date && cronStr.concat(`* * ${date}`);
  let mailOptions = {
    from: process.env.MAIL,
    to: req.body.toMail,
    subject: "",
    text: "",
    attachments: [{ path: req.body.filePath }],
    template: "index",
    context: {
      name: "namd",
    },
  };

  // console.log(req.body.toMail);
  console.log(
    `sending mail on ${req.body.schedule.date} or ${req.body.schedule.day} `
  );

  cron.schedule(
    `* * ${req.body.schedule.date || "*"} * ${req.body.schedule.day || "*"}`,
    () =>
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          res.status(501).send("mail-not-sent");
          console.log("Error sending mail", err);
        } else {
          res.status(200).send("mail-sent");
          console.log(
            `sent mail on ${req.body.schedule.date} or ${req.body.schedule.day} `
          );
        }
      })
  );
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
