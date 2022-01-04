import React, {useCallback} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ShareDialog, ShareContent} from 'react-native-fbsdk-next';

const styles = StyleSheet.create({
  shareText: {
    fontSize: 20,
    margin: 10,
  },
});

export default () => {
  const handlePress = useCallback(async () => {
    const SHARE_LINK_CONTENT: ShareContent = {
      contentType: 'link',
      contentUrl: 'https://www.facebook.com/',
    };

    const canShow = await ShareDialog.canShow(SHARE_LINK_CONTENT);

    if (canShow) {
      try {
        const {isCancelled, postId} = await ShareDialog.show(
          SHARE_LINK_CONTENT,
        );

        if (isCancelled) {
          Alert.alert('Share cancelled');
        } else {
          Alert.alert('Share success with postId: ' + postId);
        }
      } catch (error) {
        Alert.alert('Share fail with error: ' + error);
      }
    }
  }, []);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.shareText}>Share link with ShareDialog</Text>
    </TouchableOpacity>
  );
};
