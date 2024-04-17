import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Container from 'frontend/js/components/Container';
import ImageMultiRes from 'frontend/js/components/Image/ImageMultiRes';
import People1xPng from './img/desktop/people.png';
import People2xPng from './img/desktop/people@2x.png';
import PeopleTablet1xPng from './img/tablet/people.png';
import PeopleTablet2xPng from './img/tablet/people@2x.png';
import PeopleMobile1xPng from './img/mobile/people.png';
import PeopleMobile2xPng from './img/mobile/people@2x.png';
import useStyles from './useStyles';

function Steps({ bgColor }) {
  const classes = useStyles();
  const { isBelowLg, isBelowSm } = useBreakpoint();

  let peopleImage = { x1: People1xPng, x2: People2xPng };
  if (isBelowLg) {
    peopleImage = { x1: PeopleTablet1xPng, x2: PeopleTablet2xPng };
  }
  if (isBelowSm) {
    peopleImage = { x1: PeopleMobile1xPng, x2: PeopleMobile2xPng };
  }

  return (
    <div className={classes.root} style={{ backgroundColor: bgColor }}>
      <Container className={classes.container}>
        <ImageMultiRes x1={peopleImage.x1} x2={peopleImage.x2} alt="People" withoutWrapper className={classes.people} />
        <div className={classes.steps}>
          <div className={classes.title}>
            <FormattedMessage id="sellYourCarPage.steps.title" />
          </div>
          <div className={classnames(classes.step, classes.step1)}>
            <div>
              <div className={classes.titleStep}>
                <FormattedMessage id="sellYourCarPage.steps.step1.title" />
              </div>
              <div>
                <FormattedMessage id="sellYourCarPage.steps.step1.desc" />
              </div>
            </div>
          </div>
          <div className={classnames(classes.step, classes.step2)}>
            <div>
              <div className={classes.titleStep}>
                <FormattedMessage id="sellYourCarPage.steps.step2.title" />
              </div>
              <div>
                <FormattedMessage id="sellYourCarPage.steps.step2.desc" />
              </div>
            </div>
          </div>
          <div className={classnames(classes.step, classes.step3)}>
            <div>
              <div className={classes.titleStep}>
                <FormattedMessage id="sellYourCarPage.steps.step3.title" />
              </div>
              <div>
                <FormattedMessage id="sellYourCarPage.steps.step3.desc" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

Steps.propTypes = {
  bgColor: PropTypes.string,
};

Steps.defaultProps = {
  bgColor: '#F1F1F8',
};

export default Steps;
