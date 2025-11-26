// microservices/notification-service/src/push.ts
import webpush from 'web-push';
import { Expo } from 'expo-server-sdk';

// Web Push Config
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    'mailto:admin@archetype.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

// Expo SDK Client
const expo = new Expo();

export const sendWebPush = async (subscription: any, payload: any) => {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return { success: true, type: 'web' };
  } catch (error) {
    console.error('Web Push Error:', error);
    throw error;
  }
};

export const sendExpoPush = async (pushTokens: string[], message: string, data?: any) => {
  const messages = [];
  for (let pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken,
      sound: 'default',
      body: message,
      data: data || {},
    });
  }

  try {
    // Chunking (Expo limiti gereği)
    let chunks = expo.chunkPushNotifications(messages as any);
    let tickets = [];
    for (let chunk of chunks) {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
    }
    return { success: true, type: 'mobile', tickets };
  } catch (error) {
    console.error('Expo Push Error:', error);
    throw error;
  }
};