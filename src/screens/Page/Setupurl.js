import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { setBaseURL,getBaseURL } from '../../api/ApiManager';

const SetupUrl = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleSave = () => {
    if (inputUrl.trim() !== '') {
      setBaseURL(inputUrl.trim());
      setStatus(`✅ Đã lưu URL: ${getBaseURL()}`);
    } else {
      setStatus('❌ Vui lòng nhập URL hợp lệ');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập địa chỉ API URL:</Text>
      <TextInput
        style={styles.input}
        placeholder="https://example.com"
        value={inputUrl}
        onChangeText={setInputUrl}
      />
      <Button title="Lưu URL" onPress={handleSave} />
      {status !== '' && <Text style={styles.status}>{status}</Text>}
    </View>
  );
};

export default SetupUrl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  status: {
    marginTop: 15,
    fontSize: 14,
    color: 'green',
  },
});
