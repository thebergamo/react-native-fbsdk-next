import {useCallback} from 'react';
import {Alert} from 'react-native';
import {LoginButton} from 'react-native-fbsdk-next';

import React from 'react';
export default () => {
  const handleLoginFinished = useCallback((error, data) => {
    Alert.alert(JSON.stringify(error || data, null, 2));
  }, []);

  return (
    <LoginButton
      testID="facebook-login"
      onLoginFinished={handleLoginFinished}
    />
  );
};
