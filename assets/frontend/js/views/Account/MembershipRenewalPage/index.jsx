import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useSnackbar } from 'notistack';
import Container from 'frontend/js/components/Container';
import Card from 'frontend/js/components/Card';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import MembershipRenewalForm from './MembershipRenewalForm';
import Modal from './Modal';
import MembershipRenewalContext from './_Context';
import useMembershipRenewalContext from './_Context/useMembershipRenewalContext';
import useStyles from './useStyles';
import RenewalSettingsSvg from './img/ic-renewal-settings.svg';

function MembershipRenewalPage() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, form } = useMembershipRenewalContext();

  const messages = {
    submitSuccess: <FormattedMessage id="membershipSettings.updateSuccess" />,
    submitError: <FormattedMessage id="form.error.general" />,
  };

  useEffect(() => {
    if (form.submitStatus === true) {
      enqueueSnackbar(messages.submitSuccess, { variant: 'success' });
    }

    if (form.submitStatus === false) {
      enqueueSnackbar(messages.submitError, { variant: 'error' });
    }

    form.resetSubmitStatus();
  }, [form.submitStatus]);

  return (
    <>
      <CaptionPanel label={<FormattedMessage id="membershipSettings.caption" />} icon={RenewalSettingsSvg} />

      <Container className={classes.container}>
        {loading ? (
          <SpinnerWheel size={34} thickness={3} isCentered />
        ) : (
          <Card>
            <MembershipRenewalForm />
          </Card>
        )}
      </Container>
      <Modal />
    </>
  );
}

export default () => (
  <MembershipRenewalContext>
    <MembershipRenewalPage />
  </MembershipRenewalContext>
);
