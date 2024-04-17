import React from 'react';
import classnames from 'classnames';
import useIntl from 'backend/js/hooks/useIntl';
import RouterService from 'backend/js/api/RouterService';
import Button from 'backend/js/components/Button';
import useInventoryPageContext from '../_Context/useInventoryPageContext';

function HeaderRow() {
  const { inventoryItem, customer, hasCustomer, isWatched, handleIsWatchedUpdate } = useInventoryPageContext();
  const displayName = customer && `${customer.firstName} ${customer.lastName}`;
  const intl = useIntl();

  const translationSets = {
    asIsDisclaimer: intl.formatMessage({ id: 'lotPage.asIsDisclaimer.title.short' }),
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <h1 style={{ marginTop: 0 }}>
          {inventoryItem.description}
          {hasCustomer && (
            <i
              className={classnames('text-warning fa fa-inherit', { 'fa-star-o': !isWatched, 'fa-star': isWatched })}
              title={isWatched ? `Is in ${displayName}'s watchlist` : `Is not currently in ${displayName}'s watchlist`}
            />
          )}
        </h1>

        <div className="vehicle-subtitle">{translationSets.asIsDisclaimer}</div>
        <br />
      </div>
      <div className="col-md-4">
        <a
          href={RouterService.getRoute('lotSlugPage', null, { id: inventoryItem.id, slug: inventoryItem.slug })}
          className="btn btn-default mr-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-external-link" />
          View on website
        </a>
        {Boolean(hasCustomer && isWatched) && (
          <Button
            className="btn btn-default"
            label={
              <>
                <i className="fa fa-eye-slash" /> Remove from watchlist
              </>
            }
            onClick={() => handleIsWatchedUpdate(false)}
          />
        )}
        {Boolean(hasCustomer && !isWatched && !inventoryItem.sold) && (
          <Button
            className="btn btn-default"
            label={
              <>
                <i className="fa fa-eye" /> Add to watchlist
              </>
            }
            onClick={() => handleIsWatchedUpdate(true)}
          />
        )}
      </div>
    </div>
  );
}

export default HeaderRow;
