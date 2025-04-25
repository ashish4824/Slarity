import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    let buttonStyle: StyleProp<ViewStyle>[] = [styles.button];
    
    // Add variant styles
    if (variant === 'primary') {
      buttonStyle.push(styles.primaryButton as StyleProp<ViewStyle>);
    } else if (variant === 'secondary') {
      buttonStyle.push(styles.secondaryButton as StyleProp<ViewStyle>);
    } else if (variant === 'outline') {
      buttonStyle.push(styles.outlineButton as StyleProp<ViewStyle>);
    }
    
    // Add size styles
    if (size === 'small') {
      buttonStyle.push(styles.smallButton as StyleProp<ViewStyle>);
    } else if (size === 'large') {
      buttonStyle.push(styles.largeButton as StyleProp<ViewStyle>);
    }
    
    // Add disabled style
    if (disabled) {
      buttonStyle.push(styles.disabledButton as StyleProp<ViewStyle>);
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    // Using an array of styles to be merged at render time
    // This avoids TypeScript expecting all properties to be present in each style object
    const textStyleArray: StyleProp<TextStyle>[] = [styles.buttonText];
    
    if (variant === 'primary') {
      textStyleArray.push(styles.primaryButtonText as StyleProp<TextStyle>);
    } else if (variant === 'secondary') {
      textStyleArray.push(styles.secondaryButtonText as StyleProp<TextStyle>);
    } else if (variant === 'outline') {
      textStyleArray.push(styles.outlineButtonText as StyleProp<TextStyle>);
    }
    
    if (size === 'small') {
      textStyleArray.push(styles.smallButtonText as StyleProp<TextStyle>);
    } else if (size === 'large') {
      textStyleArray.push(styles.largeButtonText as StyleProp<TextStyle>);
    }
    
    if (disabled) {
      textStyleArray.push(styles.disabledButtonText as StyleProp<TextStyle>);
    }
    
    return textStyleArray;
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'outline' ? '#2874f0' : 'white'} />
      ) : (
        <Text style={[...getTextStyle(), textStyle as StyleProp<TextStyle>]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: '#2874f0',
  },
  secondaryButton: {
    backgroundColor: '#fb641b',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2874f0',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    borderColor: '#cccccc',
  },
  buttonText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: 'white',
  },
  outlineButtonText: {
    color: '#2874f0',
  },
  smallButtonText: {
    fontSize: 12,
  },
  largeButtonText: {
    fontSize: 16,
  },
  disabledButtonText: {
    color: '#666666',
  },
});

export default Button;