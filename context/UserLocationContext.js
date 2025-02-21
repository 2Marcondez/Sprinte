import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

export const UserLocationContext = createContext(null);

export const UserLocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let subscription;

    const fetchLocation = async () => {
      try {
        console.log("Solicitando permissão de localização...");
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permissão de localização negada");
          console.warn("Permissão negada pelo usuário.");
          return;
        }

        console.log("Permissão concedida! Obtendo localização...");
        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        console.log("Localização obtida:", currentLocation.coords);
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } catch (error) {
        console.error("Erro ao obter localização:", error);
        setErrorMsg("Erro ao obter localização");
      }
    };

    fetchLocation();

    // Opcional: atualizar localização em tempo real
    // subscription = Location.watchPositionAsync(
    //   { accuracy: Location.Accuracy.High, timeInterval: 10000, distanceInterval: 10 },
    //   (newLocation) => {
    //     setLocation({
    //       latitude: newLocation.coords.latitude,
    //       longitude: newLocation.coords.longitude,
    //     });
    //   }
    // );

    // return () => subscription && subscription.remove();
  }, []);

  return (
    <UserLocationContext.Provider value={{ location, setLocation, errorMsg }}>
      {children}
    </UserLocationContext.Provider>
  );
};