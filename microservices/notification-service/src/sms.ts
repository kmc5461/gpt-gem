// microservices/notification-service/src/sms.ts

// SMS Provider Interface (Twilio/NetGSM uyumlu iskelet)
interface SMSProvider {
  send(to: string, message: string): Promise<any>;
}

const netgsmProvider: SMSProvider = {
  send: async (to, message) => {
    // NetGSM API request simulation
    console.log(`[NetGSM] Sending to ${to}: ${message}`);
    // await axios.post('https://api.netgsm.com.tr/sms/send', { ... })
    return { success: true, provider: 'NetGSM' };
  }
};

const twilioProvider: SMSProvider = {
  send: async (to, message) => {
    // Twilio SDK simulation
    console.log(`[Twilio] Sending to ${to}: ${message}`);
    return { success: true, provider: 'Twilio' };
  }
};

// Aktif provider seçimi
const activeProvider = process.env.SMS_PROVIDER === 'twilio' ? twilioProvider : netgsmProvider;

export const sendSMS = async (to: string, message: string) => {
  try {
    return await activeProvider.send(to, message);
  } catch (error) {
    console.error('SMS send error:', error);
    throw error;
  }
};