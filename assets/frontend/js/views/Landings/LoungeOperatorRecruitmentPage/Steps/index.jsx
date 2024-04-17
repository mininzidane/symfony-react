import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import useStyles from './useStyles';
import Step1Svg from './img/step-1.svg';
import Step2Svg from './img/step-2.svg';
import Step3Svg from './img/step-3.svg';
import Step4Svg from './img/step-4.svg';
import Step5Svg from './img/step-5.svg';
import PinSvg from './img/pin.svg';

function Steps() {
  const classes = useStyles();

  const stepsData = [
    {
      icon: Step1Svg,
      title: <FormattedMessage id="landings.loungeOperatorRecruitmentPage.step1" />,
    },
    {
      icon: Step2Svg,
      title: <FormattedMessage id="landings.loungeOperatorRecruitmentPage.step2" />,
    },
    {
      icon: Step3Svg,
      title: <FormattedMessage id="landings.loungeOperatorRecruitmentPage.step3" />,
    },
    {
      icon: Step4Svg,
      title: <FormattedMessage id="landings.loungeOperatorRecruitmentPage.step4" />,
    },
    {
      icon: Step5Svg,
      title: <FormattedMessage id="landings.loungeOperatorRecruitmentPage.step5" />,
    },
  ];

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="landings.loungeOperatorRecruitmentPage.stepsSectionTitle" />
        </h2>

        <div className={classes.steps}>
          {stepsData.map((step, index) => (
            <div className={classes.step} key={index}>
              <img src={step.icon} alt={`Step ${index}`} />

              <div className={classes.stepDesc}>
                <div className={classes.stepIndex}>0{index + 1}</div>
                <div className={classes.stepTitle}>{step.title}</div>
                <img className={classes.stepPin} src={PinSvg} alt="Pin" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Steps;
