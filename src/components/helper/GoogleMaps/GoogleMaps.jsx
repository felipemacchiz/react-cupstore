import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, DistanceMatrixService } from '@react-google-maps/api';
import { GlobalContext } from '../../../context/GlobalContext';

const containerStyle = {
	width: '100%',
	maxHeight: 240,
	aspectRatio: '3/1',
	borderRadius: 10,
	marginBottom: 20,
};
  
const defaultCenter = {
	lat: -25.440,
	lng: -49.270,
};

const GoogleMaps = ({ center, marker }) => {
	const global = React.useContext(GlobalContext);
	const [distanceMatrixService, setDistanceMatrixService] = React.useState(false);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	});
	const markerDestination = {
		lat: -25.4393409,
		lng: -49.2205749,
	}

	const changeDistance = (distance) => {
		setDistanceMatrixService(null);
		global.setDistance(distance);
	}

	React.useEffect(() => {
		if (marker) {	
			setDistanceMatrixService(
				<DistanceMatrixService
					options={{
						destinations: [marker],
						origins: [{
							lat: -25.4579523,
							lng: -49.2869351,
						}],
						travelMode: "DRIVING",
					}}
					callback={(response) => {
						changeDistance(response);
					}}
				/>
			);
		}

	}, [marker]);

	return (
		<div>
			{ isLoaded ? (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center || defaultCenter}
					zoom={13}
				>
					{marker && <Marker position={marker}/>}

					{marker && distanceMatrixService}
				</GoogleMap>
			) : <></> }
		</div>
	);
}

export default GoogleMaps;