import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LoginButtonExample, ShareDialogExample} from './Examples';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default () => {
  return (
    <View style={styles.container}>
      <LoginButtonExample />
      <ShareDialogExample />
    </View>
  );
};
