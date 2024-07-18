/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Modal,
  Animated,
} from 'react-native';

function RNModal({visible, onClose}): React.JSX.Element {
  const [backdropVisible, setBackdropVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setBackdropVisible(true);
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else if (backdropVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setBackdropVisible(false));
    }
  }, [visible, backdropVisible, fadeAnim]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.container}>
        {backdropVisible && (
          <TouchableWithoutFeedback onPress={onClose}>
            <Animated.View style={[styles.backdrop, {opacity: fadeAnim}]} />
          </TouchableWithoutFeedback>
        )}

        <View style={styles.modalView}>
          <Text>Hello from Modal</Text>
          <Pressable onPress={onClose}>
            <Text>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function App(): React.JSX.Element {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <SafeAreaView>
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.button}>
          <Text>Touch Here</Text>
        </View>
      </Pressable>
      <RNModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // Ensure the modal content is above the backdrop
    zIndex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
export default App;
