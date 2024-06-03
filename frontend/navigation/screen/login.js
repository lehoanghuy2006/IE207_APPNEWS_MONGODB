import { View, Text, StyleSheet, SafeAreaView,Image, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const signIn = ({navigation}) => {}
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');


    
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.TOP);
      };
    
    const handleLogin = async () => {
        setErrorUsername('');
        setErrorPassword('');
        
        let valid = true;

        if (!username) {
            setErrorUsername('Tên người dùng không được để trống');
            valid = false;
        }
        if (!password) {
            setErrorPassword('Mật khẩu không được để trống');
            valid = false;
        }
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
                showToast("Tài khoản hoặc mật khẩu không đúng !")
            }
        } else {
        }
    };
    
    return (
       <View style={styles.container}>
            <View style={styles.logoBlock}>
            <Image style={styles.logo} source={require('../image/logo.jpg')} />
            </View>
               <Input style={styles.input}  errorMessage={errorUsername}
                    placeholder='Tài khoản' onChangeText={newText => setUsername(newText)}
                    />
                <Input style={styles.input} errorMessage={errorPassword}
                    secureTextEntry
                    placeholder='Mật khẩu' onChangeText={newText => setPassword(newText)}/>
        
            <View style={styles.container1}>
                <Button title='Đăng nhập' buttonStyle={styles.button} onPress={() => handleLogin()}/>
                <Button title='Đăng kí' buttonStyle={styles.button} onPress={()=> navigation.navigate('sign-up')}/>
            </View>

       </View>

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
    container1: {
        alignItems: 'center',
    },
    input:{
        paddingLeft: 30,
        paddingRight: 30,
    },
    safeView: {
        flex:1,
        
    },
    logoBlock:{
        marginTop:'30%',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:30
    },
    logo:{
        width:146,
        height:150,
        resizeMode:'contain',
        borderRadius:100,
        justifyContent:'center'
    },
})