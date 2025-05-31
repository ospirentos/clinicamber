import express, { Request, Response } from "express";
import nodemailer from "nodemailer";

const app = express();
const port = 1338;

app.use(express.json());

// Health check endpoint for Docker container monitoring
app.get("/health", (req: Request, res: Response): void => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    service: "mail-sender",
    version: process.env.npm_package_version || "1.0.0",
    environment: process.env.NODE_ENV || "development",
  };

  try {
    // Check if required environment variables are present
    const {
      MAIL_SENDER_HOST,
      MAIL_SENDER_PORT,
      MAIL_SENDER_USERNAME,
      MAIL_SENDER_PASSWORD,
    } = process.env;

    if (
      !MAIL_SENDER_HOST ||
      !MAIL_SENDER_PORT ||
      !MAIL_SENDER_USERNAME ||
      !MAIL_SENDER_PASSWORD
    ) {
      healthCheck.message =
        "Configuration Error - Missing required environment variables";
      res.status(503).json(healthCheck);
      return;
    }

    res.status(200).json(healthCheck);
  } catch (error) {
    healthCheck.message = "Service Unavailable";
    res.status(503).json(healthCheck);
  }
});

app.post("/sendInfoMail", async (req: Request, res: Response): Promise<void> => {
  const { nameSurname, phoneNumber, message } = req.body;

  if (!nameSurname || !phoneNumber || !message) {
    res
      .status(400)
      .send("All fields are required: nameSurname, phoneNumber, and message.");
    return;
  }

  try {
    const {
      MAIL_SENDER_HOST,
      MAIL_SENDER_PORT,
      MAIL_SENDER_USERNAME,
      MAIL_SENDER_PASSWORD,
    } = process.env;
    if (
      MAIL_SENDER_HOST &&
      MAIL_SENDER_PORT &&
      MAIL_SENDER_USERNAME &&
      MAIL_SENDER_PASSWORD
    ) {
      const transporter = nodemailer.createTransport({
        host: MAIL_SENDER_HOST,
        port: parseInt(MAIL_SENDER_PORT),
        secure: true,
        auth: {
          user: MAIL_SENDER_USERNAME,
          pass: MAIL_SENDER_PASSWORD,
        },
      });

      const mailOptions = {
        from: MAIL_SENDER_USERNAME,
        to: MAIL_SENDER_USERNAME,
        subject: `${nameSurname} adlı kullanıcıdan mesajınız var`,
        text: `Telefon Numarası: ${phoneNumber}\n Kullanıcının Mesajı: ${message}`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      res.status(200).send("Information received and email sent successfully.");
    } else {
      throw "unknown-error";
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
