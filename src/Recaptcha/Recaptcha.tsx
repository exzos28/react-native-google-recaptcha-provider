import React, {
  type ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';

import WebView, {
  type WebViewMessageEvent,
  type WebViewProps,
  type WebViewNavigation,
} from 'react-native-webview';

import getTemplate, {
  type RecaptchaSize,
  type RecaptchaTheme,
} from './get-template';
import {
  isPayloadClose,
  isPayloadError,
  isPayloadExpire,
  isPayloadLoad,
  isPayloadVerify,
  type MessageReceivedPayload,
} from './utils';

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const originWhitelist = ['*'];

export type RecaptchaProps = {
  /**
   * A custom loading component to display while reCAPTCHA is loading.
   */
  loadingComponent?: ReactNode;
  /**
   * Additional props to be passed to the underlying WebView component.
   */
  webViewProps?: Omit<WebViewProps, 'source' | 'style' | 'onMessage'>;
  /**
   * Callback function invoked when reCAPTCHA token is successfully verified.
   * @param token - The reCAPTCHA token string.
   */
  onVerify: (token: string) => void;
  /**
   * Callback function invoked when the reCAPTCHA token expires.
   */
  onExpire?: () => void;
  /**
   * Callback function invoked when an error occurs during reCAPTCHA verification.
   * @param error - The error object.
   */
  onError?: (error: any) => void;
  /**
   * Callback function invoked when the reCAPTCHA widget is closed without completing.
   */
  onClose?: () => void;
  /**
   * Callback function invoked when the WebView finishes loading the HTML content.
   */
  onLoad?: () => void;
  /**
   * The site key obtained from Google reCAPTCHA.
   */
  siteKey: string;
  /**
   * The base URL of the website where reCAPTCHA is being used.
   */
  baseUrl: string;
  /**
   * The language code to use for reCAPTCHA.
   */
  lang?: string;
  /**
   * The size of the reCAPTCHA widget.
   */
  size?: RecaptchaSize;
  /**
   * The theme of the reCAPTCHA widget.
   */
  theme?: RecaptchaTheme;
  /**
   * Specifies whether to use the new reCAPTCHA Enterprise API.
   */
  enterprise?: boolean;
  /**
   * An additional parameter for specifying the action name associated with the protected element for reCAPTCHA Enterprise API.
   */
  action?: string;
  /**
   * The domain of the reCAPTCHA service. Defaults to 'www.google.com'.
   */
  recaptchaDomain?: string;
  /**
   * The domain of the Google static content. Defaults to 'www.gstatic.com'.
   */
  gstaticDomain?: string;
  /**
   * Specifies whether to hide the reCAPTCHA badge. Defaults to false.
   */
  hideBadge?: boolean;
  /**
   * The style object or stylesheet for the root container of the component.
   */
  style?: StyleProp<ViewStyle>;
};

const Recaptcha = ({
  loadingComponent,
  webViewProps,
  onVerify,
  onExpire,
  onError,
  onClose,
  onLoad,
  theme = 'light',
  size = 'normal',
  siteKey,
  baseUrl,
  lang,
  style,
  enterprise = false,
  recaptchaDomain = 'www.google.com',
  gstaticDomain = 'www.gstatic.com',
  hideBadge = false,
  action,
}: RecaptchaProps) => {
  const $isClosed = useRef(true);
  const $webView = useRef<WebView | null>(null);
  const [loading, setLoading] = useState(true);

  const isInvisibleSize = size === 'invisible';

  const html = useMemo(() => {
    return getTemplate(
      {
        siteKey,
        size,
        theme,
        lang,
        action,
      },
      recaptchaDomain,
      gstaticDomain,
      enterprise,
      hideBadge
    );
  }, [
    siteKey,
    size,
    theme,
    lang,
    action,
    enterprise,
    recaptchaDomain,
    gstaticDomain,
    hideBadge,
  ]);

  const handleLoad = useCallback(() => {
    onLoad?.();

    if (isInvisibleSize) {
      $webView.current?.injectJavaScript(`
            window.rnRecaptcha.execute();
          `);
    }

    setLoading(false);
  }, [onLoad, isInvisibleSize]);

  const handleClose = useCallback(() => {
    if ($isClosed.current) {
      return;
    }
    $isClosed.current = true;
    onClose?.();
  }, [onClose]);

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const payload = JSON.parse(
          event.nativeEvent.data
        ) as MessageReceivedPayload;

        if (isPayloadClose(payload) && isInvisibleSize) {
          handleClose();
        }
        if (isPayloadLoad(payload)) {
          handleLoad();
        }
        if (isPayloadExpire(payload)) {
          onExpire?.();
        }
        if (isPayloadError(payload)) {
          handleClose();
          onError?.(...payload.error);
        }
        if (isPayloadVerify(payload)) {
          handleClose();
          onVerify?.(...payload.verify);
        }
      } catch (err) {
        if ('__DEV__' in global && __DEV__) {
          console.warn(err);
        }
      }
    },
    [onVerify, onExpire, onError, handleClose, handleLoad, isInvisibleSize]
  );

  const source = useMemo(
    () => ({
      html,
      baseUrl,
    }),
    [html, baseUrl]
  );

  const handleNavigationStateChange = useCallback(() => {
    // prevent navigation on Android
    if (!loading) {
      $webView.current?.stopLoading();
    }
  }, [loading]);

  const handleShouldStartLoadWithRequest = useCallback(
    (event: WebViewNavigation) => {
      // prevent navigation on iOS
      return event.navigationType === 'other';
    },
    []
  );

  const webViewStyles = useMemo(() => [styles.webView, style], [style]);

  const renderLoading = () => {
    if (!loading && source) {
      return null;
    }
    return (
      <View style={styles.loadingContainer}>
        {loadingComponent || <ActivityIndicator size="large" />}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <WebView
        bounces={false}
        allowsBackForwardNavigationGestures={false}
        originWhitelist={originWhitelist}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        onNavigationStateChange={handleNavigationStateChange}
        {...webViewProps}
        source={source}
        style={webViewStyles}
        onMessage={handleMessage}
        ref={$webView}
      />
      {renderLoading()}
    </View>
  );
};

export default Recaptcha;
