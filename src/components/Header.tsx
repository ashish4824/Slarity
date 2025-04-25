import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import SearchBar from './SearchBar';
import { Carrot, MoveLeft, ShoppingCart } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  onBackPress?: () => void;
  showSearch?: boolean;
  cartItemCount?: number;
  onCartPress?: () => void;
  onSearch?: (text: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  rightComponent,
  leftComponent,
  onBackPress,
  showSearch = true,
  cartItemCount = 0,
  onCartPress,
  onSearch,
}) => {
  const renderCartButton = () => {
    return (
      <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
        <Text style={styles.cartIcon}><ShoppingCart/></Text>
        {cartItemCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.header}>
      {leftComponent ? (
        leftComponent
      ) : onBackPress ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}><MoveLeft/></Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      <View style={styles.centerContainer}>
        {!showSearch && <Text style={styles.headerTitle}>{title}</Text>}
        {showSearch && <SearchBar onSearch={onSearch} />}
      </View>
      
      {rightComponent || renderCartButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2874f0',
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
  centerContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 32,
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartIcon: {
    fontSize: 20,
    color: 'white',
  },
  cartBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#ff6161',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Header;