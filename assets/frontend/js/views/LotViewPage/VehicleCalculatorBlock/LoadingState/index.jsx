import React from 'react';
import Row from 'frontend/js/components/LoadingRow';
import Card from '../../LotPageCard';
import CardIndentedContent from '../../LotPageCard/CardIndentedContent';
import LotPageBlock from '../../LotPageBlock';
import useStyles from './useStyles';

function LoadingState() {
  const classes = useStyles();

  return (
    <LotPageBlock>
      <Card title={<Row style={{ height: 23, width: '360px' }} />}>
        <CardIndentedContent>
          <div className={classes.grid}>
            <div className={classes.refinements}>
              <Row style={{ height: 46, width: '100%' }} />
              <Row style={{ height: 46, width: '100%', marginTop: 26 }} />
              <Row style={{ height: 46, width: '100%', marginTop: 26 }} />
              <Row style={{ height: 46, width: '100%', marginTop: 26 }} />
              <Row style={{ height: 46, width: '100%', marginTop: 26 }} />
              <Row style={{ height: 46, width: '100%', marginTop: 26 }} />
            </div>

            <div>
              <div className={classes.receipt}>
                <div className={classes.field1}>
                  <Row />
                  <Row />
                </div>

                <div className={classes.field2}>
                  <Row />
                  <Row />
                </div>

                <div className={classes.field1}>
                  <Row />
                  <Row />
                </div>

                <div className={classes.field2}>
                  <Row />
                  <Row />
                </div>

                <div className={classes.field1}>
                  <Row />
                  <Row />
                </div>

                <div className={classes.field2}>
                  <Row />
                  <Row />
                </div>

                <div className={classes.field1}>
                  <Row />
                  <Row />
                </div>

                <div className={classes.field2}>
                  <Row />
                  <Row />
                </div>

                <div className={classes.field1}>
                  <Row />
                  <Row />
                </div>

                <Row className={classes.summary} />
              </div>

              <div className={classes.footer}>
                <Row style={{ width: '60px' }} />
                <Row style={{ width: '100px' }} />
                <Row style={{ width: '90px' }} />
              </div>
            </div>
          </div>
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

LoadingState.propTypes = {};

export default LoadingState;
