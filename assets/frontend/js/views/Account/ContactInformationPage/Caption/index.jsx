import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import ContactInformationSvg from 'frontend/images/shared/light-blue-set/ic_contact_information.svg';

function Caption() {
  const intl = useIntl();

  const captionLabel = intl.formatMessage({ id: 'contactInformationPage.contactInformation' });

  return (
    <CaptionPanel icon={ContactInformationSvg} label={captionLabel} iconSize={{ width: 18, height: 15 }} fullscreen />
  );
}

export default Caption;
