import { View, Text, StyleSheet, SafeAreaView, Image, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.TOP);
    };

    const handleRegister = async () => {
        setErrorEmail('');
        setErrorUsername('');
        setErrorPassword('');
        
        let valid = true;

        if (!email) {
            setErrorEmail('Email không được để trống');
            valid = false;
        }
        if (!username) {
            setErrorUsername('Tên người dùng không được để trống');
            valid = false;
        }
        if (!password) {
            setErrorPassword('Mật khẩu không được để trống');
            valid = false;
        }

        if (valid) {
            const newUser = { username, password, email };
            try {
                const res = await axios.post('http://10.0.2.2:3000/v1/auth/register', newUser);
                if (res?.data.username) {
                    showToast("Đăng ký tài khoản thành công");
                    navigation.navigate('login');
                }
            } catch (error) {
                showToast("Đã có lỗi xảy ra. Vui lòng thử lại");
            }
        } else {
            showToast("Vui lòng điền đầy đủ thông tin");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoBlock}>
                <Image style={styles.logo} source={require('../image/logo.jpg')} />
            </View>
            <Input
                errorMessage={errorEmail}
                onChangeText={newText => setEmail(newText)}
                placeholder='Nhập email của bạn'
                label='Email' />
            <Input
                errorMessage={errorUsername}
                onChangeText={newText => setUsername(newText)}
                placeholder='Tên của bạn'
                label='Tên đăng nhập' />
            <Input
                errorMessage={errorPassword}
                onChangeText={newText => setPassword(newText)}
                placeholder='Tạo mật khẩu '
                label='Mật khẩu'
                secureTextEntry />
            <Button onPress={handleRegister} title='Đăng ký' buttonStyle={styles.button} />
            <Button title='Đã có tài khoản' buttonStyle={styles.button} onPress={() => navigation.navigate('login')} />
        </View>
    );
};

export default Register;

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
});
