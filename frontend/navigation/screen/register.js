import { View, Text, StyleSheet, SafeAreaView, Image, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.TOP);
      };

    const handleRegister = async () => {
        const newUser = {
            username,
            password,
            email
        };
        if (username !== '' && password !== '' && email !== "") {
            try {
                const res = await axios.post('http://10.0.2.2:3000/v1/auth/register', newUser);
                if (res?.data.username) {
                    showToast("Tao tai khoan thanh cong!")
                    navigation.navigate('login')
                }
            } catch (error) {
                showToast("Da co loi xay ra vui long thu lai!")
            }
        } else {
            showToast("Phai nhap du du lieu!")
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoBlock}><Image style={styles.logo} source={require('../image/logo.jpg')} /></View>
            <Input
                onChangeText={newText => setUsername(newText)}
                placeholder='Nhập tên của bạn' />

            <Input
                onChangeText={newText => setEmail(newText)}
                placeholder='Nhập email của bạn'
                label='Email' />

            <Input
                onChangeText={newText => setPassword(newText)}
                placeholder='Nhập mật khẩu '
                label='Mật khẩu'
            // leftIcon={{ name: 'lock', type: 'material' }}
            // value={password}
            />



            <Button onPress={() => handleRegister()} title='Đăng kí' buttonStyle={styles.button} />
            <Button title='Đã có tài khoản' buttonStyle={styles.button}
                onPress={() => navigation.navigate('login')}
            />

        </View>
    )
}

export default Register
const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 50,
        marginTop: 20,
    },
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
    },
    logoBlock: {
        marginTop: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 146,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 100,
        justifyContent: 'center'
    },
})
