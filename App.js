import React, { useState, useEffect } from "react";
import axios from "axios";
import MapView, { Marker } from 'react-native-maps';
import { StatusBar, Alert, Text, View, StyleSheet, Modal, Pressable } from 'react-native';
import styled from 'styled-components/native';
import {alignItems} from "styled-system";





export default function App() {
   const [items, setItems] = useState([]);
   const [markers, setMarkers] = useState( [{
        title: '5 Гуртожиток',
        coordinate: { latitude: 49.827891, longitude:  24.068852, },
        description: 'Тут живе Тарас',
    }]);
   const [isModalOpened, setIsModalOpened] = useState(false)
   const [region, setRegion] = useState({
       latitude: 49.827891,
       longitude:  24.068852,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
   })


    const onRegionChange = (region) => {
        setRegion(region)
    }

    const onMarkerPress = () => {
        setIsModalOpened(true)
    }

   React.useEffect(() => {
       axios
           .get('https://636a4c94c07d8f936d99721c.mockapi.io/some-news')
           .then(({ data }) => {
               setItems(data);
           })
           .catch((err) =>{
               console.log(err);
               Alert.alert("Error", "data no taken");
       });
   }, []);


  return (

    <_MapView>
        <HeaderWrapperJotun>
            <Text
            style={ {
                alignItems: "center",
                fontSize: 26,
                marginTop: 20,
            } }
            >
                Jotun</Text>

        </HeaderWrapperJotun>

        <MapView
            style={styles.map}
            initialRegion={region}
            onRegionChange={onRegionChange}
        >
            { markers.map((marker, idx) => {
                return <Marker key={idx} { ...marker }
                               onPress={onMarkerPress}
                               image={require('./assets/marker5.png')}
                >
                    <View style={ {width: 10, height: 10}}></View>
                </Marker>
            }) }
        </MapView>
      <StatusBar theme="auto"/>
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={false} //!
                onRequestClose={ () => {
                    Alert.alert("Modal has been closed.");
                    setIsModalOpened(!isModalOpened);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setIsModalOpened(!isModalOpened)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setIsModalOpened(true)}
            >

            </Pressable>
        </View>
    </_MapView>
  );
}



const _MapView = styled.View`
  
  height: 100%;
`;
const HeaderWrapperJotun = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
`;

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

