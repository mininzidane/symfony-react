import React from 'react';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ScreenPng from './img/screen.png';
import ScreenMdPng from './img/screen-md.png';
import useStyles from './useStyles';

function KnowledgeSection() {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  return (
    <Container>
      <div className={classes.title}>
        <FormattedMessage id="clearVinHistoryReportPage.knowledgeSection.title" />
      </div>

      <div className={classes.wrap}>
        <img className={classes.img} src={isBelowSm ? ScreenMdPng : ScreenPng} alt="Screen" />
        <div className={classes.desc}>
          <FormattedMessage id="clearVinHistoryReportPage.knowledgeSection.desc" />
        </div>
      </div>
    </Container>
  );
}

KnowledgeSection.propTypes = {};

export default KnowledgeSection;
