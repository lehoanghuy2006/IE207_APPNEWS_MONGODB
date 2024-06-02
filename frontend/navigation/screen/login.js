import { View, Text, StyleSheet, SafeAreaView,Image, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, Button } from 'react-native-elements';
import { Link } from "react-router-dom"
// import { loginUser } from '../../../backend/controllers/authControllers';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({ navigation }) => {
    const signIn = ({navigation}) => {}
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.TOP);
      };
    


    const handleLogin = async () => {
        const newUser = {
            username: username,
            password: password,
        };
        if (username !== '' && password !== '') {
            try {
                const res = await axios.post('http://10.0.2.2:3000/v1/auth/login', newUser);
                if(res?.data.email){
                    await AsyncStorage.setItem('email', res?.data.email);
                    await AsyncStorage.setItem('username', res?.data.username);
                    navigation.navigate('HomeTabs')
                }
            } catch (error) {
                showToast("Sai tai khoan hoac mat khau roi kia!")
            }
        } else {
            // dsd
        }
    };
    
    return (
        
        <SafeAreaView style={styles.safeView}>
        
        <View style={styles.logoBlock}><Image style={styles.logo} source={require('../image/logo.jpg')} /></View>
            
            
            <View style={styles.container}>
                
                <Input style={styles.input} 
                    placeholder='Tài khoản' onChangeText={newText => setUsername(newText)}
                    />
                <Input style={styles.input}
                    placeholder='Mật khẩu' onChangeText={newText => setPassword(newText)}

                    />
                <Button title='Đăng nhập' buttonStyle={styles.button} onPress={() => handleLogin()}/>
                
            </View>

            <View style={styles.container}>
                <Button title='Đăng kí' buttonStyle={styles.button} onPress={()=> navigation.navigate('sign-up')}/>
            </View>


        </SafeAreaView>
   
    )
}

export default Login
const styles = StyleSheet.create({
    button: {
        width: 250,
        height:50,
        marginTop: 20,
    },
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
    },
    safeView: {
        flex:1,
        
    },
    logoBlock:{
        marginTop:'30%',
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
        width:146,
        height:150,
        resizeMode:'contain',
        borderRadius:100,
        justifyContent:'center'
    },
})