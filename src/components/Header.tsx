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
          {/* <Text style={styles.backButtonText}><MoveLeft/></Text> */}
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      {/* <View style={styles.centerContainer}> */}
        {/* {!showSearch && <Text style={styles.headerTitle}>{title}</Text>} */}
        {showSearch && <SearchBar onSearch={onSearch} />}
      {/* </View> */}
      
      {rightComponent || renderCartButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2874f0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  centerContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
  },
  placeholder: {
    width: 40,
  },
  cartButton: {
    padding: 8,
    position: 'relative',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cartIcon: {
    fontSize: 22,
    color: 'white',
  },
  cartBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: '#ff6161',
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2874f0',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Header;