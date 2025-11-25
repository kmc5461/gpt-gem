// mobile/src/screens/ProductDetailScreen.tsx
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCartStore } from '../store/cartStore';

export default function ProductDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { addItem } = useCartStore();
  
  // Mock fetch based on route.params.productId
  const product = {
    id: route.params.productId,
    name: 'Noir Oversized Hoodie',
    price: 120,
    description: 'Heavyweight cotton blend. Dropped shoulders. The definitive silhouette for the modern avant-garde.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL']
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      variant: 'L' // Mock default variant
    });
    Alert.alert('Success', 'Added to cart', [
      { text: 'Keep Shopping' },
      { text: 'View Cart', onPress: () => navigation.navigate('Cart') }
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{product.price} €</Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SELECT SIZE</Text>
            <View style={styles.sizeGrid}>
              {product.sizes.map((size) => (
                <TouchableOpacity key={size} style={styles.sizeButton}>
                  <Text style={styles.sizeText}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>ADD TO CART</Text>
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
  image: {
    width: '100%',
    height: 500,
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
    flex: 1,
    marginRight: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#52525b',
    lineHeight: 22,
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
  },
  sizeGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f5',
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#000',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
});
