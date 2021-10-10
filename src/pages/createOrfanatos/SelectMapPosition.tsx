import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent, PROVIDER_GOOGLE} from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

import * as Location from 'expo-location';


export default function SelecteMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({latitude: 0, longitude: 0});
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  
  function handleNextStep() {
    navigation.navigate('OrfanatoData', {position});
  }

  function handleSelectMapPosition(event: MapEvent){
      setPosition(event.nativeEvent.coordinate);
  }

  async function mylocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.watchPositionAsync(
        {
            //enableHighAccuracy: true,
            distanceInterval: 10,
            timeInterval: 10000
        },
        NewLocation => {
          let coords = NewLocation.coords;
          console.log("NEW LOCATION COORDS", coords);
        }
      );
    console.log(location);
    
    setLocation(location);
  }

  useEffect(() => {
    console.log("foii");
    
  },[])

  useFocusEffect(() => {
    
  });

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: -23.575361,
          longitude: -46.781066,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude != 0 && (
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        )}
      </MapView>

      {position.latitude != 0 && (
          <RectButton style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Próximo</Text>
          </RectButton>
        )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    alignItems: 'center',
    justifyContent: 'center',
    //position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})