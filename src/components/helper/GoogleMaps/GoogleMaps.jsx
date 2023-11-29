import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, DistanceMatrixService } from '@react-google-maps/api';

const containerStyle = {
	width: '100%',
	maxHeight: 240,
	aspectRatio: '3/1',
	borderRadius: 10,
	marginBottom: 20,
  };
  
  const center = {
	lat: -25.440,
	lng: -49.270,
  };

const GoogleMaps = () => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	});
	const markerOrigin = {
		lat: -25.4579523,
		lng: -49.2869351,
	}
	const markerDestination = {
		lat: -25.4393409,
		lng: -49.2205749,
	}

	return (
		<div>
			{ isLoaded ? (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={13}
				>
					<Marker position={markerOrigin}/>
					<Marker position={markerDestination}/>
					<DistanceMatrixService
						options={
							{
								destinations: [markerDestination],
								origins: [markerOrigin],
								travelMode: "DRIVING",
							}
						}
						callback = {(response) => {console.log(response)}}
						/>
				</GoogleMap>
			) : <></> }
		</div>
	);
}

export default GoogleMaps;