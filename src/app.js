import express from "express";
import NodeMailer from "nodemailer";
import cors from "cors";

import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
app.use(cors({ credentials: true, origin: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static("public"));

// app.get("/form-contact", (req, res) => {
//   res.sendFile(`${__dirname}/contact.html`);
// });

app.post("/contact-us", async (req, res) => {
  const data = req.body;

  const emailAddress = [
    "anhphuongtran01ql@gmail.com",
    // , "nhanvothanh719@gmail.com",
    // "n.yushi1992@gmail.com",
    // "gattsman@gmail.com",
  ];

  try {
    const transporter = NodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: "anhphuongtran0104ql@gmail.com",
        pass: "nbhkvqadslyqdfbn",
      },
    });

    const mailOptions = {
      from: "anhphuongtran0104ql@gmail.com",
      to: emailAddress,
      subject: "Confirm contact form",
      text: `
      Thanks for contacting with us!
      
      Below are some your information:

      Email: ${data.email}
      Name: ${data.name}
      Address: ${data.address}
      Phone number: ${data.phone}
      Zip code: ${data.zipCode}
      Inquiry content: ${data.inquiryContent}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Success!", info.messageId);
    res.send("Email has been sent successfully!");
  } catch (error) {
    console.error("Failed!", error);
    res.send("Email has been sent failed!");
  }
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
