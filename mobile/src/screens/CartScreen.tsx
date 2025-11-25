// mobile/src/screens/CartScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../store/cartStore';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const navigation = useNavigation<any>();

  if (items.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyText}>Your bag is empty.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SHOPPING BAG ({items.length})</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemVariant}>{item.variant} / Black</Text>
              </View>
              <View style={styles.itemControls}>
                <View style={styles.quantityControl}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                    <Minus size={16} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                    <Plus size={16} color="#000" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemPrice}>{item.price * item.quantity} €</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
              <Trash2 size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>{getTotal()} €</Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutText}>PROCEED TO CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#71717a',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f5',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  list: {
    padding: 24,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 24,
    height: 100,
  },
  itemImage: {
    width: 80,
    height: 100,
    backgroundColor: '#f4f4f5',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  itemVariant: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 4,
  },
  itemControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    paddingHorizontal: 8,
    height: 32,
    gap: 12,
  },
  quantity: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f5',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  checkoutButton: {
    backgroundColor: '#000',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
});
