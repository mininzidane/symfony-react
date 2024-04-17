import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useFiltersContext } from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext';
import useStyles from './useStyles';
import Chip from './Chip';

function Chips({ className }) {
  const [{ refinements, getLabel, dispatch }] = useFiltersContext();
  const classes = useStyles();

  function handleDelete(hash) {
    dispatch({ type: 'REMOVE', payload: hash });
  }

  return (
    <div className={classnames(classes.root, className)}>
      {refinements.map((refinement) => {
        const label = getLabel(refinement);
        if (!label) {
          return null;
        }

        return <Chip onDelete={() => handleDelete(refinement.hash)} key={refinement.hash} label={label} />;
      })}
    </div>
  );
}

Chips.defaultProps = {
  className: '',
};

Chips.propTypes = {
  className: PropTypes.string,
};

export default Chips;
