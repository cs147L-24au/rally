import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MyComponent = () => {
  const [selectedOption, setSelectedOption] = useState('Select an option');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose an Option:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select an option" value="Select an option" />
          {Array.from({ length: 20 }, (_, i) => (
            <Picker.Item key={i} label={`Option ${i + 1}`} value={`Option ${i + 1}`} />
          ))}
        </Picker>
      </View>
      <Text style={styles.selectedText}>Selected: {selectedOption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default MyComponent;
