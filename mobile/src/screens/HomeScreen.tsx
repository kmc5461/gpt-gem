// mobile/src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowRight } from 'lucide-react-native';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800' }}
        style={styles.hero}
      >
        <View style={styles.overlay} />
        <View style={styles.heroContent}>
          <Text style={styles.seasonText}>SEASON 02 / 24</Text>
          <Text style={styles.heroTitle}>ARCHETYPE.</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Shop')}
          >
            <Text style={styles.buttonText}>SHOP COLLECTION</Text>
            <ArrowRight size={16} color="#000" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Categories / New Arrivals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>NEW ARRIVALS</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.linkText}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        
        {/* Mock Horizontal List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {[1, 2, 3].map((i) => (
            <TouchableOpacity key={i} style={styles.categoryCard}>
              <View style={styles.categoryImageContainer}>
                 <Text style={styles.categoryPlaceholder}>CAT 0{i}</Text>
              </View>
              <Text style={styles.categoryName}>Collection {i}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    width: '100%',
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroContent: {
    alignItems: 'center',
    gap: 16,
  },
  seasonText: {
    color: '#e4e4e7',
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: '600',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
  },
  buttonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  section: {
    paddingVertical: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  linkText: {
    fontSize: 12,
    fontWeight: '700',
    textDecorationLine: 'underline',
    color: '#52525b',
  },
  horizontalList: {
    paddingLeft: 24,
    gap: 16,
  },
  categoryCard: {
    marginRight: 16,
  },
  categoryImageContainer: {
    width: 200,
    height: 250,
    backgroundColor: '#f4f4f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryPlaceholder: {
    color: '#d4d4d8',
    fontWeight: '900',
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
