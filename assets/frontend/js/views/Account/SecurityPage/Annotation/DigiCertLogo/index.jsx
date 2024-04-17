/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import useScript from 'frontend/js/hooks/useScript';

function DigiCertLogo() {
  useScript('//seal.digicert.com/seals/cascade/seal.min.js');

  useEffect(() => {
    window.__dcid = window.__dcid || [];
    window.__dcid.push({ cid: 'DigiCertClickID_rX8JzsFl', tag: 'rX8JzsFl' });
  }, []);

  return <div id="DigiCertClickID_rX8JzsFl" style={{ width: 150 }} />;
}

export default DigiCertLogo;
