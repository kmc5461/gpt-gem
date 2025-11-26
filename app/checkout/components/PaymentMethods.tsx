// app/checkout/components/PaymentMethods.tsx
'use client';

import { useState } from 'react';
import { CreditCard, Building2, Landmark, ShieldCheck } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Publishable key frontend'de güvenle kullanılabilir
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type PaymentMethodType = 'stripe' | 'iyzico' | 'paytr' | 'bank_transfer';

// Stripe Form Bileşeni (İç)
function StripeCheckoutForm({ orderId }: { orderId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success?orderId=${orderId}`,
      },
    });

    if (error) {
      setMessage(error.message || 'Bir hata oluştu.');
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <PaymentElement />
      <button 
        disabled={isProcessing || !stripe || !elements} 
        className="w-full bg-black text-white py-3 font-bold uppercase rounded disabled:opacity-50"
      >
        {isProcessing ? 'İşleniyor...' : 'Ödemeyi Tamamla'}
      </button>
      {message && <div className="text-red-500 text-sm mt-2">{message}</div>}
    </form>
  );
}

// Ana Bileşen
export default function PaymentMethods({ orderId, amount }: { orderId: string, amount: number }) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('stripe');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Stripe için intent oluşturma
  const initStripe = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Seçim değiştiğinde Stripe'ı hazırla
  const handleMethodChange = (method: PaymentMethodType) => {
    setSelectedMethod(method);
    if (method === 'stripe' && !clientSecret) {
      initStripe();
    }
  };

  const handleManualPayment = async (endpoint: string) => {
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      
      if (data.iframeUrl) {
        // PayTR gibi iframe gerektirenler
        window.location.href = data.iframeUrl; 
      } else if (data.paymentPageUrl) {
        // Iyzico yönlendirmesi
        window.location.href = data.paymentPageUrl;
      } else if (data.bankDetails) {
        // Havale
        alert(`Sipariş alındı. Lütfen şu IBAN'a ödeme yapın: ${data.bankDetails.iban}`);
        window.location.href = `/checkout/success?orderId=${orderId}`;
      }
    } catch (err) {
      alert('Ödeme başlatılamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold uppercase tracking-widest">Ödeme Yöntemi</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => handleMethodChange('stripe')}
          className={`p-4 border rounded-lg flex items-center gap-3 transition-all ${selectedMethod === 'stripe' ? 'border-black bg-zinc-50 ring-1 ring-black' : 'border-zinc-200'}`}
        >
          <CreditCard size={20} />
          <span className="font-bold text-sm">Kredi Kartı (Stripe)</span>
        </button>

        <button 
          onClick={() => handleMethodChange('iyzico')}
          className={`p-4 border rounded-lg flex items-center gap-3 transition-all ${selectedMethod === 'iyzico' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-zinc-200'}`}
        >
          <ShieldCheck size={20} className="text-blue-600" />
          <span className="font-bold text-sm">Iyzico / Yerel Kartlar</span>
        </button>

        <button 
          onClick={() => handleMethodChange('paytr')}
          className={`p-4 border rounded-lg flex items-center gap-3 transition-all ${selectedMethod === 'paytr' ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600' : 'border-zinc-200'}`}
        >
          <ShieldCheck size={20} className="text-emerald-600" />
          <span className="font-bold text-sm">PayTR Sanal POS</span>
        </button>

        <button 
          onClick={() => handleMethodChange('bank_transfer')}
          className={`p-4 border rounded-lg flex items-center gap-3 transition-all ${selectedMethod === 'bank_transfer' ? 'border-amber-600 bg-amber-50 ring-1 ring-amber-600' : 'border-zinc-200'}`}
        >
          <Landmark size={20} className="text-amber-600" />
          <span className="font-bold text-sm">Havale / EFT</span>
        </button>
      </div>

      {/* Dinamik İçerik Alanı */}
      <div className="mt-6 p-6 border border-zinc-100 bg-white rounded-xl shadow-sm">
        {selectedMethod === 'stripe' && (
          <>
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripeCheckoutForm orderId={orderId} />
              </Elements>
            ) : (
              <div className="text-center py-4 text-zinc-500">Stripe yükleniyor...</div>
            )}
          </>
        )}

        {selectedMethod === 'iyzico' && (
          <div className="text-center">
            <p className="text-sm text-zinc-500 mb-4">Güvenli ödeme için Iyzico sayfasına yönlendirileceksiniz.</p>
            <button onClick={() => handleManualPayment('/api/payments/iyzico')} className="bg-blue-600 text-white px-6 py-3 rounded font-bold text-sm hover:bg-blue-700 w-full">
              Iyzico ile Öde
            </button>
          </div>
        )}

        {selectedMethod === 'paytr' && (
          <div className="text-center">
            <p className="text-sm text-zinc-500 mb-4">PayTR ortak ödeme sayfasına yönlendiriliyorsunuz.</p>
            <button onClick={() => handleManualPayment('/api/payments/paytr')} className="bg-emerald-600 text-white px-6 py-3 rounded font-bold text-sm hover:bg-emerald-700 w-full">
              PayTR ile Öde
            </button>
          </div>
        )}

        {selectedMethod === 'bank_transfer' && (
          <div className="text-center">
            <p className="text-sm text-zinc-500 mb-4">Siparişi tamamladıktan sonra banka bilgilerini göreceksiniz.</p>
            <button onClick={() => handleManualPayment('/api/payments/bank-transfer')} className="bg-amber-600 text-white px-6 py-3 rounded font-bold text-sm hover:bg-amber-700 w-full">
              Siparişi Onayla (Havale)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
