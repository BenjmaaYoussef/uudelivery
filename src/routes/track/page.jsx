import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, Popup } from "react-leaflet";
import useSWR from "swr";
import { BASE_URL } from "@/config";
import { useParams } from "react-router-dom";
import GaugeComponent from "react-gauge-component";
import { Loader } from "lucide-react";
import { getUser } from "@/utils";

export default function Track() {
  const [trackerData, setTrackerData] = useState({});
  let { id } = useParams();
  const fetcher = (url) =>
    fetch(url).then(async (r) => {
      if (!r.ok) {
        throw Error(
          "An error has occurred, please verify current link and try again"
        );
      } else {
        let orderData = await r.json();
        fetch(BASE_URL + "/api/iot/getData", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            deviceProfileId: orderData.trackerId,
          }),
        }).then(async (r2) => {
          if (!r2.ok) {
            throw Error(
              "An error has occurred, please verify current link and try again"
            );
          } else {
            const iot = await r2.json();
            setTrackerData({ ...trackerData, metadata: iot["metadata"] });
            setTrackerData({ ...trackerData, timestamp: iot["timestamp"] });
            setTrackerData({ ...trackerData, data: iot["data"] });
          }
        });
        return orderData;
      }
    });

  const {
    data: orderData,
    error: orderError,
    isLoading: orderLoading,
  } = useSWR(BASE_URL + "/api/order/" + id, fetcher, {
    refreshInterval: 10000,
  });
  console.log(orderError);
  if (orderError)
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on
              other pages.{" "}
            </p>
          </div>
        </div>
      </section>
    );
  if (orderLoading) return <div>loading...</div>;
  return (
    <div>
      <div className="flex items-center flex-col py-5">
        <img src="/logo.png" className="w-64" />
        <h1>Order: #{id}</h1>
      </div>
      <div className="w-full px-6 gap-5 flex flex-col lg:flex-row justify-center">
        <Card className="w-full lg:w-1/2 pt-7">
          <CardContent>
            <div>
              <div className="flex justify-between">
                <h2 className="font-bold">Current status:</h2>
                <div>
                  {!orderData.start && !orderData.end ? "Pending" : ""}
                  {orderData.start && orderData.end ? "Delivered" : ""}
                  {orderData.start && !orderData.end ? "Active" : ""}
                </div>
              </div>
              <div className="flex justify-between">
                <h2 className="font-bold">Destination:</h2>
                <div>{orderData.destination}</div>
              </div>
              {(orderData.start || orderData.end) && (
                <div className="flex justify-center mt-7">
                  <GaugeComponent
                    type="semicircle"
                    arc={{
                      width: 0.2,
                      padding: 0.005,
                      cornerRadius: 1,
                      // gradient: true,
                      subArcs: [
                        {
                          limit: 15,
                          color: "#EA4228",
                          showTick: true,
                          tooltip: {
                            text: "Too low temperature!",
                          },
                          onClick: () =>
                            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                          onMouseMove: () =>
                            console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                          onMouseLeave: () =>
                            console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                        },
                        {
                          limit: 17,
                          color: "#F5CD19",
                          showTick: true,
                          tooltip: {
                            text: "Low temperature!",
                          },
                        },
                        {
                          limit: 28,
                          color: "#5BE12C",
                          showTick: true,
                          tooltip: {
                            text: "OK temperature!",
                          },
                        },
                        {
                          limit: 30,
                          color: "#F5CD19",
                          showTick: true,
                          tooltip: {
                            text: "High temperature!",
                          },
                        },
                        {
                          color: "#EA4228",
                          tooltip: {
                            text: "Too high temperature!",
                          },
                        },
                      ],
                    }}
                    pointer={{
                      color: "#345243",
                      length: 0.8,
                      width: 15,
                      // elastic: true,
                    }}
                    labels={{
                      valueLabel: {
                        formatTextValue: !trackerData.data
                          ? () => "Loading..."
                          : (value) => value + "ºC",
                      },
                      tickLabels: {
                        type: "outer",
                        valueConfig: {
                          formatTextValue: (value) => value + "ºC",
                          fontSize: 10,
                        },
                        ticks: [{ value: 13 }, { value: 22.5 }, { value: 32 }],
                      },
                    }}
                    value={!trackerData.data ? 0 : trackerData.data[1].data}
                    minValue={10}
                    maxValue={35}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        {(orderData.start || orderData.end) && (
          <Card className="w-full lg:w-1/2">
            <CardHeader>
              <CardTitle className="text-center">Location</CardTitle>
            </CardHeader>
            {!trackerData.data ? (
              <CardContent>
                <div className="text-center flex justify-center flex-row">
                  <Loader className="animate-spin" /> Loading map
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <MapContainer
                  center={
                    trackerData.data[0].data.latitude == 0
                      ? [50.109, 14.5128]
                      : [
                          trackerData.data[0].data.latitude,
                          trackerData.data[0].data.longitude,
                        ]
                  }
                  zoom={13}
                  scrollWheelZoom={true}
                  className="w-full h-[200px]"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={
                      trackerData.data[0].data.latitude == 0
                        ? [50.109, 14.5128]
                        : [
                            trackerData.data[0].data.latitude,
                            trackerData.data[0].data.longitude,
                          ]
                    }
                  >
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
              </CardContent>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
