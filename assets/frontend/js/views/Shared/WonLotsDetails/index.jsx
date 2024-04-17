import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import t from 'frontend/js/api/TranslatorService';
import Button from 'frontend/js/components/Button';
import ButtonCross from 'frontend/js/components/ButtonCross';
import ImageNotFoundSvg from 'frontend/images/shared/errors/image-not-found.svg';

function WonLotsDetails({ img, description, href, onCrossClick }) {
  const { getRoute } = RouterService;

  return (
    <div style={{ minWidth: '300px' }}>
      <ButtonCross
        onClick={onCrossClick}
        className="op-h"
        alt="Close details"
        style={{ position: 'absolute', top: '10px', right: '10px' }}
        isThin
      />

      <h3 className="fw-7 text-md m-0">{t('header.bid_status.won_lot')}</h3>

      <div className="grid-x no-wrap mt-15">
        <div className="pos-r" style={{ minWidth: '84px', height: '63px' }}>
          <img src={img || ImageNotFoundSvg} alt={description} className="coverer" />
        </div>

        <div className="d-f grid-y ml-15 ai-fs">
          <a href={href} className="text-md fw-4 text-black td-n w-100">
            {description}
          </a>

          <Button
            href={getRoute('lotsWon')}
            label={t('header.bid_status.pay')}
            size="sm"
            isInline
            isRegularCase
            className="mt-10"
          />
        </div>
      </div>
    </div>
  );
}

WonLotsDetails.defaultProps = {
  img: ImageNotFoundSvg,
};

WonLotsDetails.propTypes = {
  img: PropTypes.string,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  onCrossClick: PropTypes.func.isRequired,
};

export default WonLotsDetails;
