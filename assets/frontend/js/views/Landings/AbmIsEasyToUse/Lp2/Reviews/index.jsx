import React from 'react';
import Container from 'frontend/js/components/Container';
import { FormattedMessage } from 'react-intl-phraseapp';
import Card from './Card';
import useStyles from './useStyles';
import SignUpCta from '../Shared/SignUpCta';

function Reviews() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <h4 className={classes.title}>
          <FormattedMessage id="homePage.reviews.title" />
        </h4>

        <div className={classes.grid}>
          <Card
            name="Rodolfo Otalora"
            date="September 27"
            rating={5}
            text="I bought 2 times cars . One for me and for my wife. Very smooth transactions. Highly recommended"
          />
          <Card
            name="EdandNovella Greer"
            date="July 21"
            rating={4}
            text="This is a great company to work with. I have used them several times and have had great success. They are very professional and easy to deal with. Bryan was there when I had a question. Thanks ed"
          />
          <Card
            name="July 12"
            date="July 26"
            rating={5}
            text="Autobidmaster helped me with my purchase of 2017 Nissan Frontier truck listed on Coparts. I saved about $700 going through Autobidmaster. Brian spent extra time explaining the website and the fees charged. Great communications and service, above all saved me $$$$$."
          />
        </div>

        <div className={classes.buttonWrap}>
          <SignUpCta />
        </div>
      </Container>
    </div>
  );
}

export default Reviews;
