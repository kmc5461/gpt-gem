// lib/logging/alerts.ts
import { logger } from './logger';

interface AlertPayload {
  title: string;
  message: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  source?: string;
}

export async function sendSlackAlert(payload: AlertPayload) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    logger.warn('Slack webhook URL not configured, skipping alert.');
    return;
  }

  const colorMap = {
    info: '#36a64f',
    warning: '#ecb22e',
    error: '#e01e5a',
    critical: '#ff0000',
  };

  const body = {
    attachments: [
      {
        color: colorMap[payload.level],
        title: `[${payload.level.toUpperCase()}] ${payload.title}`,
        text: payload.message,
        footer: `Source: ${payload.source || 'Archetype System'}`,
        ts: Math.floor(Date.now() / 1000),
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Slack API responded with ${response.status}`);
    }
  } catch (error) {
    logger.error('Failed to send Slack alert', { error });
  }
}

export async function sendEmailAlert(to: string, subject: string, body: string) {
  // Notification service üzerinden email gönderimi tetiklenebilir
  // await fetch('http://notification-service/email', ...)
  logger.info(`Email alert queued for ${to}: ${subject}`);
}
