import nodemailer from "nodemailer";
import asyncHandler from "../middlewares/asyncHandler.js";

// Send email for contact messages
const sendEmail = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "qdorehome@gmail.com",
      pass: "bLCtWXm5jypDTAh8", // Use your SMTP Master Password
    },
  });

  const mailOptions = {
    from: "qdorehome@gmail.com",
    to: "202252316@iiitvadodara.ac.in",
    subject: "New Contact Message",
    html: `<p>New message from: <strong>${name}</strong></p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

// Confirmation email route
const sendConfirmationemail = asyncHandler(async (req, res) => {
  const { email, username, address, amount, paymentMethod } = req.body;

  // Initialize transporter inside this function
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "qdorehome@gmail.com",
      pass: "bLCtWXm5jypDTAh8", // Use your SMTP Master Password
    },
  });

  // Email options
  const mailOptions = {
    from: "qdorehome@gmail.com",
    to: email,
    subject: "Order Confirmation",
    html: `
      <h1>Order Confirmation</h1>
      <p>Thank you, ${username}, for your order!</p>
      <p>Order Details:</p>
      <ul>
        <li>Address: ${address}</li>
        <li>Amount: ${amount}</li>
        <li>Payment Method: ${paymentMethod}</li>
      </ul>
      <p>Your order will be delivered to you soon!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Order confirmation email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email: " + error.message });
  }
});

export { sendEmail, sendConfirmationemail };
