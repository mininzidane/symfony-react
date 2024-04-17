import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import Breadcrumbs from 'backend/js/views/_Shared/Breadcrumbs';
import RouterService from 'backend/js/api/RouterService';
import InventoryEditForm from './InventoryEditForm';
import InventoryImagesForm from './InventoryImagesForm';

function InventoryEdit({ inventoryData, images, externalImages }) {
  const [stockNumber, setStockNumber] = useState(inventoryData.stockNumber);
  const [activeTab, setActiveTab] = useState(InventoryEditForm.TAB_NAME);

  return (
    <>
      <Breadcrumbs
        crumbs={[
          {
            label: 'Inventory list',
            href: RouterService.getRoute('inventory'),
          },
          {
            label: inventoryData.stockNumber || 'Add',
          },
        ]}
        hasHomePage={false}
      />

      <div className="tabs-container">
        <ul className="nav nav-tabs">
          <li className={activeTab === InventoryEditForm.TAB_NAME ? 'active' : ''}>
            <a
              className={`nav-link ${activeTab === InventoryEditForm.TAB_NAME ? 'active' : ''}`}
              data-toggle="tab"
              href="#tab-info"
              aria-expanded="true"
            >
              Vehicle Information
            </a>
          </li>
          {stockNumber && (
            <li className={activeTab === InventoryImagesForm.TAB_NAME ? 'active' : ''}>
              <a
                className={`nav-link ${activeTab === InventoryImagesForm.TAB_NAME ? 'active' : ''}`}
                data-toggle="tab"
                href="#tab-images"
              >
                Images ({images.length})
              </a>
            </li>
          )}
        </ul>
        <div className="tab-content">
          <div id="tab-info" className={`tab-pane ${activeTab === InventoryEditForm.TAB_NAME ? 'active' : ''}`}>
            <div className="panel-body">
              <InventoryEditForm
                inventoryData={inventoryData}
                setStockNumber={setStockNumber}
                stockNumber={stockNumber}
                {...(images.length ? {} : { setActiveTab })}
              />
            </div>
          </div>
          {stockNumber && (
            <div id="tab-images" className={`tab-pane ${activeTab === InventoryImagesForm.TAB_NAME ? 'active' : ''}`}>
              <div className="panel-body">
                <InventoryImagesForm images={images} stockNumber={stockNumber} externalImages={externalImages} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

InventoryEdit.propTypes = {
  inventoryData: PropTypes.object,
  images: PropTypes.array,
  externalImages: PropTypes.array,
};

InventoryEdit.defaultProps = {
  inventoryData: {},
  images: [],
  externalImages: [],
};

const $el = document.getElementById('inventory-data-edit');
if ($el) {
  const inventoryData = $el.dataset.inventoryData ? JSON.parse($el.dataset.inventoryData) : {};
  const images = $el.dataset.images ? JSON.parse($el.dataset.images) : [];
  const externalImages = $el.dataset.externalImages ? JSON.parse($el.dataset.externalImages) : [];
  ReactDOM.render(
    <ThemeProvider>
      <InventoryEdit inventoryData={inventoryData} images={images} externalImages={externalImages} />
    </ThemeProvider>,
    $el,
  );
}

export default InventoryEdit;
