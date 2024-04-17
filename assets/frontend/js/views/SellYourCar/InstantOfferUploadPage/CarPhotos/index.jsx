/* eslint-disable react/prop-types */
import React from 'react';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import UploadForms from './UploadForms';
import useStyles from './useStyles';

function CarPhotos({ instantOffer }) {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  function handleSuccess() {
    window.scrollTo(0, 0);
    enqueueSnackbar(intl.formatMessage({ id: 'form.message.informationSaved' }), { variant: 'success' });
    RouterService.redirect('sellYourCarOffer', null, false, { ref: instantOffer.ref, hash: instantOffer.hash });
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {intl.formatMessage({ id: 'sellYourCarPage.upload.photos.title' }, { firstName: instantOffer.firstName })}
      </div>
      <div className={classes.form}>
        <UploadForms instantOffer={instantOffer} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export default CarPhotos;
