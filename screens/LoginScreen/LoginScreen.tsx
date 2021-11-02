import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Alert, ActivityIndicator, SafeAreaView } from "react-native";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../../atom/authenticatedAtom";
import { useNavigation } from "@react-navigation/native";
import {APP_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadingState } from "../../atom/loadingAtom";

const LoginScreen = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(authenticatedState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useRecoilState(loadingState)

  const navigation = useNavigation();

  //Function that is called for logging in Somebody
  const login = async () => {
      const response = await fetch(`${APP_URL}/user/login`,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: username,
              password: password
          })
      })

      const data = await response.json()

      if(data?.success === false){
        Alert.alert(
            "Error",
            data.message,
            [
              { text: "Got It", onPress: () => console.log("OK Pressed"), style: "cancel" }
            ]
        );

        setIsLoading(false)

        return
      }

      try{
          await AsyncStorage.setItem('auth-token', data)
          setIsAuthenticated(true)
          setIsLoading(false)
      }
      catch(e){
          console.log(e)
          setIsLoading(false)
      }
  }

  //On click function called on the click of the Login button  
  const onClick = () => {
    if(isLoading){
      return
    }

    setIsLoading(true)

    if(username.trim().length<4 || username.trim().length>20){
        Alert.alert(
            "Invalid Username",
            "The username should be at least 4 characters and at most 20 characters long.",
            [
              { text: "Got It", onPress: () => console.log("OK Pressed"), style: "cancel" }
            ]
        );

        setIsLoading(false)

        return
    }

    if(password.length<8 || password.length>20){
        Alert.alert(
            "Invalid Password",
            "The password should be at least 8 characters long and at max 20 characters",
            [
              { text: "Got It", onPress: () => console.log("OK Pressed"), style: "cancel" }
            ]
        );

        setIsLoading(false)

        return
    }
    login()
    // console.log(APP_URL)
  };

  const onClickSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>

      <Text style={styles.heading}>LOGIN</Text>

      <TextInput
        placeholder="Enter your username"
        style={styles.textInputs}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <TextInput
        placeholder="Enter your password"
        style={styles.textInputs}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <Pressable onPress={onClick} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      {
        (isLoading) && (
          <ActivityIndicator size="small" color="#0000ff" />
        )
      }


      <View style={styles.signUpRedirectSection}>
        <Text style={styles.bottomText}>New here?</Text>

        <Pressable onPress={onClickSignUp} style={styles.signUpButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
};

export default LoginScreen;
