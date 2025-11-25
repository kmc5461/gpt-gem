// mobile/src/components/ProductCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 sütunlu grid için hesaplama (marginler dahil)

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onPress: () => void;
}

export default function ProductCard({ id, name, price, image, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.price}>{price} €</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 24,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 3/4,
    backgroundColor: '#f4f4f5',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    gap: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#000',
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 12,
    fontWeight: '500',
    color: '#52525b', // zinc-600
  },
});
