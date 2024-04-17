import React from 'react';
import PropTypes from 'prop-types';
import YouTubeVideo from 'frontend/js/components/YouTubeVideo';
import useStyles from './useStyles';

function Step({ number, title, description, video }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.point}>
        <div className={classes.number}>{number}</div>
        <div className="pos-r d-f jc-ct">
          <div className={classes.dot} />
          <div className={classes.line} />
        </div>
      </div>
      <div className={classes.info}>
        <div>
          <div className={classes.title}>{title}</div>
          <div className={classes.description}>{description}</div>
        </div>
        <div className={classes.video}>
          <YouTubeVideo ratio={56.25} id={video} preview alt={title} volume={0.3} />
        </div>
      </div>
    </div>
  );
}

Step.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  video: PropTypes.string.isRequired,
};

export default Step;
