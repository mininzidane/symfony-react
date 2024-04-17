import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import RouterService from 'backend/js/api/RouterService';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import CustomerShape from 'frontend/js/lib/propshapes/CustomerShape';
import ShippingOrderForm from './ShippingOrderForm';
import ShippingOrderCarousel from './ShippingOrderCarousel';
import SearchCustomerForm from './SearchCustomerForm';

const $el = document.getElementById('shipping-order-form');
const props = $el.dataset.shippingInfo ? JSON.parse($el.dataset.shippingInfo) : {};
const searchMode = !!$el.dataset.searchMode;
const initialLotPurchase = props.lotPurchase || {};

function ShippingOrder({ userProfile: userProfileProp }) {
  const [lotPurchase, setLotPurchase] = useState(initialLotPurchase);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState(null);
  const [userProfile, setUserProfile] = useState(userProfileProp);
  const AUCTION_IAA = 'IAA';

  async function openModal(e) {
    e.preventDefault();
    const response = await fetch(e.target.getAttribute('href'));
    const html = await response.text();
    setModalBody(html);
    setIsModalOpen(true);
  }

  return (
    <div className="wrapper animated fadeInRight">
      <ThemeProvider>
        <ModalWindow
          isOpen={isModalOpen}
          width={600}
          onClose={() => {
            setIsModalOpen(false);
            setModalBody(null);
          }}
        >
          <ModalWindowBody>
            <div dangerouslySetInnerHTML={{ __html: modalBody }} />
          </ModalWindowBody>
        </ModalWindow>
      </ThemeProvider>
      {lotPurchase.lot && (
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5 className="panel-title">{lotPurchase.vehicleYearMakeModel}</h5>
                <a
                  href={RouterService.getRoute('lotSlugPage', null, {
                    id: lotPurchase.lot.id,
                    slug: lotPurchase.lot.slug,
                  })}
                >
                  &nbsp;
                  <i className="fa fa-external-link" />
                </a>
              </div>
              <div className="ibox-content">
                <div className="row">
                  <div className="col-lg-6">
                    VIN: {lotPurchase.lot.vin}&nbsp;
                    {lotPurchase.id && (
                      <a href={RouterService.getRoute('backendLotPurchaseView', '', { token: lotPurchase.id })}>
                        {lotPurchase.id}
                      </a>
                    )}
                    <br />
                    {lotPurchase.lot.auction}&nbsp;{lotPurchase.lot.id}
                  </div>
                  <div className="col-lg-6">
                    <a
                      onClick={openModal}
                      href={RouterService.getRoute(
                        'backendLocation',
                        { contentOnly: true, auction: lotPurchase.lot.inventoryAuction },
                        { id: lotPurchase.lot.locationId },
                      )}
                      title="View location detail information"
                    >
                      {lotPurchase.lot.locationName}
                      {lotPurchase.lot.auction === AUCTION_IAA && (
                        <div>
                          {lotPurchase.lot.locationCity}&nbsp;{lotPurchase.lot.locationStateCode},&nbsp;
                          {lotPurchase.lot.locationZip}
                        </div>
                      )}
                    </a>
                    <br />
                    {lotPurchase.lot.locationPhone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-8">
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h5 className="panel-title">Shipping Order</h5>
            </div>
            <div className="ibox-content">
              {userProfile ? (
                <ShippingOrderForm
                  userProfile={userProfile}
                  lotPurchase={lotPurchase}
                  setLotPurchase={setLotPurchase}
                  searchMode={searchMode}
                />
              ) : (
                <SearchCustomerForm setUserProfile={setUserProfile} />
              )}
            </div>
          </div>
        </div>
        {lotPurchase.lot && (
          <div className="col-lg-4">
            <div className="ibox">
              <div className="ibox-title">
                <h5>Images</h5>
              </div>
              <div className="ibox-content no-padding">
                <ShippingOrderCarousel lotPurchase={lotPurchase} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ShippingOrder.propTypes = {
  userProfile: CustomerShape,
};

ShippingOrder.defaultProps = {
  userProfile: null,
};

ReactDOM.render(
  <ReactQueryProvider>
    <ShippingOrder userProfile={props.userProfile || null} />
  </ReactQueryProvider>,
  $el,
);
