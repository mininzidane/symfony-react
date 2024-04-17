import React from 'react';
import Card from 'frontend/js/components/Card';
import BidderForm from './BidderForm';
import useStyles from './useStyles';
import useBidderFormContext from '../../../_Context/useBidderFormContext';

function Form() {
  const classes = useStyles();
  const { form } = useBidderFormContext();
  return (
    <Card elevation={2} className={classes.root}>
      <BidderForm setForm={form.set} customer={window.customer} />
    </Card>
  );
}

export default Form;
