import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput } from 'react-native';
import  MapView, {Marker, Callout} from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main( {navigation} ) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
          const { granted } = await requestPermissionsAsync();

          if(granted) {
              const { coords } = await getCurrentPositionAsync({
                  enableHighAccuracy: true,
              });

              const { latitude, longitude } = coords;

              setCurrentRegion({
                  latitude,
                  longitude,
                  latitudeDelta:0.04,
                  longitudeDelta:0.04,
              })
          }
        }
    loadInitialPosition();
    }, []); 

    if (!currentRegion) {
        return null;
    }

    return (
        <MapView initialRegion={currentRegion} style={ styles.map }>
            <Marker coordinate={ { latitude: -27.5588003, longitude: -48.4887233 } }>
                <Image style={styles.avatar} source={ {uri: 'https://avatars1.githubusercontent.com/u/48498808?s=460&v=4' } }/>

                <Callout onPress={() => {
                    navigation.navigate('Profile', { github_username: 'danilo992' });
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Danilo Tadeu</Text>
                        <Text style={styles.devBio}>Curso Rocketseat 2020</Text>
                        <Text style={styles.devTechs}>ReacJS, React Native, Node.js</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    );
}

const styles= StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 40,
        borderWidth: 4,
        borderColor:  '#7D40E7',
    },
    callout: {
        width: 260,
    },

    devName: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    deTechs: {
        marginTop: 5,
    }
    
});

export default Main;