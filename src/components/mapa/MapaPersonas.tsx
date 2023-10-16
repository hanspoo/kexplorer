import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

import moment from "moment";
import { elapsedAsString, titleCase } from "../../utils";
import { MedicionGPS } from "../../types";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
// const iconSVG =
//   "M62 23.448L40.544 2c-.315 2.875.297 6.054 1.764 9.111L27.77 25.646c-5.529-3.519-11.593-5.079-16.941-4.483l14.143 14.148C18.714 42.195 4.687 59.055 2.59 61.152l-.071.068c-.845.844-.586 1.106.258.262c1.852-1.846 18.983-16.113 25.92-22.445L42.83 53.174c.592-5.298-.927-11.291-4.369-16.772l14.62-14.616c2.995 1.399 6.103 1.975 8.919 1.662";
const iconSVG =
  "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z";
const API_KEY = "AIzaSyCTr0SragsFi7KVX-4wsmN9rXeYxk-iOaY";

type Props = {
  mediciones: MedicionGPS[];
};

const divStyle = {};
function Huemul({ mediciones }: Props) {
  const [medicionActual, setMedicionActual] = useState<MedicionGPS | undefined>();
  const [mostrarNombre, setMombre] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = React.useState<any>();
  useEffect(() => {
    if (map && mediciones) {
      const bounds = new window.google.maps.LatLngBounds();
      mediciones.map(({ lat, lng }) => {
        bounds.extend({
          lat,
          lng,
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, mediciones]);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const porPaciente = mediciones.reduce((acc: Record<string, MedicionGPS[]>, iter: MedicionGPS) => {
    const { idPaciente } = iter;

    const actual = acc[idPaciente];
    if (actual) {
      acc[idPaciente] = [...actual, iter];
    } else {
      acc[idPaciente] = [iter];
    }

    return acc;
  }, {});

  const primeraCadaPaciente = Object.keys(porPaciente).reduce(
    (acc: Record<string, MedicionGPS>, idPaciente: string) => {
      const arrayMediciones = acc[idPaciente];
      if (arrayMediciones) return acc;

      acc[idPaciente] = porPaciente[idPaciente][0];
      return acc;
    },
    {}
  );

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
      {medicionActual && (
        <InfoWindow
          position={{ lat: medicionActual.lat, lng: medicionActual.lng }}
          onCloseClick={() => setMedicionActual(undefined)}
        >
          <div style={divStyle}>
            <b>{medicionActual.paciente}</b>
            <p>
              <Desde unix={medicionActual.fecha} />
            </p>
          </div>
        </InfoWindow>
      )}
      {Object.values(primeraCadaPaciente).map((medicion) => {
        const { idPaciente, paciente, lat, lng, fecha } = medicion;
        const horas = moment().diff(moment.unix(fecha), "hours");
        const opacidad = horas === 0 ? 1 : 1 / horas;

        return (
          <Marker
            icon={{
              path: iconSVG,
              fillColor: `rgba(255,0,0,1)`,
              fillOpacity: opacidad,
              scale: 2,
              strokeColor: "brown",
              strokeWeight: 1,
            }}
            position={{ lat, lng }}
            title={paciente}
            key={idPaciente}
            label={paciente}
            onClick={() => setMedicionActual(medicion)}
          />
        );
      })}
    </GoogleMap>
  ) : null;
}

export default React.memo(Huemul);
// export default Huemul;

function Desde({ unix }: { unix: number }) {
  const desde = moment.unix(unix);

  var duration = elapsedAsString(desde, moment());

  return <span>hace {duration}</span>;
}
