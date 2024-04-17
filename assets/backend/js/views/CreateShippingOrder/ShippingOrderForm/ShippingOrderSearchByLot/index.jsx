import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import useCatalogInventoryItem from 'backend/js/hooks/useCatalogInventoryItem';
import Button from 'backend/js/components/Button';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import Select from 'backend/js/components/Form/Select';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import useStyles from '../useStyles';

function ShippingOrderSearchByLot({ setLotPurchase }) {
  const classes = useStyles();
  const [lotOrVinToSearch, setLotOrVinToSearch] = useState(null);
  const [lots, loading] = useCatalogInventoryItem(lotOrVinToSearch);
  const searchInput = useRef();

  function prepareLotPurchase(lot) {
    const images = [];
    lot.images.forEach((image) => {
      images.push({
        full: image.full,
        thumbnail: image.thumbnail,
      });
    });

    return {
      id: null,
      vehicleYearMakeModel: `${lot.year} ${lot.make} ${lot.model}`,
      price: '0',
      shipping: {
        id: null,
        destination: null,
        quote: null,
        oceanQuote: null,
        isCancelled: false,
        isShipped: false,
        isComplete: false,
        isPaid: false,
        invoiceUrl: null,
        isCancellable: false,
      },
      lot: {
        id: lot.id,
        vin: lot.vin,
        locationId: get(lot.location, 'id'),
        locationZip: get(lot.location, 'zip'),
        locationState: null,
        locationStateCode: get(lot.location, 'stateCode'),
        locationCity: get(lot.location, 'city'),
        locationPhone: null,
        locationName: get(lot.location, 'name'),
        locationLat: get(lot.location, 'point.0'),
        locationLon: get(lot.location, 'point.1'),
        isDrivable: lot.lotCondition === 'D',
        images,
        inventoryAuction: lot.inventoryAuction,
      },
      invoice: {
        isPaid: false,
      },
    };
  }

  function prepareLotsList(values) {
    const list = [];
    values.forEach((lot) => {
      list.push({ label: lot.inventoryAuction, value: lot });
    });
    return list;
  }

  useEffect(() => {
    if (lots.length === 1) {
      const lot = lots[0];
      if (!lot.location) {
        return;
      }
      setLotPurchase(prepareLotPurchase(lot));
    }
  }, [lots]);

  return (
    <div className="section m-b">
      <div className={classNames(classes.mw800, 'd-flex form-group')}>
        {loading ? (
          <SpinnerWheel isCentered size={40} thickness={3} />
        ) : (
          <>
            {lots.length > 1 ? (
              <Select
                id="lot"
                name="lot"
                className="react-select-hollow"
                onChange={(name, value) => setLotPurchase(prepareLotPurchase(value))}
                options={prepareLotsList(lots)}
                onChangeAttribute="value"
                formatOptionLabel={(option) => option.label}
                onBlur={() => {}}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    paddingLeft: '60px',
                    minHeight: '40px',
                    borderColor: '#B7B5B3',
                    borderRadius: '2px',
                  }),
                  menu: (styles) => ({ ...styles, zIndex: '100' }),
                }}
              />
            ) : (
              <>
                <div className={classNames(classes.inlineInput, 'm-r-sm')}>
                  <input type="text" placeholder="Lot#/Vin:" className="form-control" ref={searchInput} />
                </div>
                <div className={classNames(classes.inlineInput, 'm-r-sm')}>
                  <Button
                    className="btn btn-primary"
                    label="Search"
                    onClick={() => setLotOrVinToSearch(searchInput.current.value.trim())}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

ShippingOrderSearchByLot.propTypes = {
  setLotPurchase: PropTypes.func.isRequired,
};

export default ShippingOrderSearchByLot;
