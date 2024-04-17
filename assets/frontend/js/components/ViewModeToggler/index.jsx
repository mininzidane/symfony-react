/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CardViewSvg from './icons/CardViewIcon';
import ListViewIcon from './icons/ListViewIcon';
import useStyles from './useStyles';

function ViewModeToggler({ view, setView, viewModeOptions, className, gridLabel, togglerModeOn }) {
  const classes = useStyles();
  const [innerView, setInnerView] = useState(view);
  const { GRID, LIST } = viewModeOptions;

  function toggleView() {
    if (innerView === GRID) {
      setInnerView(LIST);
      return;
    }

    setInnerView(GRID);
  }

  function handleGridViewClick() {
    setInnerView(GRID);
  }

  function handleListViewClick() {
    setInnerView(LIST);
  }

  useEffect(() => {
    if (innerView !== view) {
      setTimeout(() => {
        setView(innerView);
      }, 150);
    }
  }, [innerView, view]);

  return (
    <div className={classnames(classes.root, className)}>
      {togglerModeOn ? (
        <button
          type="button"
          onClick={toggleView}
          className={classnames(classes.button, classes.togglerMode, 'is-active')}
        >
          {innerView === viewModeOptions.LIST ? <CardViewSvg /> : <ListViewIcon />}
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={handleListViewClick}
            className={classnames(classes.button, classes.listViewButton, {
              'is-active': innerView === viewModeOptions.LIST,
            })}
          >
            <ListViewIcon />
            <FormattedMessage id="shared.label.list" className={classes.label} />
          </button>

          <button
            type="button"
            onClick={handleGridViewClick}
            className={classnames(classes.button, classes.gridViewButton, {
              'is-active': innerView === viewModeOptions.GRID,
            })}
          >
            <CardViewSvg />
            <div className={classes.label}>{gridLabel || <FormattedMessage id="shared.label.grid" />}</div>
          </button>
        </>
      )}
    </div>
  );
}

export default ViewModeToggler;
