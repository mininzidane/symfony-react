import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import get from 'lodash/get';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import useStyles from './useStyles';

function SeoContent({ className, lot, seo }) {
  if (!lot || lot.FAKE || !seo) {
    return null;
  }

  const classes = useStyles();
  const maxListLength = 14;

  const seoText = get(seo, 'pageContent');
  const modelsTitle = get(seo, 'suggestions.models.title');
  const modelsList = get(seo, 'suggestions.models.content');
  const discontinuedTitle = get(seo, 'suggestions.discontinued.title');
  const discontinuedList = get(seo, 'suggestions.discontinued.content');
  const yearsTitle = get(seo, 'suggestions.years.title');
  const yearsList = get(seo, 'suggestions.years.content');

  function getVehiclesList(list, maxLength) {
    return (
      <div className={classes.list}>
        {list.slice(0, maxLength).map((model, key) => (
          <div className={classes.listItem} key={key}>
            <a href={model.link}>{model.label}</a>
            <span>{model.cnt}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={classnames(classes.grid, className)} id="seo-content">
      {seoText && (
        <div
          dangerouslySetInnerHTML={{
            __html: seoText.replace(/\n/g, '<br />'),
          }}
        />
      )}

      <div className={classes.lists}>
        <div>
          <div className={classes.title}>{modelsTitle}</div>
          {getVehiclesList(modelsList, maxListLength)}
        </div>

        <div>
          <div className={classes.title}>{discontinuedTitle}</div>
          {getVehiclesList(discontinuedList, maxListLength - 1)}
        </div>

        <div>
          <div className={classes.title}>{yearsTitle}</div>
          {getVehiclesList(yearsList, maxListLength)}
        </div>
      </div>
    </div>
  );
}

SeoContent.propTypes = {
  className: PropTypes.string,
  lot: LotShape.isRequired,
  seo: PropTypes.object,
};

SeoContent.defaultProps = {
  className: '',
  seo: undefined,
};

export default SeoContent;
