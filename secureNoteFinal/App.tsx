/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TextInput,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import * as Keychain from 'react-native-keychain';
import bcrypt from 'react-native-bcrypt';
import {LogBox} from 'react-native';
import SInfo from 'react-native-sensitive-info';
//jailmonkey
LogBox.ignoreAllLogs();

const App = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [noteText, setNoteText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [validationTimes, setValidationTimes] = useState(0);

  // To check if any sensor is available on iOS/Android
  // const hasAnySensors = await SInfo.isSensorAvailable();

  // on Android you can check if has any fingersprints enrolled
  // const hasAnyFingerprintsEnrolled = await SInfo.hasEnrolledFingerprints();

  const validatePassword = (password: string) => {
    return password.trim().length < 8 ? false : true;
  };
  const savePassword = async (username: string, password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try {
      Keychain.setGenericPassword(username, hash);
      setHasAccount(true);
      setPassword('');
      setUsername('');
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const getPassword = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        // const password  =
        return credentials.password;
      } else {
        console.log('No credentials stored!');
        return null;
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const saveNote = async () => {
    await SInfo.setItem('note', noteText, {
      // touchID: true, //add this key
      showModal: true, //add this key
      // kSecAccessControl: 'kSecAccessControlBiometryAny', // optional - Add support for FaceID
    });
  };

  const getNote = async () => {
    const protectedData = await SInfo.getItem('note', {
      // touchID: true,
      showModal: true, //required (Android) - Will prompt user's fingerprint on Android
      // strings: {
      // optional (Android) - You can personalize your prompt
      //   description: 'Custom Title ',
      //   header: 'Custom Description',
      // },
      // required (iOS) -  A fallback string for iOS
      // kSecUseOperationPrompt:
      //   'We need your permission to retrieve encrypted data',
    });
    setNoteText(protectedData);
  };

  useEffect(() => {
    const checkKeychain = async () => {
      const credentials = await Keychain.getGenericPassword();
      credentials ? setHasAccount(true) : setHasAccount(false);
    };
    checkKeychain();
    // Keychain.resetGenericPassword();
    // const isBroken = JailMonkey.isJailBroken();
    // isBroken && setHasAccount(false);
  }, []);

  useEffect(() => {
    console.log('logged in: ', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 25,
        }}>
        {!isLoggedIn && (
          <>
            <Text>username: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                setUsername(text);
              }}
              value={username}
            />
            <Text>password: </Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            />
          </>
        )}
        {!isLoggedIn && !hasAccount && (
          <Button
            title="enter your new password"
            onPress={() => {
              if (validatePassword(password)) {
                savePassword(username, password);
              } else {
                Alert.alert('Password has to be at least of length 8');
              }
            }}
          />
        )}
        {!isLoggedIn && hasAccount && (
          <Button
            disabled={validationTimes >= 3 ? true : false}
            title="login"
            onPress={async () => {
              if (validationTimes >= 3) {
                Alert.alert(
                  'Wrong password at least three times. You have been blocked!!!',
                );
              } else {
                const passwordStorage = await getPassword();
                if (passwordStorage) {
                  bcrypt.compare(
                    password,
                    passwordStorage,
                    (err: any, res: any) => {
                      if (res) {
                        setIsLoggedIn(true);
                        setPassword('');
                        setUsername('');
                        getNote();
                      } else {
                        Alert.alert('Wrong password');
                        setPassword('');
                        setValidationTimes(
                          (validationTimes) => (validationTimes += 1),
                        );
                      }
                    },
                  );
                }
              }
            }}
          />
        )}

        {isLoggedIn && (
          <>
            <Text>Your secure note:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                setNoteText(text);
              }}
              value={noteText}
            />
            <View style={{marginBottom: 10}}>
              <Button
                title="save note"
                onPress={() => {
                  saveNote();
                }}
              />
            </View>
            <Button
              title="log out"
              onPress={() => {
                setIsLoggedIn(false);
                setNoteText('');
              }}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    paddingLeft: 6,
  },
});

export default App;
