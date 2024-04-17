import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Table from 'backend/js/components/Table/Table';
import TableCell from 'backend/js/components/Table/TableCell';
import RouterService from 'backend/js/api/RouterService';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import BaseApiService from 'backend/js/api/BaseApiService';
import InventoryService from 'backend/js/api/InventoryService';
import FlashMessage from 'backend/js/components/FlashMessage';

function InventoryLocationList({ inventoryLocationList }) {
  const defaultFlash = { message: '', type: '' };
  const [flash, setFlash] = useState(defaultFlash);

  async function onChangeLocation(id, attributes) {
    setFlash({ message: '', type: 'error' });

    try {
      await InventoryService.locationEdit(id, attributes);
      setFlash({ message: 'Saving successful', type: 'success' });
      return true;
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });
    }

    return false;
  }

  const headerCells = [
    'Name',
    'Author',
    'Country',
    'Address',
    'City',
    'State',
    'Zip',
    'Phone',
    'Cars Count',
    'Active',
    '',
  ];

  return (
    <>
      {flash.message && <FlashMessage message={flash.message} type={flash.type} />}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headerCells.map((headerCell, index) => (
                <TableCell key={index}>
                  <div dangerouslySetInnerHTML={{ __html: headerCell }} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryLocationList.map((inventoryLocation) => {
              const [active, setActive] = useState(inventoryLocation.active);

              return (
                <TableRow key={`inventoryLocation-${inventoryLocation.id}`}>
                  <TableCell>{inventoryLocation.name}</TableCell>
                  <TableCell>
                    {inventoryLocation.author && (
                      <>
                        {inventoryLocation.author}
                        <br />
                      </>
                    )}
                    {new Date(inventoryLocation.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{inventoryLocation.country?.name}</TableCell>
                  <TableCell>{inventoryLocation.address}</TableCell>
                  <TableCell>{inventoryLocation.city}</TableCell>
                  <TableCell>{inventoryLocation.state?.name}</TableCell>
                  <TableCell>{inventoryLocation.zip}</TableCell>
                  <TableCell>{inventoryLocation.phone}</TableCell>
                  <TableCell>
                    <a href={RouterService.getRoute('inventory', { location: inventoryLocation.id })}>
                      {inventoryLocation.carsCount}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Tickbox
                      onChange={async (_, value) => {
                        const result = await onChangeLocation(inventoryLocation.id, { active: Number(value) });
                        if (result) {
                          setActive(!active);
                        }
                      }}
                      name={`active-${inventoryLocation.id}`}
                      id={`active-${inventoryLocation.id}`}
                      value={active}
                    >
                      <span className={`label label-${active ? 'success' : 'danger'}`}>
                        {active ? 'Active' : 'Inactive'}
                      </span>
                    </Tickbox>
                  </TableCell>
                  <TableCell>
                    <div className="btn-group">
                      <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                        &nbsp; Actions &nbsp;
                        <i className="fa fa-caret-down" />
                      </button>
                      <ul className="dropdown-menu pull-right">
                        <li>
                          <a href={RouterService.getRoute('inventoryLocationEdit', '', { id: inventoryLocation.id })}>
                            <i className="fa fa-file-text-o" /> Edit/View details
                          </a>
                        </li>
                      </ul>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

InventoryLocationList.propTypes = {
  inventoryLocationList: PropTypes.arrayOf(PropTypes.object),
};

InventoryLocationList.defaultProps = {
  inventoryLocationList: [],
};

const $el = document.getElementById('inventory-locations-list');
if ($el) {
  const inventoryLocationList = $el.dataset.list ? JSON.parse($el.dataset.list) : [];
  ReactDOM.render(<InventoryLocationList inventoryLocationList={inventoryLocationList} />, $el);
}

export default InventoryLocationList;
