import React, { useState } from 'react';

import { StyleSheet, Button, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RecaptchaModal } from './ModalExample';

export default function Root() {
  return (
    <SafeAreaProvider style={styles.root}>
      <App />
    </SafeAreaProvider>
  );
}

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Open modal" onPress={() => setModalIsVisible(true)} />
      {modalIsVisible && (
        <RecaptchaModal
          onClose={() => setModalIsVisible(false)}
          onVerify={(_) => {
            setModalIsVisible(false);
            Alert.alert('Token', _);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
