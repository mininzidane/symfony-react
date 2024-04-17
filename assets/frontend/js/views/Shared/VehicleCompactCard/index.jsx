/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Container from 'frontend/js/components/Container';
import Body from './Body';
import Footer from './Footer';
import useStyles from './useStyles';

function VehicleCompactCard({
  lot,
  lotPurchase,
  customFooter,
  hasVin,
  hasShipping,
  hasOdometer,
  hasDocType,
  hasDue,
  hasBidderName,
  imageBlock,
}) {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Body
        lot={lot}
        lotPurchase={lotPurchase}
        hasShipping={hasShipping}
        hasVin={hasVin}
        hasOdometer={hasOdometer}
        hasDocType={hasDocType}
        hasDue={hasDue}
        hasBidderName={hasBidderName}
        imageBlock={imageBlock}
      />

      {customFooter || <Footer lot={lot} />}
    </Container>
  );
}

VehicleCompactCard.propTypes = {
  hasOdometer: PropTypes.bool,
  hasDocType: PropTypes.bool,
  hasShipping: PropTypes.bool,
  hasVin: PropTypes.bool,
  hasDue: PropTypes.bool,
};

VehicleCompactCard.defaultProps = {
  hasOdometer: true,
  hasDocType: false,
  hasShipping: false,
  hasVin: false,
  hasDue: false,
};

export default VehicleCompactCard;
