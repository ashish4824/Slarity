import { Minus, Plus, SquaresSubtract } from 'lucide-react-native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  style?: StyleProp<ViewStyle>;
  minValue?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  style,
  minValue = 1,
}) => {
  return (
    <View style={[styles.quantityContainer, style]}>
      <TouchableOpacity 
        style={styles.quantityButton} 
        onPress={onDecrease}
        disabled={quantity <= minValue}
      >
        <Text style={styles.quantityButtonText}><Minus color="black"/></Text>
        
      </TouchableOpacity>
      
      <Text style={styles.quantityText}>{quantity}</Text>
      
      <TouchableOpacity 
        style={styles.quantityButton} 
        onPress={onIncrease}
      >
        <Text style={styles.quantityButtonText}><Plus color="black"/></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2874f0',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
});

export default QuantitySelector;