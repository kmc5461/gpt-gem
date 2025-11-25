// mobile/src/screens/CheckoutScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCartStore } from '../store/cartStore';

export default function CheckoutScreen() {
  const { getTotal, clearCart } = useCartStore();
  const [form, setForm] = useState({ name: '', address: '', email: '' });

  const handlePlaceOrder = () => {
    // Mock API call
    Alert.alert('Order Confirmed', `Thank you ${form.name}!`, [
      { text: 'OK', onPress: () => clearCart() }
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SHIPPING ADDRESS</Text>
          <TextInput 
            placeholder="Full Name" 
            style={styles.input} 
            value={form.name}
            onChangeText={(t) => setForm({...form, name: t})}
          />
          <TextInput 
            placeholder="Address" 
            style={styles.input}
            value={form.address}
            onChangeText={(t) => setForm({...form, address: t})}
          />
          <TextInput 
            placeholder="City" 
            style={styles.input} 
          />
          <TextInput 
            placeholder="Phone Number" 
            keyboardType="phone-pad"
            style={styles.input} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT</Text>
          <TextInput 
            placeholder="Email Address" 
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={form.email}
            onChangeText={(t) => setForm({...form, email: t})}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL TO PAY</Text>
          <Text style={styles.totalValue}>{getTotal()} €</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handlePlaceOrder}>
          <Text style={styles.payButtonText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 14,
    color: '#000',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f5',
    paddingBottom: 40,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#71717a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  payButton: {
    backgroundColor: '#000',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
});
