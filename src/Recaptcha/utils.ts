type PayloadClose = {
  close: [];
};

type PayloadError = {
  error: [any];
};

type PayloadLoad = {
  load: [];
};

type PayloadExpire = {
  expire: [];
};

type PayloadVerify = {
  verify: [string];
};

export type MessageReceivedPayload =
  | PayloadClose
  | PayloadError
  | PayloadLoad
  | PayloadExpire
  | PayloadVerify;

export const isPayloadClose = (
  payload: MessageReceivedPayload
): payload is PayloadClose => {
  return 'close' in payload;
};

export const isPayloadError = (
  payload: MessageReceivedPayload
): payload is PayloadError => {
  return 'error' in payload;
};

export const isPayloadLoad = (
  payload: MessageReceivedPayload
): payload is PayloadLoad => {
  return 'load' in payload;
};

export const isPayloadExpire = (
  payload: MessageReceivedPayload
): payload is PayloadExpire => {
  return 'expire' in payload;
};

export const isPayloadVerify = (
  payload: MessageReceivedPayload
): payload is PayloadVerify => {
  return 'verify' in payload;
};
