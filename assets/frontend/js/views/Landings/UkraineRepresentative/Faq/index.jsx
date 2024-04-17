import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import Accordion from './Accordion';
import useStyles from './useStyles';

function Faq({ className }) {
  const classes = useStyles();

  return (
    <div className={className}>
      <section className={classes.faq}>
        <div className={classes.container}>
          <h3 className={classes.title}>Вопросы и Ответы</h3>
          <span className={classes.subtitle}>
            Please visit our <a href={RouterService.getLocalizedHcRoute()}>FAQ</a> for additional answers to commonly
            asked questions.
          </span>
        </div>
      </section>
      <Accordion />
    </div>
  );
}

Faq.defaultProps = {
  className: '',
};

Faq.propTypes = {
  className: PropTypes.string,
};

export default Faq;
