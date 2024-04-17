import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';

import icon from './ic_login_password.svg';

function Title() {
  return (
    <CaptionPanel
      label={<FormattedMessage id="securityPage.title" />}
      iconSize={{ width: 18, height: 20 }}
      icon={icon}
    />
  );
}

export default Title;
