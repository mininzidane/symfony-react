import React from 'react';
import PropTypes from 'prop-types';

import Container from 'frontend/js/components/Container';

import Item from './Item';
import IconStep1 from '../img/step-1.svg';
import IconStep2 from '../img/step-2.svg';
import IconStep3 from '../img/step-3.svg';
import IconStep4 from '../img/step-4.svg';
import IconStep5 from '../img/step-5.svg';
import IconStep6 from '../img/step-6.svg';
import IconStep7 from '../img/step-7.svg';
import IconStep8 from '../img/step-8.svg';
import IconLast from '../img/step-last.svg';
import LineFirst from '../img/line-first.svg';
import LineEven from '../img/line-even.svg';
import LineOdd from '../img/line-odd.svg';
import useStyles from './useStyles';

function Stepper({ itemsList, title }) {
  const classes = useStyles();

  const icons = [IconStep1, IconStep2, IconStep3, IconStep4, IconStep5, IconStep6, IconStep7, IconStep8];

  return (
    <div className={classes.root}>
      <Container>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.board}>
          {itemsList.map((item, i) => {
            const isLastItem = i === itemsList.length - 1;

            let line = LineFirst;
            let lineOffset = -12;
            let icon = icons[i];

            if (i !== 0) {
              line = i % 2 === 0 ? LineOdd : LineEven;
              lineOffset = i % 2 === 0 ? -20 : 20;
            }

            if (isLastItem) {
              icon = IconLast;
            }

            return (
              <Item
                key={i}
                icon={icon}
                line={line}
                lineOffset={lineOffset}
                withoutLine={isLastItem}
                stepNumber={i + 1}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}

Stepper.propTypes = {
  itemsList: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default Stepper;
