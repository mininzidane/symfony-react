/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import AdbutlerService from 'frontend/js/api/AdbutlerService';
import useAbkw from './useAbkw';
import useStyles from './useStyles';

function AdbutlerAdvertisement({ id, className, lotId }) {
  const classes = useStyles();
  const [advertisement, setAdvertisement] = useState('');

  const adbutlerService = new AdbutlerService();
  const rnd = window.rnd || Math.floor(Math.random() * 10e6);

  const pidVal = window[`pid${id}`] || rnd;
  const plcVal = window[`plc${id}`] || 0;
  const abkw = useAbkw();

  const extraParams = lotId ? `extra=lotNumber%3D${lotId};` : '';

  const src = `https://ads.autobidmaster.com/adserve/;ID=182542;size=0x0;setID=${id};type=iframe;sw=${window.screen.width};sh=${window.screen.height};spr=${window.devicePixelRatio};kw=${abkw};pid=${pidVal};place=${plcVal};rnd=${rnd};${extraParams}click=CLICK_MACRO_PLACEHOLDER`;

  useEffect(() => {
    adbutlerService
      .getAdvertisement(src)
      .then((response) => {
        const linkRegExp = /<a.*?<\/a>/g;
        const match1 = linkRegExp.exec(response);

        if (match1) {
          return setAdvertisement(match1[0]);
        }

        const errorRegExp = /<img\s.*?>/g;
        const match2 = errorRegExp.exec(response);
        if (match2) {
          setAdvertisement(match2);
        }

        return null;
      })
      .catch(() => {
        /** Ignore */
      });
  }, []);

  if (!advertisement) {
    return null;
  }

  return (
    <div className={classnames(classes.wrap, className)}>
      <div className={classes.container}>
        <div className={classes.ad} dangerouslySetInnerHTML={{ __html: advertisement }} />
      </div>
    </div>
  );
}

export default AdbutlerAdvertisement;
