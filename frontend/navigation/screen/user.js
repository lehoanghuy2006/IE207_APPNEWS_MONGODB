import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, SafeAreaView, } from 'react-native';
import { signOut } from 'firebase/auth';
import { Input, button } from 'react-native-elements';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const User = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");



    useEffect(() => {
        const getStorage = async () => {
            const emailStorage = await AsyncStorage.getItem('email');
            const usernameStorage = await AsyncStorage.getItem('username');

            if (emailStorage && usernameStorage) {
                setEmail(emailStorage)
                setUsername(usernameStorage)
            }
        }
        getStorage();
    }, [])



    const logout = async () => {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('username');

        navigation.navigate('login')
    };

    return (
        <SafeAreaView style={styles.safeView}>
            <Text style={styles.header}>Cá nhân </Text>
            <View style={styles.container}>
                <Image style={styles.avatar} />
                <View style={styles.avt}>

                    <Text style={styles.text}>Name: {username}</Text>
                    <Text style={styles.text}>Email: {email}</Text>
                </View>

                <View style={styles.btnContainer}>

                    {/* <Input placeholder='Nhập tên mới của bạn' label='Tên mới'/>
                <Button title="Lưu"/>
            <View style={styles.btn}>
                <Button title="Đổi tên"/>
            </View>
              
            <View>
                <Input
                    placeholder='Nhập mật khẩu cũ của bạn'
                    label='Mật khẩu cũ'/>
                <Input
                    placeholder='Nhập mật khẩu mới'
                    label='Mật khẩu mới'/>
                <Button title="Lưu"/>
            </View>
          
            <View style={styles.btn}>
                <Button title="Đổi mật khẩu"/>
            </View> */}

                    <View style={styles.lgBtn} >
                        <Button title='Đăng xuất'
                            onPress={() => logout()}
                        />
                    </View>

                </View>

            </View>

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    avatar: {

        width: 100,
        height: 100,
        borderRadius: 100,
        margin: 30,

    },
    btn: {
        margin: 10,
        width: '70%',
    },
    btnContainer: {
        marginTop: 30,
        alignItems: 'center',
        paddingLeft: 70,
        paddingRight: 70,
        justifyContent: 'center',

    },
    text: {
        marginLeft: 20,
        fontSize: 20,
        marginBottom: 10,
    },
    safeView: {
        flex: 1,
        marginTop: 40,
    },
    info: {

    },
    lgbtn: {
        backgroundColor: 'red'
    },
    lgBtn: {
        margin: 20,
        width: 130,
    },
    avt: {
        marginLeft: 20,
    }
});

export default User;
