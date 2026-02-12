"use client";

import { useMemo, useState } from "react";

type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  specialItem: string;
  lat: number;
  lng: number;
};

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Spice Route Kitchen",
    cuisine: "Indian",
    rating: 4.8,
    specialItem: "Tandoori Butter Prawns",
    lat: 40.7415,
    lng: -73.9897,
  },
  {
    id: 2,
    name: "Neon Noodle House",
    cuisine: "Asian Fusion",
    rating: 4.7,
    specialItem: "Truffle Miso Ramen",
    lat: 40.7346,
    lng: -73.9984,
  },
  {
    id: 3,
    name: "Bella Forno",
    cuisine: "Italian",
    rating: 4.9,
    specialItem: "Burrata Pistachio Pizza",
    lat: 40.7298,
    lng: -73.9879,
  },
  {
    id: 4,
    name: "Fuego Grill Lab",
    cuisine: "Latin",
    rating: 4.6,
    specialItem: "Smoked Chipotle Street Tacos",
    lat: 40.7477,
    lng: -73.9791,
  },
  {
    id: 5,
    name: "Harvest & Hearth",
    cuisine: "Farm to Table",
    rating: 4.7,
    specialItem: "Maple Glazed Salmon Bowl",
    lat: 40.7368,
    lng: -73.9754,
  },
];

const toRadians = (value: number) => (value * Math.PI) / 180;

const getDistanceKm = (
  userLat: number,
  userLng: number,
  restaurantLat: number,
  restaurantLng: number,
) => {
  const earthRadiusKm = 6371;
  const dLat = toRadians(restaurantLat - userLat);
  const dLng = toRadians(restaurantLng - userLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(userLat)) *
      Math.cos(toRadians(restaurantLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

export default function Home() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationMessage, setLocationMessage] = useState(
    "Enable location to discover nearby foodie spots.",
  );

  const restaurantsWithDistance = useMemo(() => {
    if (!userLocation) {
      return restaurants.map((restaurant) => ({
        ...restaurant,
        distanceKm: null,
      }));
    }

    return restaurants
      .map((restaurant) => ({
        ...restaurant,
        distanceKm: getDistanceKm(
          userLocation.lat,
          userLocation.lng,
          restaurant.lat,
          restaurant.lng,
        ),
      }))
      .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  }, [userLocation]);

  const topRecommendation = restaurantsWithDistance[0];
  const mapTarget = topRecommendation ?? restaurants[0];
  const mapPadding = 0.03;
  const bbox = `${mapTarget.lng - mapPadding},${mapTarget.lat - mapPadding},${mapTarget.lng + mapPadding},${mapTarget.lat + mapPadding}`;

  const getLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationMessage("Geolocation is not supported in this browser.");
      return;
    }

    setLocationMessage("Finding your foodie zone...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationMessage("Your nearby restaurant feed is now personalized.");
      },
      () => {
        setLocationMessage("Location access denied. Showing popular picks near downtown.");
      },
    );
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100 md:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Foodie FOMO</p>
          <h1 className="mt-3 text-3xl font-bold md:text-5xl">Don&apos;t miss the hottest bite near you</h1>
          <p className="mt-4 max-w-3xl text-zinc-300">
            Discover the best nearby restaurants, sorted by your current location, and get one
            signature dish recommendation from each place.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={getLocation}
              className="rounded-full bg-orange-500 px-5 py-2.5 font-semibold text-zinc-950 transition hover:bg-orange-400"
            >
              Use my location
            </button>
            <p className="text-sm text-zinc-300">{locationMessage}</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Nearby recommendations</h2>
              {userLocation && (
                <span className="text-xs text-zinc-400">
                  You: {userLocation.lat.toFixed(3)}, {userLocation.lng.toFixed(3)}
                </span>
              )}
            </div>

            <ul className="space-y-3">
              {restaurantsWithDistance.map((restaurant, index) => (
                <li
                  key={restaurant.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-orange-400/60"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-orange-300">
                      #{index + 1} {restaurant.name}
                    </h3>
                    <p className="text-sm text-zinc-300">⭐ {restaurant.rating.toFixed(1)}</p>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">{restaurant.cuisine}</p>
                  <p className="mt-3 text-sm">
                    <span className="font-semibold text-zinc-200">Special to try:</span>{" "}
                    <span className="text-orange-200">{restaurant.specialItem}</span>
                  </p>
                  <p className="mt-2 text-xs text-zinc-400">
                    {restaurant.distanceKm === null
                      ? "Distance available after enabling location"
                      : `${restaurant.distanceKm.toFixed(2)} km away`}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <h2 className="text-xl font-semibold">Map: nearest top pick</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Showing {mapTarget.name} and nearby streets for quick directions.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-700">
              <iframe
                title="Nearby restaurant map"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${mapTarget.lat},${mapTarget.lng}`}
                className="h-[350px] w-full"
                loading="lazy"
              />
            </div>
            <a
              href={`https://www.openstreetmap.org/?mlat=${mapTarget.lat}&mlon=${mapTarget.lng}#map=14/${mapTarget.lat}/${mapTarget.lng}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-orange-300 underline underline-offset-4"
            >
              Open in OpenStreetMap
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
