import React from "react";
import { useEffect } from "react";
import io, { Socket } from "socket.io-client";

import { KafkaSocketEvent } from "../../types";
import moment from "moment";
import Huemul from "./MapaPersonas";

import { CustomMessage, prepareMessage, Waiting } from "../utils/utils";
import { toMedicionGPS } from "../../hooks/utils-gps";

const topic = "medicion-gps";
const date = moment().subtract(6, "hour").toISOString();

const MapsExplorer = () => {
  const [connectionReady, setConnectionReady] = React.useState(false);
  const [error, setError] = React.useState("");
  const [running, setRunning] = React.useState(true);
  const [q, setSearch] = React.useState("");
  const [list, setList] = React.useState<Array<CustomMessage>>([]);
  const [socket, setSocket] = React.useState<Socket>();

  useEffect(() => {
    fetch(`/api/kafka-web-socket?date=${date}&topic=${topic}`, {}).finally(() => {
      const sock = io();
      setSocket(sock);

      sock.on("connect", () => {
        console.log("connect");
      });
      sock.on("error", (error: string) => {
        setError(error);
      });

      sock.on("connection-ready", () => {
        console.log("Recibido connection-ready ****");

        setConnectionReady(true);
      });

      sock.on("kafka-record", (data: string) => {
        if (!running) return;

        const msg: KafkaSocketEvent = JSON.parse(data) as KafkaSocketEvent;

        const m = [prepareMessage(msg)];
        setList((list) => m.concat(list));
      });

      sock.on("a user connected", () => {
        console.log("a user connected");
      });

      sock.on("disconnect", () => {
        console.log("disconnect");
      });
    });
  }, [running]);

  console.log("hay " + list.length);
  if (error) return <p>{error}</p>;

  if (!connectionReady) return <Waiting />;

  const mediciones = toMedicionGPS(list);
  return <Huemul mediciones={mediciones} />;
};

export default MapsExplorer;
