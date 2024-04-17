/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';
import Auctions from './Auctions';

function AuctionsGroup({ title, auctions, status, disabled, auctionGroups, ...props }) {
  if (!auctions) {
    return null;
  }

  const classes = useStyles();

  return (
    <div className={classnames(classes.root, `is-${status}`)}>
      {title && (
        <div className={classnames(classes.title)}>
          <div>{title}</div>
          <div className={classes.dot} />
        </div>
      )}

      {auctionGroups.map((group) => {
        if (!group.active || !auctions[group.key]) {
          return null;
        }

        return (
          <Auctions
            key={group.key}
            auctions={auctions[group.key]}
            label={group.name}
            disabled={disabled}
            classes={classes}
            {...props}
          />
        );
      })}
    </div>
  );
}

export default AuctionsGroup;
