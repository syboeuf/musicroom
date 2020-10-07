import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "react-native-elements";

import Icon from "react-native-vector-icons/MaterialIcons";
import BackWard from "react-native-vector-icons/Ionicons";

import MapView, { Marker, Circle } from "react-native-maps";

const Map = ({ route, navigation }) => {
  const { coordsEvent, coordsUser } = route.params;
  const [userLocation, setUserLocation] = useState(coordsUser);
  const [positionMap, setPositionMap] = useState({
    ...coordsEvent,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const circle = {
    center: coordsEvent,
    radius: 1000,
  };
  const mapRef = useRef(null);

  const setZoom = (increase) => {
    let { latitudeDelta, longitudeDelta } = positionMap;
    const newPositionMap = {
      ...positionMap,
      latitudeDelta: increase ? latitudeDelta / 2 : latitudeDelta * 2,
      longitudeDelta: increase ? longitudeDelta / 2 : longitudeDelta * 2,
    };
    setPositionMap(newPositionMap);
    mapRef.current.animateToRegion(newPositionMap);
  };

  const onRegionChange = (region) => {
    setPositionMap(region);
  };

  const newCoordinate = (e) => {
    const {
      coordinate: { latitude, longitude },
    } = e.nativeEvent;
    const newPositionMap = { ...positionMap, longitude, latitude };
    setUserLocation({
      latitude,
      longitude,
    });
    setPositionMap({ ...positionMap, longitude, latitude });
    mapRef.current.animateToRegion(newPositionMap);
  };

  const centerMap = () => {
    const { latitude, longitude } = userLocation;
    const newPositionMap = { ...positionMap, longitude, latitude };
    setPositionMap({ ...positionMap, longitude, latitude });
    mapRef.current.animateToRegion(newPositionMap);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ zIndex: 100000 }}>
        <Header
          backgroundColor="#633689"
          centerComponent={{ text: "Map", style: { color: "#fff" } }}
          leftComponent={
            <View style={{ zIndex: 10 }}>
              <BackWard
                onPress={() =>
                  navigation.navigate("EventDetails", {
                    newCoordsUser: userLocation,
                  })
                }
                name="md-arrow-back"
                size={24}
                color="white"
              />
            </View>
          }
        />
      </View>
      <View style={styles.container}>
        <View style={{ zIndex: 100000 }}>
          <View style={styles.iconContainer}>
            <Icon onPress={() => centerMap()} name="my-location" size={24} />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="zoom-in" size={24} onPress={() => setZoom(true)} />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="zoom-out" onPress={() => setZoom(false)} size={24} />
          </View>
        </View>
        <MapView
          style={styles.map}
          initialRegion={positionMap}
          // onRegionChange={(region) => onRegionChange(region)}
          // onPress={(e) => newCoordinate(e)}
          zoomEnabled={false}
          minZoomLevel={5}
          maxZoomLevel={19}
          ref={mapRef}
        >
          <Marker
            coordinate={userLocation}
            title={"me"}
            description={"location"}
            onPress={(e) => newCoordinate(e)}
          />
          <Marker
            coordinate={circle.center}
            title={"eventTitle"}
            description={"descriptionEvent"}
          />
          <Circle
            center={circle.center}
            radius={circle.radius}
            fillColor="rgba(107, 185, 240, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
            zIndex={2}
            strokeWidth={2}
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: "black",
    zIndex: 10,
    backgroundColor: "white",
    padding: 5,
    marginTop: 5,
    marginRight: 5,
  },
});

export default Map;
