# react-native-google-recaptcha-provider

Google reCAPTCHA provider for react native projects

## Installation

```sh
yarn add react-native-google-recaptcha-provider
```

## Overview

_react-native-google-recaptcha-provider_ is a library for integrating Google reCAPTCHA into React Native applications. It provides a convenient way to add and customize reCAPTCHA in your application to prevent spam and abuse.

## Example

[You can find a usage example here](./example)

## Customization

The library provides various customization options such as specifying the size, theme, language, and action associated with the reCAPTCHA widget.

## Method and Field Descriptions

### __GoogleRecaptchaProps__
| Prop Name          | Type                                                   | Required | Description                                                                                      |
|--------------------|--------------------------------------------------------|----------|--------------------------------------------------------------------------------------------------|
| siteKey            | string                                                 | Yes      | The site key obtained from Google reCAPTCHA.                                                     |
| baseUrl            | string                                                 | Yes      | The base URL of the website where reCAPTCHA is being used.                                       |
| onVerify           | (token: string) => void                                | Yes      | Callback function invoked when reCAPTCHA token is successfully verified.                         |
| onExpire           | () => void                                             | No       | Callback function invoked when the reCAPTCHA token expires.                                       |
| onError            | (error: any) => void                                   | No       | Callback function invoked when an error occurs during reCAPTCHA verification.                    |
| onClose            | () => void                                             | No       | Callback function invoked when the reCAPTCHA widget is closed without completing.                 |
| onLoad             | () => void                                             | No       | Callback function invoked when the WebView finishes loading the HTML content.                     |
| loadingComponent   | ReactNode                                              | No       | A custom loading component to display while reCAPTCHA is loading.                                 |
| webViewProps       | Omit<WebViewProps, 'source' \| 'style' \| 'onMessage'> | No | Additional props to be passed to the underlying WebView component.                               |
| lang               | string                                                 | No       | The language code to use for reCAPTCHA.                                                         |
| size               | 'normal' \| 'compact' \| 'invisible'                   | No   | The size of the reCAPTCHA widget. Possible values: 'normal', 'compact', 'invisible'. Default is 'normal'. |
| theme              | 'light' \| 'dark'                                      | No       | The theme of the reCAPTCHA widget. Possible values: 'light', 'dark'. Default is 'light'.         |
| enterprise         | boolean                                                | No       | Specifies whether to use the new reCAPTCHA Enterprise API. Default is false.                      |
| action             | string                                                 | No       | An additional parameter for specifying the action name associated with the protected element.   |
| recaptchaDomain    | string                                                 | No       | The domain of the reCAPTCHA service. Defaults to 'www.google.com'.                                |
| gstaticDomain      | string                                                 | No       | The domain of the Google static content. Defaults to 'www.gstatic.com'.                            |
| hideBadge          | boolean                                                | No       | Specifies whether to hide the reCAPTCHA badge. Defaults to false.                                 |
| style              | StyleProp\<ViewStyle\>                                 | No       | The style object or stylesheet for the root container of the component.                           |


MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
