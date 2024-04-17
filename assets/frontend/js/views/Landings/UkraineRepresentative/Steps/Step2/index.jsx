import React from 'react';
import classnames from 'classnames';
import Container from 'frontend/js/components/Container';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import Step2SVG from './img/Step_2-2@2x.svg';
import useStyles from '../useStyles';

function Step2() {
  const classes = useStyles();
  const demoDeposit = `$${BuyerPowerService.minDepositAmount}`;

  return (
    <section className={classnames(classes.step, 'is-step-2')}>
      <Container className={classes.container} mobilePadding={14}>
        <div className="grid-x pos-r">
          <div className={classnames(classes.half, 'ta-c')}>
            <img className={classes.slider} width="392px" src={Step2SVG} alt="Step 2" />
          </div>
          <div className={classes.half}>
            <div className={classes.line}>
              <div className={classes.pin} />
            </div>
            <div className={classnames(classes.card, 'with-left-tri')} data-is-reveal-on-scroll>
              <div className={classes.cardLabel}>ШАГ 2</div>
              <div className={classes.cardCaption}>Разместите Депозит.</div>
              <p>
                Все ставки на аукционе окончательные и не могут быть изменены или отменены. В случае если вы выиграете
                авто, но не оплатите его, мы обязаны заплатить штраф компании Copart.
                <br />
                <br />
                Для гарантии того, что вы выкупите авто после победы на аукционе, вам необходимо разместить Депозит.
                Сумма депозита - это не оплата услуг, полная сумма депозита будет возвращена в случае если у вас нет
                неоплаченных платежей.
                <br />
                <br />
                Ваш Депозит должен составлять
                <strong>10%</strong> от вашей финальной ставки, но не меньше чем <strong>{demoDeposit}</strong>.
                <br />
                <br />
                <i style={{ color: 'rgb(146, 146, 146)' }}>
                  Пример: вы готовы выкупить машину за $12,000, депозит должен составлять $1,200
                </i>
              </p>
            </div>
            <div className={classnames(classes.withSlideUpAnimation, 'ta-c')} data-is-reveal-on-scroll>
              <img className={classes.sliderMobile} width="392px" src={Step2SVG} alt="Step 2" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Step2;
