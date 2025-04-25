import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StyleProp, ViewStyle, Dimensions } from 'react-native';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: (productId: number) => void;
  style?: StyleProp<ViewStyle>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, style }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <TouchableOpacity 
      style={[styles.productCard, style]} 
      onPress={() => onPress(product.id)}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: product.images[0] || 'https://placehold.co/600x400' }} 
        style={styles.productImage} 
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <Text style={styles.productCategory}>{product.category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1,
    margin: 8,
  },
  // productImage: {
  //   width: '100%',
  //   height: 200,
  // },
  productImage: {
    // width: screenWidth - 32,
    width: '100%', 
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2874f0',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProductCard;