import type { RecaptchaProps } from 'react-native-google-recaptcha-provider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RecaptchaProvider } from './RecaptchaProvider';

type RecaptchaModalProps = Pick<RecaptchaProps, 'onVerify' | 'onClose'> & {};
export const RecaptchaModal = (props: RecaptchaModalProps) => {
  const insets = useSafeAreaInsets();
  const recaptchaTop = insets.top + CLOSE_SIZE;
  return (
    <View style={styles.modal}>
      <RecaptchaProvider
        style={{ top: recaptchaTop, bottom: insets.bottom }}
        {...props}
      />
      <TouchableOpacity
        hitSlop={10}
        onPress={props.onClose}
        style={[styles.close, { marginTop: insets.top }]}
      >
        <Text style={styles.closeText}>&times;</Text>
      </TouchableOpacity>
    </View>
  );
};

const CLOSE_SIZE = 50;
const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  close: {
    justifyContent: 'center',
    alignItems: 'center',
    height: CLOSE_SIZE,
    width: CLOSE_SIZE,
    marginLeft: 'auto',
    marginRight: 20,
    borderRadius: 25,
    backgroundColor: '#ffffff',
  },
  closeText: {
    fontSize: 24,
  },
});
