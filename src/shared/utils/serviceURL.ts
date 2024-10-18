import { Platform } from 'react-native';
import { env } from '../../../env/env.dev';

export const serviceURL = (_url) => {
  let url = '';
  if (Platform.OS === 'android') {
    url = env.ipAddress + _url;
  } else {
    url = env.api + _url;
  }
  console.log(url);
  return url;
};
