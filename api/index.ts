import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({ path: path.resolve(process.cwd(), '..', '.env.local') });

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rubensgalani@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD
    }
});

app.post('/mail', (req, res) => {
    const { name, email, message } = req.body;

    if (
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof message !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        return res.status(400).json({ ok: false, message: 'Error: Invalid payload' });
    }

    try {
        transport.sendMail({
            from: `Portfolio <rubensgalani@gmail.com>`,
            to: "rubensgalani@gmail.com",
            replyTo: email,
            subject: `Portfolio contact from ${name}`,
            text: message
        })
        return res.status(200).json({ ok: true, message: "Message sent" })
    }
    catch (err: any) {
        return res.status(500).json({ ok: false, message: "Error: Server error" })
    }
})