import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, keyboard } from 'react-native';
import  MapView, {Marker, Callout} from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main( {navigation} ) {
    const [devs, setDevs] = useState([]);
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

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        const res = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs: 'ReactJS'
            }
        });
        setDevs(res.data);
    }

    function handleRegionChanged(region) {
        console.log(region)
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null;
    }

    return (
    <>
        <MapView  
            onRegionChangeComplete={handleRegionChanged}
            initialRegion={currentRegion} 
            style={ styles.map }
        >
            <Marker 
                coordinate={ { 
                latitude: -27.5588003, 
                longitude: -48.4887233 } }
            >
                <Image 
                    style={styles.avatar} 
                    source={ {uri: 'https://avatars1.githubusercontent.com/u/48498808?s=460&v=4' } }
                />

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
        <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    palceholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                
            <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    </>        
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
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#000',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        marginLeft: 15,
        alignItems: 'center',
    }
    
});

export default Main;