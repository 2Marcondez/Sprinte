import { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { UserLocationContext } from "../context/UserLocationContext";

export default function({ children }) {
  const { setLocation } = useContext(UserLocationContext);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        console.log("Solicitando permissão de localização...");
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== "granted") {
          setErrorMsg("Permissão de localização negada");
          console.warn("Permissão negada pelo usuário.");
          return;
        }

        console.log("Permissão concedida! Obtendo localização...");
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High, // Usa maior precisão disponível
        });

        console.log("Localização obtida com sucesso!", loc.coords);
        
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      } catch (error) {
        console.error("Erro ao obter localização:", error);
      }
    };

    if (setLocation) {
      getCurrentLocation();
    } else {
      console.warn("setLocation não está definido ainda!");
    }
  }, [setLocation]);

  return children;
}
