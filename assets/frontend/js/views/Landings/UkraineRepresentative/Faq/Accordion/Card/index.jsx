import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import Arrow from './Arrow';
import useStyles from './useStyles';

function Card({ title, body, img }) {
  const classes = useStyles();
  const [active, setActive] = useState(false);

  function handleToggle() {
    setActive(!active);
  }

  return (
    <section className={classes.root}>
      <div tabIndex={0} role="menuitem" onClick={handleToggle} onKeyPress={handleToggle} className={classes.header}>
        <div className={classnames(classes.container, { 'is-active': active })}>
          <span className={classes.title}>{title}</span>
          <Arrow className={classnames(classes.arrow, { 'is-rotate': active })} />
        </div>
      </div>
      <Collapse in={active} timeout={300}>
        {active && (
          <div className={classnames(classes.body, { 'is-padding-bottom': !img })}>
            <div
              className={classnames(classes.content, { 'is-flex-basis': !img })}
              dangerouslySetInnerHTML={{
                __html: body,
              }}
            />
            {img && <img src={img} className={classes.img} alt="" />}
          </div>
        )}
      </Collapse>
    </section>
  );
}

Card.defaultProps = {
  img: '',
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  img: PropTypes.string,
};

export default Card;
