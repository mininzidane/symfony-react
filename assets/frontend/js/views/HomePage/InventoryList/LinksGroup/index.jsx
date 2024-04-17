import React from 'react';
import PropTypes from 'prop-types';
import InventoryEntry from '../InventoryEntry';
import useStyles from './useStyles';

function LinksGroup({ data, title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3 className={classes.groupTitle}>{title}</h3>

      <div className={classes.linksGrid}>
        {data.map((entry) => (
          <InventoryEntry key={entry.link} href={entry.link} label={entry.label} count={entry.cnt} />
        ))}
      </div>
    </div>
  );
}

LinksGroup.propTypes = {
  title: PropTypes.node.isRequired,
  data: PropTypes.array.isRequired,
};

export default LinksGroup;
