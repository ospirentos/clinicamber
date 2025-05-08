import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useMatches } from "react-router";
import type { RootLoader } from "~/root";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 40.86791535045365,
  lng: 29.28302250409582,
};

export const Map = () => {
  const matches = useMatches();
  const { ENV } = matches.find((match) => match.id === "root")?.data as RootLoader;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: ENV.GOOGLE_API_KEY,
  });

  const redirectUserToLocation = () => {
    window.open(
      "https://www.google.com/maps/place/%C3%96ZEL+AMBER+A%C4%9EIZ+VE+D%C4%B0%C5%9E+SA%C4%9ELI%C4%9EI+POL%C4%B0KL%C4%B0N%C4%B0%C4%9E%C4%B0/@40.8679182,29.2804051,17z/data=!3m1!4b1!4m6!3m5!1s0x14cac6fd2c181e7d:0x36ff83eeacc6075e!8m2!3d40.8679142!4d29.28298!16s%2Fg%2F1tcy_k50?entry=ttu",
      "_blank"
    );
  };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
      <Marker
        position={center}
        title="ÖZEL AMBER AĞIZ VE DİŞ SAĞLIĞI POLİKLİNİĞİ"
        onClick={redirectUserToLocation}
      />
    </GoogleMap>
  ) : (
    <></>
  );
};
