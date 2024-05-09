import {
  Recaptcha,
  type RecaptchaProps,
} from 'react-native-google-recaptcha-provider';
import React from 'react';
import { BASE_URL, SITE_KEY } from '@env';

export const RecaptchaProvider = (
  props: Omit<RecaptchaProps, 'siteKey' | 'baseUrl'>
) => {
  return (
    <Recaptcha lang="en" siteKey={SITE_KEY} baseUrl={BASE_URL} {...props} />
  );
};
