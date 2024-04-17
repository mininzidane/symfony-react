import React from 'react';
import classnames from 'classnames';
import Container from 'frontend/js/components/Container';
import useStyles from '../useStyles';

function Step3() {
  const classes = useStyles();

  return (
    <section className={classnames(classes.step, 'is-step-3')}>
      <Container className={classes.container} mobilePadding={14}>
        <div className="grid-x pos-r">
          <div className={classes.half}>
            <div className={classnames(classes.card, 'with-right-tri')} data-is-reveal-on-scroll>
              <div className={classes.cardLabel}>ШАГ 3</div>
              <div className={classes.cardCaption}>Делайте ставки и доставляйте Ваше авто в Украину с нами!</div>
              <p>
                Вы можете делать ставки на все транспортные средства. Сбор за покупку составляет всего 299 дол. Самые
                низкие цены на доставку в Украину только у нас!
              </p>
            </div>
          </div>
          <div className={classnames(classes.half, 'ta-c text-0')}>
            <div className={classes.line}>
              <div className={classes.pin} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Step3;
