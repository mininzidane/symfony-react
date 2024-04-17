/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GoogleAd from 'frontend/js/components/GoogleAd';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import SectionTitle from './SectionTitle';
import Review from './Review';
import useStyles from './useStyles';
import jasonPNG from './img/jason.png';
import jason2xPNG from './img/jason@2x.png';
import josephPNG from './img/joseph.png';
import joseph2xPNG from './img/joseph@2x.png';
import justinPNG from './img/justin.png';
import justin2xPNG from './img/justin@2x.png';

function Reviews({ hasViewAllButton, hasGoogleAdd, className, bgColor, reviews, fullWidth }) {
  const { isAuthenticated } = useCustomerHelper();
  const classes = useStyles({ isAuthenticated, bgColor });

  const reviewsItems = reviews || [
    {
      name: <FormattedMessage id="homePage.reviews.reviewer1.justin" />,
      photo: justinPNG,
      photo2x: justin2xPNG,
      message: <FormattedMessage id="homePage.reviews.reviewer1.message" />,
      rating: 5,
    },
    {
      name: <FormattedMessage id="homePage.reviews.reviewer2.jason" />,
      photo: jasonPNG,
      photo2x: jason2xPNG,
      message: <FormattedMessage id="homePage.reviews.reviewer2.message" />,
      rating: 5,
    },
    {
      name: <FormattedMessage id="homePage.reviews.reviewer3.joseph" />,
      photo: josephPNG,
      photo2x: joseph2xPNG,
      message: <FormattedMessage id="homePage.reviews.reviewer3.message" />,
      rating: 4,
    },
  ];

  const WrapContainer = ({ children }) =>
    fullWidth ? (
      <ContainerFullScreen className={classes.container}>{children}</ContainerFullScreen>
    ) : (
      <Container>{children}</Container>
    );

  return (
    <div className={classnames(classes.root, className)}>
      {hasGoogleAdd && (
        <GoogleAd
          id="div-gpt-ad-1664571155246-0"
          className="mt-10 width-xl-728 width-sm-300"
          adUnitPath="/93216436/homepage-728*90-300*50"
          targetsArray={['page_spot', ['bottom_1']]}
          pubTargetsArray={['page', ['main_page']]}
          placement="homepage_reviews"
          withSlot
        />
      )}

      <article className={classes.article}>
        <WrapContainer>
          <SectionTitle text={<FormattedMessage id="homePage.reviews.title" />} tagName="h3" />

          <section className={classes.content}>
            {reviewsItems.map((review, index) => (
              <Review
                key={index}
                name={review.name}
                photo={review.photo}
                photo2x={review.photo2x}
                message={review.message}
                rating={review.rating}
              />
            ))}
          </section>

          {hasViewAllButton && (
            <div className={classes.footer}>
              <Button
                label={<FormattedMessage id="homePage.reviews.viewAll" />}
                href={RouterService.getRoute('autoBidMasterReviews')}
                color="blue"
                isInline
                isShadowless
              />
            </div>
          )}
        </WrapContainer>
      </article>
    </div>
  );
}

Reviews.propTypes = {
  bgColor: PropTypes.string,
  reviews: PropTypes.array,
  fullWidth: PropTypes.bool,
};

Reviews.defaultProps = {
  bgColor: 'white',
  reviews: null,
  fullWidth: false,
};

export default Reviews;
