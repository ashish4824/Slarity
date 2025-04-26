import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Filter } from 'lucide-react-native';
import { Category, ProductFilter } from '../types';

interface FilterBarProps {
  filters: ProductFilter;
  categories: Category[];
  onSortChange: (sortBy: ProductFilter['sortBy']) => void;
  onCategoryChange: (categoryId?: number) => void;
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  visible: boolean;
  onToggle: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  categories,
  onSortChange,
  onCategoryChange,
  onPriceRangeChange,
  visible,
  onToggle,
}) => {
  const priceRanges = [
    { min: 0, max: 50, label: 'Under $50' },
    { min: 50, max: 100, label: '$50 - $100' },
    { min: 100, max: 200, label: '$100 - $200' },
    { min: 200, max: Infinity, label: 'Over $200' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={onToggle}>
        <Filter color="#2874f0" size={20} />
        <Text style={styles.filterButtonText}>Filters</Text>
      </TouchableOpacity>

      {visible && (
        <ScrollView style={styles.filtersPanel} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sort by</Text>
            <View style={styles.optionsGrid}>
              <TouchableOpacity
                style={[styles.option, filters.sortBy === 'price-asc' && styles.activeOption]}
                onPress={() => onSortChange('price-asc')}
              >
                <Text style={[styles.optionText, filters.sortBy === 'price-asc' && styles.activeOptionText]}>
                  Price: Low to High
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.option, filters.sortBy === 'price-desc' && styles.activeOption]}
                onPress={() => onSortChange('price-desc')}
              >
                <Text style={[styles.optionText, filters.sortBy === 'price-desc' && styles.activeOptionText]}>
                  Price: High to Low
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.option, filters.sortBy === 'name-asc' && styles.activeOption]}
                onPress={() => onSortChange('name-asc')}
              >
                <Text style={[styles.optionText, filters.sortBy === 'name-asc' && styles.activeOptionText]}>
                  Name: A to Z
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.optionsGrid}>
              {priceRanges.map((range, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    filters.priceRange?.min === range.min && filters.priceRange?.max === range.max && styles.activeOption,
                  ]}
                  onPress={() => onPriceRangeChange(range)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      filters.priceRange?.min === range.min && filters.priceRange?.max === range.max && styles.activeOptionText,
                    ]}
                  >
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.optionsGrid}>
              <TouchableOpacity
                style={[styles.option, !filters.categoryId && styles.activeOption]}
                onPress={() => onCategoryChange(undefined)}
              >
                <Text style={[styles.optionText, !filters.categoryId && styles.activeOptionText]}>All</Text>
              </TouchableOpacity>
              {categories?.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.option, filters.categoryId === category.id && styles.activeOption]}
                  onPress={() => onCategoryChange(category.id)}
                >
                  <Text
                    style={[styles.optionText, filters.categoryId === category.id && styles.activeOptionText]}
                    numberOfLines={1}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2874f0',
    fontWeight: '500',
  },
  filtersPanel: {
    maxHeight: 400,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#212121',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  option: {
    flex: 1,
    minWidth: '45%',
    margin: 4,
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  activeOption: {
    backgroundColor: '#2874f0',
    borderColor: '#2874f0',
  },
  optionText: {
    fontSize: 14,
    color: '#212121',
    textAlign: 'center',
  },
  activeOptionText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default FilterBar;