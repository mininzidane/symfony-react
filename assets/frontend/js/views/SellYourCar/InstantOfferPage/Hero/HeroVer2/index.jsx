import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ButtonCross from 'frontend/js/components/ButtonCross';
import LeadForm from '../LeadForm';
import useStyles from './useStyles';

function HeroVer2({ onSubmit }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.wrap}>
          <h1 className={classes.title}>
            <FormattedMessage id="sellYourCarPage.v2.hero.title" />
          </h1>
          <Button
            color="yellow"
            label={<FormattedMessage id="shared.cta.getOffer" />}
            onClick={handleClick}
            className={classes.cta}
            isInline
            size="lg"
            id="sell-your-car-cta"
          />
        </div>
        <ModalWindow onClose={() => setIsOpen(false)} isOpen={isOpen} width={508}>
          <ModalWindowBody className={classes.modal}>
            <ButtonCross onClick={() => setIsOpen(false)} isThin className={classes.closeButton} size={18} />
            <LeadForm onSubmit={onSubmit} v2 />
          </ModalWindowBody>
        </ModalWindow>
      </Container>
    </div>
  );
}

HeroVer2.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default HeroVer2;
