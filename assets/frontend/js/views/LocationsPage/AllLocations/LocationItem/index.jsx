import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

const LocationItem = memo(({ title, data, onClick }) => {
  const [active, setActive] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.item}>
      <button type="button" className={classes.title} onClick={() => setActive((prevState) => !prevState)}>
        <span className={classes.itemPre}>{!active ? '+' : '-'}</span>
        {title}
      </button>

      {active && (
        <ul className={classes.list}>
          {data.map((l) => (
            <li className={classes.listItem} key={l.name}>
              <Link href={l.link} className={classes.listItemTitle}>
                <span>{l.city?.toLowerCase()}</span>
              </Link>
              <div className={classes.listItemDesc}>
                <div>{[l.address, l.zip].filter(Boolean).join(', ')}</div>
                <button
                  type="button"
                  className={classes.button}
                  onClick={() => {
                    onClick(l);
                  }}
                >
                  <FormattedMessage id="shared.cta.moreInformation" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

LocationItem.defaultProps = {
  onClick: () => {},
};

LocationItem.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onClick: PropTypes.func,
};

export default LocationItem;
