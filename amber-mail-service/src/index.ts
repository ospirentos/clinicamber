import express from 'express';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// @ts-ignore
app.post('/sendInfoMail', async (req: Request, res: Response) => {
  const { nameSurname, phoneNumber, message } = req.body;

  if (!nameSurname || !phoneNumber || !message) {
    return res.status(400).send('All fields are required: nameSurname, phoneNumber, and message.');
  }

  try {
    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      host: 'mail.clinicamber.com', // Email server host
      port: 465, // Port for secure SMTP
      secure: true, // Use TLS
      auth: {
        user: 'examplemail', // Replace with your email username
        pass: 'examplepw', // Replace with your email password
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'examplemail', // Sender address
      to: 'example receiver', // Replace with the recipient's email address
      subject: 'This is a Test Mail',
      text: `Name-Surname: ${nameSurname}\nPhone: ${phoneNumber}\nMessage: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).send('Information received and email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});