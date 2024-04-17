import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

import useIntl from 'frontend/js/hooks/useIntl';
import Container from 'frontend/js/components/Container';

import itemImg1 from './img/1.svg';
import itemImg2 from './img/2.svg';
import itemImg3 from './img/3.svg';
import Item from './Item';
import useStyles from './useStyles';

function Features() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <section className={classes.root}>
      <Container>
        <div className={classes.content}>
          <h2 className={classes.title}>
            <FormattedMessage id="landings.abmIsEasyToUse.shared.features.title" />
          </h2>
          <div className={classes.items}>
            <Item
              imgSrc={itemImg1}
              title={intl.formatMessage({ id: 'landings.abmIsEasyToUse.shared.features.feature1.title' })}
              description={intl.formatMessage({ id: 'landings.abmIsEasyToUse.shared.features.feature1.text' })}
            />
            <Item
              imgSrc={itemImg2}
              title={intl.formatMessage({ id: 'landings.abmIsEasyToUse.shared.features.feature2.title' })}
              description={intl.formatMessage({ id: 'landings.abmIsEasyToUse.shared.features.feature2.text' })}
            />
            <Item
              imgSrc={itemImg3}
              title={intl.formatMessage(
                { id: 'landings.abmIsEasyToUse.shared.features.feature3.title' },
                { br: <br /> },
              )}
              description={intl.formatMessage({ id: 'landings.abmIsEasyToUse.shared.features.feature3.text' })}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Features;
