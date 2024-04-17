import React from 'react';
import PropTypes from 'prop-types';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import RouterService from 'backend/js/api/RouterService';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import NumberService from 'backend/js/lib/utils/NumberService';
import Button from '../../../../components/Button';
import ModalLink from '../../../../components/ModalLink';
import Amount from '../../../../../../frontend/js/components/Amount';
import Form from './Form';
import ShippingDistance from './ShippingDistance';
import AmountForm from './AmountForm';
import SendEmailForm from './SendEmailForm';

function InstantOfferShipping({
  instantOffer,
  pickupTimes,
  setFlash,
  setModalContent,
  setInstantOfferChangeLogs,
  setInstantOffer,
}) {
  const instantOfferService = new InstantOfferService();
  if (instantOffer.activeShippingOrders?.length > 0) {
    const { estimatedDelivery, scheduledPickup, pickedUp, delivered, driverCompanyName, driverPhone } =
      instantOffer.activeShippingOrders[instantOffer.activeShippingOrders.length - 1];

    const formatDate = (date) =>
      date ? DateTimeService.format(DateTimeService.parseDateInLocalTimezone(date), 'MM/dd') : 'TBD';

    return (
      <>
        <div className="d-f">
          <div className="mr-10">
            <div>Pickup Est / Act</div>
            <div>{formatDate(scheduledPickup)}</div>
            <div>{formatDate(pickedUp)}</div>
          </div>
          <div>
            <div>Delivery Est / Act</div>
            <div>{formatDate(estimatedDelivery)}</div>
            <div>{formatDate(delivered)}</div>
          </div>
        </div>
        <div>
          {driverCompanyName}
          <br />
          <span className="text-muted">{driverPhone}</span>
        </div>
        <div>
          Cost: <Amount value={instantOffer.shippingPrice || instantOffer.nearestLocationQuote} hasCurrency />
          {instantOffer.shippingDistance !== null && (
            <span className="ml-3">
              <ShippingDistance instantOffer={instantOffer} />
            </span>
          )}
          {!driverCompanyName && (
            <>
              &nbsp;&nbsp;
              {/* eslint-disable-next-line */}
              <a
                onClick={() =>
                  setModalContent({
                    title: 'Edit shipping price',
                    content: (
                      <AmountForm
                        amount={NumberService.formatCurrency(
                          instantOffer.shippingPrice || instantOffer.nearestLocationQuote || 0,
                        )}
                        onSubmit={(values, { setSubmitting }) => {
                          instantOfferService
                            .editShippingPrice(instantOffer.ref, {
                              shippingPrice: parseInt(values.amount.replace(/[^0-9.]/g, ''), 10),
                            })
                            .then((response) => {
                              instantOffer.shippingPrice = response.instantOffer.shippingPrice;
                              setInstantOffer(instantOffer);
                              setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
                            })
                            .finally(() => {
                              setSubmitting(false);
                              setModalContent(null);
                            });
                        }}
                      />
                    ),
                  })
                }
              >
                <i className="fa fa-pencil" />
              </a>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      Shipping quote to
      <br />
      {instantOffer.nearestLocation ? (
        <>
          <ModalLink
            route={RouterService.getRoute(
              'backendLocation',
              { auction: 'Copart' },
              { id: instantOffer.nearestLocation.id },
            )}
            title="View location detail information"
            label={instantOffer.nearestLocation.name}
          />{' '}
          <button
            type="button"
            onClick={() =>
              setModalContent({
                title: 'Send Email',
                content: (
                  <SendEmailForm
                    setModalContent={setModalContent}
                    location={instantOffer.nearestLocation}
                    lotId={instantOffer.copartLot}
                  />
                ),
              })
            }
          >
            <i className="fa fa-envelope-o" />
          </button>
        </>
      ) : (
        '...'
      )}
      :{' '}
      {instantOffer.nearestLocationQuote ? (
        <>
          <Amount value={instantOffer.nearestLocationQuote} hasCurrency />
        </>
      ) : (
        'n/a'
      )}
      {instantOffer.shippingDistance !== null && (
        <span className="ml-3">
          <ShippingDistance instantOffer={instantOffer} />
        </span>
      )}
      &nbsp;&nbsp;
      {/* eslint-disable-next-line */}
      <a
        onClick={() =>
          setModalContent({
            title: 'Edit shipping price',
            content: (
              <AmountForm
                amount={NumberService.formatCurrency(instantOffer.nearestLocationQuote || 0)}
                onSubmit={(values, { setSubmitting }) => {
                  instantOfferService
                    .editNearestLocationQuote(instantOffer.ref, {
                      nearestLocationQuote: parseInt(values.amount.replace(/[^0-9.]/g, ''), 10),
                    })
                    .then((response) => {
                      instantOffer.nearestLocationQuote = response.instantOffer.nearestLocationQuote;
                      setInstantOffer(instantOffer);
                      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
                    })
                    .finally(() => {
                      setSubmitting(false);
                      setModalContent(null);
                    });
                }}
              />
            ),
          })
        }
      >
        <i className="fa fa-pencil" />
      </a>
      <div className="m-t">
        {instantOffer.vehicleVin && (
          <Button
            label="Order delivery"
            onClick={() =>
              setModalContent({
                title: 'Place shipping order',
                content: (
                  <Form
                    instantOffer={instantOffer}
                    pickupTimes={pickupTimes}
                    setFlash={setFlash}
                    setModalContent={setModalContent}
                    setInstantOfferChangeLogs={setInstantOfferChangeLogs}
                  />
                ),
              })
            }
          />
        )}
      </div>
    </>
  );
}

InstantOfferShipping.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setFlash: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  pickupTimes: PropTypes.array,
  setInstantOffer: PropTypes.func,
};

InstantOfferShipping.defaultProps = {
  pickupTimes: [],
  setInstantOffer: () => {},
};

export default InstantOfferShipping;
