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
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  productImage: {
    width: '100%', 
    height: 180,
    alignSelf: 'center',
    resizeMode: 'cover',
    backgroundColor: '#f8f8f8',
  },
  productInfo: {
    padding: 16,
    backgroundColor: 'white',
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#212121',
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2874f0',
    marginBottom: 6,
  },
  productCategory: {
    fontSize: 13,
    color: '#757575',
    textTransform: 'capitalize',
  },
});

export default ProductCard;