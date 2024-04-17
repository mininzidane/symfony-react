import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import Collapse from '@material-ui/core/Collapse';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import ButtonCross from 'frontend/js/components/ButtonCross';
import LikeSvg from './img/like.svg';
import useStyles from './useStyles';

function FacebookFeedbackBanner({ className }) {
  const classes = useStyles();
  const intl = useIntl();
  const eventTrackingService = new EventTrackingService();
  const { getRoute } = RouterService;
  const [isOpen, setOpen] = useState(true);
  const key = 'Abm::isFacebookFeedbackVisited';
  const isFacebookVisited = LocalStorageService.get(key);

  const translationSets = {
    title: intl.formatMessage({ id: 'facebookFeedback.title' }),
    description: intl.formatMessage({ id: 'facebookFeedback.description' }),
    cta: intl.formatMessage({ id: 'facebookFeedback.cta' }),
  };

  const handleLinkClick = () => {
    setOpen(false);
    LocalStorageService.set(key, true);
    eventTrackingService.sendEvent({ name: 'review_lotswon_click', step: 'abm_main' });
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  if (isFacebookVisited) {
    return null;
  }

  return (
    <Collapse in={isOpen} mountOnEnter unmountOnExit>
      <div className={classnames(classes.root, className)}>
        <div className={classes.grid}>
          <div className={classes.content}>
            <h3 className={classes.title}>{translationSets.title}</h3>
            <p className={classes.text}>{translationSets.description}</p>
          </div>

          <Button
            href={getRoute('facebookReview', false, true)}
            onClick={handleLinkClick}
            size="sm"
            className={classes.cta}
            isInline
            isNowrap
            isRegularCase
            isTargetBlank
            fontWeight={400}
            label={
              <>
                <img src={LikeSvg} className={classes.thumb} alt={translationSets.cta} />
                <span className="ws-n">{translationSets.cta}</span>
              </>
            }
          />
        </div>

        <ButtonCross onClick={handleCloseClick} size={10} className={classes.closeBtn} isThin alt="Close" />
      </div>
    </Collapse>
  );
}

FacebookFeedbackBanner.propTypes = {
  className: PropTypes.string,
};

FacebookFeedbackBanner.defaultProps = {
  className: '',
};

export default FacebookFeedbackBanner;
