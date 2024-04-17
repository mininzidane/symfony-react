import React from 'react';
import ReactDOM from 'react-dom';
import NumberService from 'frontend/js/lib/utils/NumberService';
import PropTypes from 'prop-types';
import ButtonLink from 'frontend/js/components/ButtonLink';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import TriangleIcon from '../../Shared/TriangleIcon';
import useStyles from './useStyles';

function ExtraMenu({ label, menuItems, extraMenuRef, close, closeAll }) {
  if (!extraMenuRef?.current) {
    return null;
  }

  const classes = useStyles();

  function handleClose() {
    extraMenuRef.current.scrollTop = 0;
    close();
  }

  return ReactDOM.createPortal(
    <div className={classes.root}>
      <ButtonLink
        onClick={handleClose}
        label={
          <>
            <TriangleIcon className={classes.leftTriangleIcon} /> <span className={classes.label}>{label}</span>
          </>
        }
        className={classes.back}
      />
      {!menuItems ? (
        <div className={classes.loading}>
          <SpinnerWheel color="white" size={14} />
        </div>
      ) : (
        <ul className={classes.list}>
          {menuItems?.map((item) => (
            <li key={item.href || item.id} className={classes.listItem}>
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    item.onClick(e);
                  }

                  handleClose();
                  closeAll();
                }}
                className={classes.link}
              >
                <span>{item.label}</span>&nbsp;
                <span className={classes.cnt}>({NumberService.formatNumber(item.cnt)})</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>,
    extraMenuRef.current,
  );
}

ExtraMenu.propTypes = {
  label: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  menuItems: PropTypes.array,
  extraMenuRef: PropTypes.shape({ current: PropTypes.any }),
  closeAll: PropTypes.func,
};

ExtraMenu.defaultProps = {
  extraMenuRef: null,
  menuItems: null,
  closeAll: () => {},
};

export default ExtraMenu;
