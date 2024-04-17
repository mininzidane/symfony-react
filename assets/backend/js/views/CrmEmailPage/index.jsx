import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CrmEmailService from '../../api/CrmEmailService';
import CrmEmailForm from './CrmEmailForm';
import FlashMessage from '../../components/FlashMessage';

function CrmEmailPage({ crmEmailEntity, supportedLocales }) {
  const defaultFlash = { message: '', type: '' };
  const [isLoading, setIsLoading] = useState(true);
  const [crmEmail, setCrmEmail] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const [flash, setFlash] = useState(defaultFlash);
  const crmEmailService = new CrmEmailService();

  async function handleOnSubmit(payload) {
    setFlash(defaultFlash);
    if (editMode) {
      const { id } = crmEmail;
      return crmEmailService.updateCrmEmail(id, payload);
    }

    return crmEmailService.createCrmEmail(payload);
  }

  function handleOnSubmitSuccess(updatedContent) {
    const message = editMode ? 'Content Updated' : 'Content Added';
    setFlash({ message, type: 'success' });

    setCrmEmail(updatedContent);
    setEditMode(true);
  }

  function handleOnSubmitError(errorMessages) {
    setFlash({ message: errorMessages, type: 'error' });
  }

  useEffect(() => {
    if (crmEmailEntity) {
      try {
        const entity = JSON.parse(crmEmailEntity);
        setCrmEmail(entity);
        setEditMode(true);
      } catch (e) {
        /** Ignore */
      }
    }

    setIsLoading(false);
  }, []);

  return (
    <div className="wrapper wrapper-content">
      {flash.message && <FlashMessage message={flash.message} type={flash.type} />}
      <div className="ibox float-e-margins">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <div className="ibox-title">
              <h2>{editMode && crmEmail ? <>Edit Crm Email {crmEmail.id}</> : <>Create Crm Email</>}</h2>
            </div>

            <div className="ibox-content">
              <CrmEmailForm
                crmEmail={crmEmail}
                supportedLocales={supportedLocales}
                onSubmit={handleOnSubmit}
                onSubmitSuccess={handleOnSubmitSuccess}
                onSubmitError={handleOnSubmitError}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

CrmEmailPage.propTypes = {
  crmEmailEntity: PropTypes.string,
  supportedLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CrmEmailPage.defaultProps = {
  crmEmailEntity: undefined,
};

const $el = document.getElementById('crm-email');
if ($el) {
  const crmEmailEntity = $el.getAttribute('data-crm-email');
  const supportedLocales = JSON.parse($el.getAttribute('data-supported-locales')) || [];

  ReactDOM.render(<CrmEmailPage crmEmailEntity={crmEmailEntity} supportedLocales={supportedLocales} />, $el);
}
