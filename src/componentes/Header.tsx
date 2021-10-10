import { useLinkProps, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'

//para nao abrigatoria so colcoar title?:
interface HeaderProps{
    title: string,
    showCancel?: boolean
}

export default function Header({title, showCancel = true}: HeaderProps){

    const navigation = useNavigation();

    function handleGoBackToHome(){
        navigation.navigate('OrfanatosMap');
    }

    return (
        <View style={estilo.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15b6d6" />
            </BorderlessButton>

            <Text style={estilo.title}>{title}</Text>

            {showCancel ? (
                <BorderlessButton onPress={handleGoBackToHome}>
                <Feather name="x" size={24} color="#ff669d" />
            </BorderlessButton>
            ) : (
                <View />
            )}
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16,
    }
})