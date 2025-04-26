import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { fetchProductById } from '../api/api';
import { RootStackParamList } from '../../App';
import { useCart } from '../hooks/useCart';
import { Button, QuantitySelector, Header } from '../components';
import { ArrowLeft, MoveRight } from 'lucide-react-native';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const { addToCart } = useCart();
  
  const { productId } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Fetch product details
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
  });
  
  // Handle quantity changes
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  // Add product to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigation.navigate('Cart');
    }
  };
  
  // Navigate to next image in gallery
  const nextImage = () => {
    if (product && currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  
  // Navigate to previous image in gallery
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  if (isError || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load product details</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={product.title}
        onBackPress={() => navigation.goBack()}
        onCartPress={() => navigation.navigate('Cart')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.images[currentImageIndex] || 'https://placehold.co/600x400' }} 
            style={styles.productImage} 
            resizeMode="cover"
          />
          
          {product.images.length > 1 && (
            <View style={styles.imageNavigation}>
              <TouchableOpacity 
                style={[styles.navButton, currentImageIndex === 0 && styles.disabledNavButton]} 
                onPress={prevImage}
                disabled={currentImageIndex === 0}
              >
                <Text style={styles.navButtonText}><ArrowLeft  size={24} color="black" /></Text>
              </TouchableOpacity>
              
              <Text style={styles.imageCounter}>
                {currentImageIndex + 1} / {product.images.length}
              </Text>
              
              <TouchableOpacity 
                style={[styles.navButton, currentImageIndex === product.images.length - 1 && styles.disabledNavButton]} 
                onPress={nextImage}
                disabled={currentImageIndex === product.images.length - 1}
              >
                <Text style={styles.navButtonText}><MoveRight color="black"/></Text>
              </TouchableOpacity>
            </View>
          )}
          
          {product.images.length > 1 && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.thumbnailContainer}
            >
              {product.images.map((image, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => setCurrentImageIndex(index)}
                  style={[styles.thumbnail, currentImageIndex === index && styles.activeThumbnail]}
                >
                  <Image 
                    source={{ uri: image || 'https://placehold.co/600x400' }} 
                    style={styles.thumbnailImage} 
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <Text style={styles.categoryName}>Category: {product.category.name}</Text>
          
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
      </ScrollView>
      
      <View style={styles.addToCartContainer}>
        <QuantitySelector
          quantity={quantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          style={styles.quantityContainer}
        />
        
        <Button
          title={`Add to Cart - $${(product.price * quantity).toFixed(2)}`}
          onPress={handleAddToCart}
          variant="secondary"
          size="large"
          style={styles.addToCartButton}
          textStyle={styles.addToCartButtonText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6', 
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  imageContainer: {
    width: '100%',
    backgroundColor: 'white',
  },
  productImage: {
    width: '100%',
    height: 500,
  },
  imageNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navButton: {
    padding: 8,
    backgroundColor: '#2874f0',
    borderRadius: 2, 
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledNavButton: {
    backgroundColor: '#ccc',
  },
  navButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageCounter: {
    fontSize: 14,
    color: '#212121',
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 2, 
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  activeThumbnail: {
    borderColor: '#2874f0',
    borderWidth: 2,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    padding: 16,
    backgroundColor: 'white',
    marginTop: 8,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#212121',
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2874f0',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#878787',
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#212121',
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#212121',
  },
  addToCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quantityButton: {
    width: 36,
    height: 36,
    backgroundColor: 'white',
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2874f0',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
    color: '#212121',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#fb641b',
    paddingVertical: 12,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;