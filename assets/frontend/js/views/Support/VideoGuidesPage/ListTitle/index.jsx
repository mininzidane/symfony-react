import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function ListTitle({ doneCount, totalCount }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <strong>
        <FormattedMessage id="videoGuidesPage.list.title" />
      </strong>
      <span>
        {doneCount}/{totalCount}
      </span>
    </div>
  );
}

ListTitle.propTypes = {
  doneCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default ListTitle;
