// mobile/src/screens/ProductsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

// API Config Placeholder
const API_BASE_URL = "https://archetype-api-mock.com/api";

export default function ProductsScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  
  // Mock Data
  const products = [
    { id: '1', name: 'Noir Hoodie', price: 120, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=400' },
    { id: '2', name: 'Trench Coat', price: 450, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400' },
    { id: '3', name: 'Combat Boots', price: 280, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=400' },
    { id: '4', name: 'Silk Shirt', price: 180, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SHOP</Text>
        <Text style={styles.headerSubtitle}>SEASON 02 / 24</Text>
      </View>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ProductCard
            {...item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -1,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 4,
  },
  listContent: {
    padding: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
