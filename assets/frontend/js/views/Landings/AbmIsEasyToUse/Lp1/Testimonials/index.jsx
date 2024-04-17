import React from 'react';
import Container from 'frontend/js/components/Container';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';
import Card from './Card';

function Testimonials() {
  const classes = useStyles();

  const data = [
    {
      desc: <FormattedMessage id="stateLandingPage.reviews.review1" />,
      rating: 5,
      name: 'Kenny Gilbert',
      photo:
        '//lh4.googleusercontent.com/-aQgSad_LTA4/AAAAAAAAAAI/AAAAAAAAAAA/WIlbbyb_WHA/w75-h75-p-rp-mo-br100/photo.jpg',
    },
    {
      desc: <FormattedMessage id="stateLandingPage.reviews.review2" />,
      rating: 4,
      name: 'Cheikh Thioune',
      photo:
        '//lh5.googleusercontent.com/-qYDVAlPnLNo/AAAAAAAAAAI/AAAAAAAAAAA/3EcTIpBCBLk/w75-h75-p-rp-mo-br100/photo.jpg',
    },
    {
      desc: <FormattedMessage id="stateLandingPage.reviews.review3" />,
      rating: 5,
      name: 'Maan Al Hachim',
      photo:
        '//lh5.googleusercontent.com/-6EIWdfGNSYs/AAAAAAAAAAI/AAAAAAAAAAA/ngdRtFbYfAY/w75-h75-p-rp-mo-br100/photo.jpg',
    },
  ];

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="stateLandingPage.reviews.96_of_customers_would_use_us_again" />
        </h2>

        <div className={classes.cards}>
          {data.map((props) => (
            <Card {...props} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Testimonials;
