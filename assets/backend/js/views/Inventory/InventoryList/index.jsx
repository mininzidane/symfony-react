import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import Table from 'backend/js/components/Table/Table';
import TableCell from 'backend/js/components/Table/TableCell';
import RouterService from 'backend/js/api/RouterService';
import Switch from 'frontend/js/components/Form/Switch';
import BaseApiService from 'backend/js/api/BaseApiService';
import InventoryService from 'backend/js/api/InventoryService';
import NumberService from 'backend/js/lib/utils/NumberService';
import CustomerNotes from 'backend/js/views/_Shared/Micro/CustomerNotes';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import LotPurchaseForm from 'backend/js/views/Inventory/InventoryList/LotPurchaseForm';
import InventoryNoteForm from './InventoryNoteForm';
import VehicleDetails from './VehicleDetails';
import SaleHistory from './SaleHistory';

function InventoryList({ inventoryList, inventoryNotesList }) {
  const { enqueueSnackbar } = useSnackbar();
  const inventoryNotesListIndexedInitial = {};
  inventoryNotesList.forEach((inventoryNote) => {
    if (inventoryNotesListIndexedInitial[inventoryNote.stockNumber]) {
      inventoryNotesListIndexedInitial[inventoryNote.stockNumber].push(inventoryNote);
      return;
    }

    inventoryNotesListIndexedInitial[inventoryNote.stockNumber] = [inventoryNote];
  });
  const [inventoryNotesListIndexed, setInventoryNotesListIndexed] = useState(inventoryNotesListIndexedInitial);
  const [modalContent, setModalContent] = useState(null);

  const headerCells = [
    `Year Make Model Trim <br>Stock Number <br>VIN <br>Title <br>Condition`,
    `Location`,
    `Vehicle Status <br>Country`,
    'Previous History',
    'List Price',
    'Listing Notes',
    'Listing Status',
    'Action',
    'Notes',
  ];

  async function onChangeInventory(stockNumber, attributes) {
    try {
      await InventoryService.edit(stockNumber, attributes);
      enqueueSnackbar('Saving successful', { variant: 'success' });
      return true;
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
    }

    return false;
  }

  async function handleOnNoteAddSuccess(newNote) {
    const { stockNumber } = newNote;
    let newNotes = inventoryNotesListIndexed[stockNumber] ? inventoryNotesListIndexed[stockNumber].slice() : [];
    newNotes = [newNote, ...newNotes];
    const newInventoryNotesListIndexed = { ...inventoryNotesListIndexed, [stockNumber]: newNotes };

    setInventoryNotesListIndexed(newInventoryNotesListIndexed);
    enqueueSnackbar('Note added successful', { variant: 'success' });
  }

  function renderLotPurchaseCreateForm(stockNumber, price) {
    setModalContent({
      title: 'Create Purchase',
      content: <LotPurchaseForm stockNumber={stockNumber} price={price} setModalContent={setModalContent} />,
    });
  }

  return (
    <SnackbarProvider>
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
            {inventoryList.map((inventoryItem) => {
              const [active, setActive] = useState(inventoryItem.active);

              return (
                <TableRow key={`inventoryItem-${inventoryItem.stockNumber}`}>
                  <TableCell>
                    <VehicleDetails inventoryItem={inventoryItem} />
                  </TableCell>
                  <TableCell>
                    {inventoryItem.location && (
                      <a href={RouterService.getRoute('inventory', { location: inventoryItem.location.id })}>
                        {inventoryItem.location.name}
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    {inventoryItem.whereIsVehicleStatus}
                    <br />
                    {inventoryItem.country}
                  </TableCell>
                  <TableCell>
                    <SaleHistory vin={inventoryItem.vin} />
                  </TableCell>
                  <TableCell>{NumberService.formatUsCurrency(inventoryItem.price)}</TableCell>
                  <TableCell>{inventoryItem.notes}</TableCell>
                  <TableCell>
                    <div className="ws-n d-f ai-ct jc-fe">
                      <span className="mr-5">{active ? 'Published' : 'Unpublished'}</span>
                      <Switch
                        isChecked={active}
                        onChange={async (value) => {
                          const result = await onChangeInventory(inventoryItem.stockNumber, { active: value });
                          if (result) {
                            setActive(value);
                          }
                        }}
                      />
                    </div>
                    <div className="m-t-sm ws-n">{new Date(inventoryItem.createdAt).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="btn-group">
                      <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                        &nbsp; Actions &nbsp;
                        <i className="fa fa-caret-down" />
                      </button>
                      <ul className="dropdown-menu pull-right">
                        <li>
                          <a
                            href={RouterService.getRoute('inventoryEdit', '', {
                              stockNumber: inventoryItem.stockNumber,
                            })}
                          >
                            <i className="fa fa-file-text-o" /> Edit/View details
                          </a>
                        </li>
                        <li>
                          <button
                            className="btn btn-default"
                            style={{ border: 0, width: '100%' }}
                            type="button"
                            onClick={() => renderLotPurchaseCreateForm(inventoryItem.stockNumber, inventoryItem.price)}
                          >
                            <i className="fa fa-truck" /> Record Sale
                          </button>
                        </li>
                      </ul>
                    </div>
                  </TableCell>
                  <TableCell>
                    <CustomerNotes
                      notes={
                        inventoryNotesListIndexed[inventoryItem.stockNumber]
                          ? inventoryNotesListIndexed[inventoryItem.stockNumber]
                          : []
                      }
                    />

                    <div className="m-t">
                      <InventoryNoteForm
                        stockNumber={inventoryItem.stockNumber}
                        onSubmitSuccess={handleOnNoteAddSuccess}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {modalContent && (
        <ModalWindow
          isOpen={Boolean(modalContent)}
          onClose={() => setModalContent(null)}
          styles={modalContent.styles ? modalContent.styles : {}}
        >
          <ModalWindowHeader title={modalContent.title} onClose={() => setModalContent(null)} />
          <ModalWindowBody className="p-20 ov-v">{modalContent.content}</ModalWindowBody>
        </ModalWindow>
      )}
    </SnackbarProvider>
  );
}

InventoryList.propTypes = {
  inventoryList: PropTypes.arrayOf(PropTypes.object),
  inventoryNotesList: PropTypes.arrayOf(PropTypes.object),
};

InventoryList.defaultProps = {
  inventoryList: [],
  inventoryNotesList: [],
};

const $el = document.getElementById('inventory-data-list');
if ($el) {
  const inventoryList = $el.dataset.list ? JSON.parse($el.dataset.list) : [];
  const inventoryNotesList = $el.dataset.notes ? JSON.parse($el.dataset.notes) : [];
  ReactDOM.render(
    <ThemeProvider>
      <SnackbarProvider>
        <InventoryList inventoryList={inventoryList} inventoryNotesList={inventoryNotesList} />
      </SnackbarProvider>
    </ThemeProvider>,
    $el,
  );
}

export default InventoryList;
