import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { userState } from "../../atom/userAtom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { APP_URL } from "@env";

const UpdateDiaryNameScreen = () => {
  const [user, setUser] = useRecoilState<any>(userState);
  const [newDiaryName, setNewDiaryName] = useState(user.diaryname);
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  const changeName = async () => {
      const response = await fetch(`${APP_URL}/user/updatediaryname`, {
          method: 'PUT',
          headers: {
              'auth-token': await AsyncStorage.getItem('auth-token'),
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              diaryname: newDiaryName
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

      console.log(data)
      setUser(data)

      setIsLoading(false)

      navigation.goBack()
  }

  const onClickChangeName = () => {
      if(isLoading){
          return
      }

      setIsLoading(true)

      if(newDiaryName.length > 20){
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

      changeName()
  }

  const onBackButtonClick = () => {
      if(isLoading){
          return
      }
      navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Text style={styles.heading}>Update Diary Name</Text>

      <TextInput
        placeholder="Enter New Diary Name"
        style={styles.textInputs}
        onChangeText={(text) => setNewDiaryName(text)}
        value={newDiaryName}
      />

      <Pressable onPress={onClickChangeName} style={styles.changeConfirmButton}>
        <Text style={styles.buttonText}>Change Name</Text>
      </Pressable>

      {
        (isLoading) && (
          <ActivityIndicator size="small" color="#0000ff" />
        )
      }


      <View style={styles.backRedirectSection}>

        <Pressable onPress={onBackButtonClick} style={styles.backButton}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default UpdateDiaryNameScreen;
