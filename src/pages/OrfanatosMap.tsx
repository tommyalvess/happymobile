import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import mapMarker from '../images/map-marker.png'
import {Feather} from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import api from '../server/api';
import * as Location from 'expo-location';
import { AppLoading } from 'expo';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface Localiza {
  coords: {
    latitude: number;
    longitude: number;
  }
}

export default function OrfanatosMap() {

const navigation = useNavigation();
const [orphanages, setOrphanes] = useState<Orphanage[]>([]);
const [latitude, setLatitude] = useState(0);
const [longitude, setLongitude] = useState(0);
const [errorMsg, setErrorMsg] = useState("");

useEffect(() => {
  myPermission();
  mylocation();
}, []);

useFocusEffect(() => {
  api.get('ophanages').then(response => {
    setOrphanes(response.data);
  });
  mylocation();
});

async function mylocation() {

  let locationA = await Location.getCurrentPositionAsync({});  

  let latitudeA = locationA.coords.latitude; 
  let longitudeB = locationA.coords.longitude;
  
  const lat = latitudeA.toString().substr(0, 10);
  const lon = longitudeB.toString().substr(0, 10);

  const latF = parseInt(lat);
  const lonF = parseInt(lon);

  setLatitude(latitudeA);
  setLongitude(longitudeB);    
}

function handleNavigateToDetalhes(id: number){
    navigation.navigate('OrfanatoDetalhe', {id});
}

function handleNavigateToAdd(){
    navigation.navigate('SelecteMapPosition');
}

async function myPermission(){
  let { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }
}

  return (
    
    <View style={styles.container}>
      {
        latitude != 0  && longitude != 0 ? 
        (
          <MapView 
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        >

        {orphanages.map(orphanage => {
          return (
              <Marker 
                  key={orphanage.id}
                  icon={mapMarker}
                  calloutAnchor={{
                    x: 2.7,
                    y: 0.8,
                  }}
                  coordinate={{
                    latitude: orphanage.latitude,
                    longitude: orphanage.longitude,
                  }}
                >
                  <Callout tooltip onPress={ () => handleNavigateToDetalhes(orphanage.id)}>
                    <View style={styles.calloutContainer}>
                      <Text style={styles.calloutText}>{orphanage.name}</Text>
                    </View>
                  </Callout>
              </Marker>
            )
          })}
          
          </MapView>
        ) : 
        (
          <AppLoading />
        )     
      }
        <View style={styles.footer}>
            <Text style={styles.footerText}> {orphanages.length} orfanatos encontrados</Text>
            <TouchableOpacity style={styles.createOrphanageButton} onPress={handleNavigateToAdd}>
              <Feather name="plus" size={12} color="#fff"/>
            </TouchableOpacity>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    alignItems: 'center',
    justifyContent: 'center',
  },
  map : {
    flex: 1,  
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold'
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
