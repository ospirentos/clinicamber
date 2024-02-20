import React from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";

const loader = new Loader({
  apiKey: process.env.WEB_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["maps"],
});

const mapOptions = {
  center: {
    lat: 0,
    lng: 0,
  },
  zoom: 18,
};

export const GoogleMap = () => {
  let map;

  useEffect(() => {
    loader.importLibrary("maps").then(({ Map }) => {
      map = new Map(document.getElementById("map"), mapOptions);

      loader.importLibrary("places").then(({ PlacesService }) => {
        let service = new PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
          if (status === "OK") {
            loader.importLibrary("marker").then(({ Marker }) => {
              const mark = new Marker({
                title: "ÖZEL AMBER AĞIZ VE DİŞ SAĞLIĞI POLİKLİNİĞİ",
                position: results[0].geometry.location,
                map,
              });
              mark.addListener("click", () => {
                window.open(
                  "https://www.google.com/maps/place/%C3%96ZEL+AMBER+A%C4%9EIZ+VE+D%C4%B0%C5%9E+SA%C4%9ELI%C4%9EI+POL%C4%B0KL%C4%B0N%C4%B0%C4%9E%C4%B0/@40.8679182,29.2804051,17z/data=!3m1!4b1!4m6!3m5!1s0x14cac6fd2c181e7d:0x36ff83eeacc6075e!8m2!3d40.8679142!4d29.28298!16s%2Fg%2F1tcy_k50?entry=ttu",
                  "_blank"
                );
              });
            });
            map.setCenter(results[0].geometry.location);
          }
        });
      });
    });

    let request = {
      query: "ÖZEL AMBER AĞIZ VE DİŞ SAĞLIĞI POLİKLİNİĞİ",
      fields: ["name", "geometry"],
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: 300 }}></div>;
};
