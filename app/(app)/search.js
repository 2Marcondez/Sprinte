import React, { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT} from "react-native-maps";
import MapViewStyle from "../../utils/MapViewStyle.json"; // Verifique se o caminho está correto
import { UserLocationContext } from "../../context/UserLocationContext";

export default function SearchScreen() {
  const { location, errorMsg } = useContext(UserLocationContext);

  if (!location && !errorMsg) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando localização...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      < Text>
        Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
          <MapView
              style={styles.map}
              provider={PROVIDER_DEFAULT}
              customMapStyle={MapViewStyle}
              region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
          <Marker
          coordinate={{
            latitude:location?.latitude,
            longitude:location?.longitude
          }}
        >
        </Marker>
          </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "120%", // Ajustei para ocupar quase toda a tela
  },
});