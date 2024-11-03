import { useMapEvent } from 'react-leaflet';

const ClickHandler: React.FC<{ setAddedPin: (pin: [number, number]) => void }> = ({ setAddedPin }) => {
  useMapEvent('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    setAddedPin([lat, lng]);
  });

  return null; 
};

export default ClickHandler;
