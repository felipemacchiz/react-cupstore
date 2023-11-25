import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
	width: '100%',
	height: '270px',
	borderRadius: 10,
	marginBottom: 20,
  };
  
  const center = {
	lat: -25.440,
	lng: -49.270,
  };

const Map = () => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyCnBl7T1AhVWnCXvF6IsFpXuLcwvSADjKc',
	});
	const [map, setMap] = React.useState(null)

	return (
		<div>
			{ isLoaded ? (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={13}
				>
					<></>
				</GoogleMap>
			) : <></> }
		</div>
	);
}

export default Map;