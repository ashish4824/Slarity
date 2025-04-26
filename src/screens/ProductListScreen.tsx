import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter } from 'lucide-react-native';

import { fetchProducts, fetchCategories } from '../api/api';
import { Product, ProductFilter, Category } from '../types';
import { RootStackParamList } from '../../App';
import { useCart } from '../hooks/useCart';
import { ProductCard, Header, Button, FilterBar } from '../components';

type ProductListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

const ProductListScreen = () => {
  const navigation = useNavigation<ProductListScreenNavigationProp>();
  const { getItemCount } = useCart();
  
  const [filters, setFilters] = useState<ProductFilter>({
    search: '',
    sortBy: 'name-asc',
    priceRange: undefined,
    categoryId: undefined,
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
  });
  
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  
  const handleProductPress = useCallback((productId: number) => {
    navigation.navigate('ProductDetail', { productId });
  }, [navigation]);
  
  const handleCartPress = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);
  
  const handleSearchChange = (text: string) => {
    setFilters(prev => ({ ...prev, search: text }));
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleSortChange = (sortBy: ProductFilter['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };
  
  const handleCategoryChange = (categoryId?: number) => {
    setFilters(prev => ({ ...prev, categoryId }));
  };

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };
  
  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard 
      product={item} 
      onPress={handleProductPress}
    />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Products"
        showSearch={true}
        onSearch={handleSearchChange}
        cartItemCount={getItemCount()}
        onCartPress={handleCartPress}
        rightComponent={
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
            <Text style={styles.filterButtonText}><Filter/></Text>
          </TouchableOpacity>
        }
      />
      
      <FilterBar
        filters={filters}
        categories={categories || []}
        onSortChange={handleSortChange}
        onCategoryChange={handleCategoryChange}
        onPriceRangeChange={handlePriceRangeChange}
        visible={showFilters}
        onToggle={toggleFilters}
      />
      
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : isError ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Failed to load products</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text>No products found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 2,
    paddingHorizontal: 12,
    marginRight: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#212121',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  filterButtonText: {
    color: '#2874f0',
    fontWeight: '500',
  },
  cartButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  cartButtonText: {
    color: '#2874f0',
    fontWeight: '500',
  },
  filtersContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#212121',
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f1f3f6',
    color: 'white',
    borderRadius: 2,
    marginRight: 8,
    marginBottom: 8,
  },
  activeSortOption: {
    backgroundColor: '#2874f0',
    color: 'white',
  },
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f1f3f6',
    borderRadius: 2,
    marginRight: 8,
    marginBottom: 8,
  },
  activeCategoryOption: {
    backgroundColor: '#2874f0',
  },
  productList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 2,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  productImage: {
    width: '100%',
    height: 500,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4,
    color: '#212121',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#878787',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default ProductListScreen;