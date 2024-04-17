import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function LinkGroup({ title, links, isNowrap }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <span className={classnames({ [classes.nowrapTitle]: isNowrap })}>{title}</span>
      </div>
      {links.map(({ label, href, isVisible }) => {
        if (typeof isVisible === 'function' && !isVisible()) {
          return null;
        }

        return (
          <Link href={href} key={label} className={classes.link}>
            {label}
          </Link>
        );
      })}
    </div>
  );
}

LinkGroup.propTypes = {
  title: PropTypes.string,
  isNowrap: PropTypes.bool,
  links: PropTypes.array.isRequired,
};

LinkGroup.defaultProps = {
  title: '',
  isNowrap: false,
};

export default LinkGroup;
