import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Container from 'frontend/js/components/Container';
import useStyles from './useStyles';

function Step({ title, content1, content2, isFirst, isLast }) {
  const classes = useStyles();

  return (
    <section className={classnames(classes.root)}>
      <Container>
        {title && <h3 className={classes.title}>{title}</h3>}
        <div className={classes.container}>
          <div className={classnames(classes.half, { 'is-first': isFirst })}>{content1}</div>
          <div className={classnames(classes.half, { 'is-first': isFirst })}>
            <div className={classnames(classes.line, { 'is-first': isFirst, 'is-last': isLast })}>
              <div className={classes.pin} />
            </div>
            {content2}
          </div>
        </div>
      </Container>
    </section>
  );
}

Step.propTypes = {
  content1: PropTypes.node.isRequired,
  content2: PropTypes.node.isRequired,
  title: PropTypes.string,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};

Step.defaultProps = {
  title: '',
  isFirst: false,
  isLast: false,
};

export default Step;
