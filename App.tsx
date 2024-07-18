/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  Text,
  Pressable,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

const {width, height} = Dimensions.get('window');

function RNModal({visible, onClose}): React.JSX.Element {
  return (
    <Modal
      isVisible={visible}
      hasBackdrop
      useNativeDriver
      useNativeDriverForBackdrop
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropTransitionOutTiming={0}
      deviceHeight={height}
      deviceWidth={width}
      onBackdropPress={onClose}>
      <View style={styles.container}>
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
      <Pressable
        onPress={() => {
          console.log('TouchableWithoutFeedback');
          setModalVisible(true);
        }}>
        <View>
          <View style={styles.button}>
            <Text>Touch Here</Text>
          </View>
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
