/* eslint-disable react/prop-types */
import useInitShippingInfo from './useInitShippingInfo';
import useUpdateDefaultShippingLocation from './useUpdateDefaultShippingLocation';

function SyncDefaultShippingInfo({ lot }) {
  useInitShippingInfo(lot);
  useUpdateDefaultShippingLocation();

  return null;
}

export default SyncDefaultShippingInfo;
