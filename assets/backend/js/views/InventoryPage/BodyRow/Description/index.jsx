import React from 'react';
import IBox from 'backend/js/components/IBox';
import useInventoryPageContext from '../../_Context/useInventoryPageContext';
import NumberService from '../../../../lib/utils/NumberService';

function Description() {
  const { inventoryItem } = useInventoryPageContext();

  const {
    id,
    acv,
    repairCost,
    title,
    odometer,
    odometerBrand,
    primaryDamage,
    vin,
    color,
    engineSize,
    drive,
    cylinders,
    fuel,
    keysStatus,
  } = inventoryItem;

  return (
    <div className="col-lg-4">
      <IBox title={`Lot# ${id} Details`} contentClassName="no-padding">
        <table className="table">
          <tbody>
            <tr>
              <td className="text-right">Est. Retail Value:</td>
              <td>{NumberService.formatUsCurrency(acv)}</td>
            </tr>
            <tr>
              <td className="text-right">Est. Repair Cost:</td>
              <td>{NumberService.formatUsCurrency(repairCost)}</td>
            </tr>
            <tr>
              <td className="text-right">Ownership Doc Type:</td>
              <td>{title?.type}</td>
            </tr>
            <tr>
              <td className="text-right">Odometer:</td>
              <td>{`${odometer} ${odometerBrand}`}</td>
            </tr>
            <tr>
              <td className="text-right">Primary Damage:</td>
              <td>{primaryDamage}</td>
            </tr>
            <tr>
              <td className="text-right">VIN:</td>
              <td>{vin}</td>
            </tr>
            <tr>
              <td className="text-right">Color:</td>
              <td>{color}</td>
            </tr>
            <tr>
              <td className="text-right">Engine:</td>
              <td>{engineSize}</td>
            </tr>
            <tr>
              <td className="text-right">Drive:</td>
              <td>{drive}</td>
            </tr>
            <tr>
              <td className="text-right">Cylinders:</td>
              <td>{cylinders}</td>
            </tr>
            <tr>
              <td className="text-right">Fuel:</td>
              <td>{fuel}</td>
            </tr>
            <tr>
              <td className="text-right">Keys:</td>
              <td>{keysStatus}</td>
            </tr>
          </tbody>
        </table>
      </IBox>
    </div>
  );
}

export default Description;
