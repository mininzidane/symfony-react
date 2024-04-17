import React from 'react';
import classnames from 'classnames';
import Container from 'frontend/js/components/Container';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from '../useStyles';

function Step1() {
  const classes = useStyles();

  return (
    <section className={classnames(classes.step, 'is-step-1')}>
      <Container className={classes.container} mobilePadding={14}>
        <h3>Как получить доступ к аукционам?</h3>
        <div className="grid-x pos-r">
          <div className={classes.half}>
            <div className={classnames(classes.card, 'with-right-tri')} data-is-reveal-on-scroll>
              <div className={classes.cardLabel}>ШАГ 1</div>
              <div className={classes.cardCaption}>Зарегистрируйтесь на сайте</div>
              <p>
                <a
                  href={RouterService.getRoute('register')}
                  style={{ textDecoration: 'underline', marginRight: '5px' }}
                >
                  www.autobidmaster.com
                </a>
                <wbr />
                Указывайте свои настоящие Имя и Фамилию.
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

export default Step1;
