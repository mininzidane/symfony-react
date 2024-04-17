import useUSPorts from 'frontend/js/hooks/useUSPorts';
import useAuctionLocation from 'frontend/js/hooks/useAuctionLocation';

function useUSPort(refinements) {
  const { auctionLocationId, USPortId, destinationId, auction } = refinements;
  const auctionLocation = useAuctionLocation(auctionLocationId, auction);
  const ports = useUSPorts(destinationId, {
    lat: auctionLocation && auctionLocation.latitude,
    lon: auctionLocation && auctionLocation.longitude,
  });

  const port = ports.find((item) => item.id === USPortId);
  if (port) {
    return port;
  }

  return ports.find((item) => item.preferred);
}

export default useUSPort;
