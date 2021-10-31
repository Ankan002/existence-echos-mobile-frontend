import React, {useState} from "react";
import { View, Text, Pressable, TextInput, Alert, ActivityIndicator } from "react-native";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../../atom/authenticatedAtom";
import { loadingState } from "../../atom/loadingAtom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import {APP_URL} from '@env'

import styles from "./styles";

const SignUpScreen = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [diaryName, setDiaryName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(authenticatedState)
    const [isLoading, setIsLoading] = useRecoilState(loadingState)
    const navigation = useNavigation()

    //Async Function responsible Signing Up.
    const signUp = async () => {
        const response = await fetch(`${APP_URL}/user/signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                diaryname: (diaryName.length === 0) ? 'My Diary' : diaryName,
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
        console.log(data)
    }

    //Function to be executed on Click of Sign Up
    const onClickSignUp = () => {
        if(isLoading){
            return
        }

        setIsLoading(true)

        if(firstName.trim().length < 2 || firstName.trim().length > 30){
            Alert.alert(
                "Invalid First Name",
                "The username should be at least 2 characters and at most 30 characters long.",
                [
                  { text: "Got It", onPress: () => console.log("OK Pressed"), style: "cancel" }
                ]
            );
    
            setIsLoading(false)

            return
        }

        if(lastName.trim().length > 30){
            Alert.alert(
                "Invalid Last Name",
                "The Last Name should be at most 30 characters long.",
                [
                  { text: "Got It", onPress: () => console.log("OK Pressed"), style: "cancel" }
                ]
            );
    
            setIsLoading(false)

            return
        }

        if(diaryName.trim().length > 20){
            Alert.alert(
                "Invalid Diary Name",
                "The Diary Name should be at most 20 characters long.",
                [
                  { text: "Got It", onPress: () => console.log("OK Pressed"), style: "cancel" }
                ]
            );
    
            setIsLoading(false)

            return
        }

        if(username.trim().length < 4 || username.trim().length > 30){
            Alert.alert(
                "Invalid Username",
                "The username should be at least 4 characters and at most 30 characters long.",
                [
                  { text: "Got It", onPress: () => console.log("OK Pressed"), style: "cancel" }
                ]
            );
    
            setIsLoading(false)

            return
        }

        if(password.length < 8 || username.length > 30){
            Alert.alert(
                "Invalid Password",
                "The password should be at least 4 characters and at most 30 characters long.",
                [
                  { text: "Got It", onPress: () => console.log("OK Pressed"), style: "cancel" }
                ]
            );
    
            setIsLoading(false)

            return
        }

        signUp()
    }

    //Function to be executed on Click of Login
    const onClickLogin = () => {
        navigation.navigate('Login')
    }

  return (
    <View style={styles.AndroidSafeArea}>
      <Text style={styles.heading}>SIGN UP</Text>

      <TextInput
        placeholder="Enter your First Name (Mandatory)"
        style={styles.textInputs}
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />

      <TextInput
        placeholder="Enter your Last Name"
        style={styles.textInputs}
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />

      <TextInput
        placeholder="Enter your Diary Name"
        style={styles.textInputs}
        onChangeText={(text) => setDiaryName(text)}
        value={diaryName}
      />

      <TextInput
        placeholder="Enter your username (Mandatory)"
        style={styles.textInputs}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <TextInput
        placeholder="Enter your password (Mandatory)"
        style={styles.textInputs}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <Pressable onPress={onClickSignUp} style={styles.signUpButton}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      {
          (isLoading) && (
            <ActivityIndicator size="small" color="#0000ff" />
          )
      }

      <View style={styles.signUpRedirectSection}>
        <Text style={styles.bottomText}>Already an User?</Text>
        <Pressable onPress={onClickLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpScreen;
