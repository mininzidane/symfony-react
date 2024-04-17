import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import Refinements from './Refinements';
import Receipt from './Receipt';
import Annotation from './Annotation';
import OrderShipping from './OrderShipping';
import PrintSection from './PrintSection';
import useStyles from './useStyles';

function Content({ onOrderIntent }) {
  const classes = useStyles();
  const { config } = useContext(CalculatorContext);

  return (
    <div className={classes.grid}>
      <div className={classes.refinements}>
        <Refinements />
      </div>

      <div className={classes.receiptSectionWrap}>
        <div className={classes.receiptSection}>
          <Receipt />
          {config.orderShipping && (
            <div className={classes.orderShipping}>
              <OrderShipping onOrderIntent={onOrderIntent} />
            </div>
          )}
        </div>
      </div>
      <div className={classes.print}>
        <PrintSection />
      </div>
      <Annotation />
    </div>
  );
}

Content.defaultProps = {
  onOrderIntent: () => {},
};

Content.propTypes = {
  onOrderIntent: PropTypes.func,
};

export default Content;
