'use client';
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "200px",
};

const Map = ({ latitude, longitude }) => {
    const center = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAN-G9ziOvIMwNuo_XCDzjmw-9qc4y0x4U", // ✅ Or use process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    const mapOptions = {
        mapTypeControl: false,
        streetViewControl: false,
    };

    if (!isLoaded) {
        return <div>Loading map...</div>; // Optional loader
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            options={mapOptions}
        >
            <Marker position={center} />
        </GoogleMap>
    );
};

export default React.memo(Map);
