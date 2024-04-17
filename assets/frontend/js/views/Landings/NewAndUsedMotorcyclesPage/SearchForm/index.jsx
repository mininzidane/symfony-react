import React from 'react';
import Container from 'frontend/js/components/Container';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import BootstrapService from 'frontend/js/api/BootstrapService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import YmmFinderForm from 'frontend/js/views/Shared/YmmFinderForm';
import LotService from 'frontend/js/api/LotService';
import SearchFormBackgroundJpg from './img/search-form-background.jpg';
import SearchFormBackgroundMobileJpg from './img/search-form-background-mobile.jpg';
import useStyles from './useStyles';

function SearchForm() {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  const lotsCount = BootstrapService.getAppValue('totalLots', '').toString();
  const formattedCount = NumberService.formatNumber(Math.round(lotsCount / 100) * 100);

  return (
    <div
      className={classes.root}
      style={{ backgroundImage: `url(${isBelowSm ? SearchFormBackgroundMobileJpg : SearchFormBackgroundJpg})` }}
    >
      <Container>
        <h2 className={classes.title}>
          <FormattedMessage id="newAndUsedMotorcyclesPage.searchForm.title" values={{ count: formattedCount }} />
        </h2>

        <div className={classes.form}>
          <YmmFinderForm vehicleType={LotService.VEHICLE_CATEGORY.MOTORCYCLE} />
        </div>
      </Container>
    </div>
  );
}

export default SearchForm;
