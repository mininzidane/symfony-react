import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ButtonLink from 'frontend/js/components/ButtonLink';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Tag from './Tag';
import useStyles from './useStyles';

function Tags({ tags, onRemove, className }) {
  const classes = useStyles();

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={classnames(classes.root, className)}>
      {tags.map(({ label, value }) => (
        <Tag label={label} onClick={() => onRemove(value)} key={value} />
      ))}

      <ButtonLink
        onClick={() => onRemove('all-tags')}
        label={<FormattedMessage id="shared.cta.resetAllFilter" />}
        className={classes.clearAllButton}
      />
    </div>
  );
}

Tags.propTypes = {
  onRemove: PropTypes.func.isRequired,
  className: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    }),
  ),
};

Tags.defaultProps = {
  className: '',
  tags: [],
};

export default Tags;
