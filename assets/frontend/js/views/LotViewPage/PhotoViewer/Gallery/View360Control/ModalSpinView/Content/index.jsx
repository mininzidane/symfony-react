import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import ButtonCross from 'frontend/js/components/ButtonCross';
import Title from './Title';
import useStyles from './useStyles';

function Content({ id, auction, spincarPanoramas, handleClose }) {
  const classes = useStyles();
  const spincarUrl = get(spincarPanoramas, '0.url');

  return (
    <>
      <div className={classes.header}>
        <Title lotId={id} auction={auction} />
        <ButtonCross onClick={handleClose} color="white" className={classes.closeButton} size={12} />
      </div>

      <div className={classes.body}>
        {spincarUrl && <iframe className={classes.iframe} title={id} src={spincarUrl} frameBorder="0" />}
      </div>
    </>
  );
}

Content.propTypes = {
  id: PropTypes.number.isRequired,
  auction: PropTypes.string.isRequired,
  spincarPanoramas: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Content;
