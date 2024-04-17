import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useCatalogInventoryItem from 'backend/js/hooks/useCatalogInventoryItem';
import InventoryGallery from 'backend/js/views/_Shared/InventoryDetails/InventoryGallery';

function VehicleDetailsPage({ idOrVin }) {
  const [lots, loading] = useCatalogInventoryItem(idOrVin);
  const [catalogInventoryItem, setCatalogInventoryItem] = useState(null);

  useEffect(() => {
    if (lots.length > 0) {
      setCatalogInventoryItem(lots[0]);
    }
  }, [lots]);

  if (loading) {
    return 'loading...';
  }

  if (catalogInventoryItem === null) {
    return null;
  }

  return (
    <>
      <h1>{catalogInventoryItem.description}</h1>
      <div className="row">
        <div className="col-sm-6">
          <InventoryGallery images={catalogInventoryItem.images} />
        </div>
        <div className="col-sm-6">
          <table className="table">
            <tbody>
              <tr>
                <td className="text-right">VIN</td>
                <td>{catalogInventoryItem.vin}</td>
              </tr>
              <tr>
                <td className="text-right">Model</td>
                <td>{catalogInventoryItem.model}</td>
              </tr>
              <tr>
                <td className="text-right">Make</td>
                <td>{catalogInventoryItem.make}</td>
              </tr>
              <tr>
                <td className="text-right">Year</td>
                <td>{catalogInventoryItem.year}</td>
              </tr>
              <tr>
                <td className="text-right">Color</td>
                <td>{catalogInventoryItem.color}</td>
              </tr>
              <tr>
                <td className="text-right">Primary Damage</td>
                <td>{catalogInventoryItem.primaryDamage}</td>
              </tr>
              <tr>
                <td className="text-right">Secondary Damage</td>
                <td>{catalogInventoryItem.secondaryDamage}</td>
              </tr>
              <tr>
                <td className="text-right">Odometer</td>
                <td>{catalogInventoryItem.odometer}</td>
              </tr>
              <tr>
                <td className="text-right">Title</td>
                <td>{catalogInventoryItem.title?.name}</td>
              </tr>
              <tr>
                <td className="text-right">Sale Location</td>
                <td>{catalogInventoryItem.saleLocation?.name}</td>
              </tr>
              <tr>
                <td className="text-right">Location</td>
                <td>{catalogInventoryItem.location?.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

VehicleDetailsPage.propTypes = {
  idOrVin: PropTypes.string.isRequired,
};

export default VehicleDetailsPage;
