import { Search } from 'lucide-react-native';
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search products...',
  onSearch,
  value = '',
  onChangeText,
}) => {
  const [searchText, setSearchText] = React.useState(value);

  const handleChangeText = (text: string) => {
    setSearchText(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}><Search color="black"/></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#212121',
    fontWeight: '400',
  },
  searchButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
    color: '#2874f0',
  },
});

export default SearchBar;