import React from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import OrfanatosMap from './pages/OrfanatosMap';
import OrfanatosDetalhe from './pages/OrfanatosDetalhe';
import OrfanatoData from './pages/createOrfanatos/OrfanatoData';
import SelecteMapPosition from './pages/createOrfanatos/SelectMapPosition';
import Header from './componentes/Header';
import { StatusBar } from 'expo-status-bar';

const {Navigator, Screen} = createStackNavigator();

export default function Routes(){

    return(
        <NavigationContainer>
            
            <StatusBar style='dark'/>
            
            <Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'}}}>
        
            <Screen name="OrfanatosMap" component={OrfanatosMap} />
            

            <Screen 
                name="OrfanatoDetalhe" 
                component={OrfanatosDetalhe} 
                options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Detalhes" />
                }}/>

            <Screen 
                name="OrfanatoData" 
                component={OrfanatoData} 
                options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Informações Gerais" />
                }}/>

            <Screen 
                name="SelecteMapPosition" 
                component={SelecteMapPosition}
                options={{
                    headerShown: true,
                    header: () => <Header title="Seleção de Localização" />
                }} />
            </Navigator>
        </NavigationContainer>
    );
}