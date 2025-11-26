// microservices/notification-service/src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sendEmail } from './email';
import { sendSMS } from './sms';
import { sendWebPush, sendExpoPush } from './push';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 50055; // Notification Service Port

app.use(bodyParser.json());

// Email Endpoint
app.post('/email', async (req, res) => {
  const { to, subject, html } = req.body;
  try {
    const result = await sendEmail(to, subject, html);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// SMS Endpoint
app.post('/sms', async (req, res) => {
  const { to, message } = req.body;
  try {
    const result = await sendSMS(to, message);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Push Endpoint
app.post('/push', async (req, res) => {
  const { type, target, message, data } = req.body; // type: 'web' | 'mobile'
  
  try {
    if (type === 'web') {
      // target = subscription object
      const result = await sendWebPush(target, { title: 'Archetype', body: message, ...data });
      res.json(result);
    } else if (type === 'mobile') {
      // target = array of tokens
      const result = await sendExpoPush(target, message, data);
      res.json(result);
    } else {
      res.status(400).json({ error: 'Invalid push type' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});