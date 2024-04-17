import React, { useEffect } from 'react';
import Header from './Header';
import Receipt from './Receipt';
import Footer from './Footer';
import useStyles from './useStyles';

function VehicleCalcPrintPage() {
  const classes = useStyles();

  useEffect(() => {
    const css =
      '* { color-adjust: exact; -webkit-print-color-adjust: exact; print-color-adjust: exact; } @page { size: auto; margin: 0 }';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);

    window.print();
    setTimeout(() => {}, 500);

    return () => {
      head.removeChild(style);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Header />
      <Receipt />
      <Footer />
    </div>
  );
}

export default VehicleCalcPrintPage;
