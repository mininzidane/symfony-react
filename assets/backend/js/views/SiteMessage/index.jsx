import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SiteMetaService from 'backend/js/api/SiteMetaService';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import Select from 'backend/js/components/Form/Select';
import FlashError from 'backend/js/components/Flash/FlashError';
import FlashSuccess from 'backend/js/components/Flash/FlashSuccess';
import SiteMessageForm from './SiteMessageForm';

const defaultLocale = 'en';

function SiteMessage({ pageTitle, siteMessageType }) {
  const [isLoading, setIsLoading] = useState(true);
  const [supportedLocales, setSupportedLocales] = useState([{ label: defaultLocale, value: defaultLocale }]);
  const [locale, setLocale] = useState(defaultLocale);
  const [isDomesticEnabled, setIsDomesticEnabled] = useState(false);
  const [isIntlEnabled, setIsIntlEnabled] = useState(false);
  const [messages, setMessages] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [responseError, setResponseError] = useState('');
  const [type, setType] = useState('warning');
  const [applyForAllLocales, setApplyForAllLocales] = useState('');
  const siteMetaService = new SiteMetaService();
  const supportedTypes = [
    { label: 'Warning', value: 'warning' },
    { label: 'Error', value: 'error' },
  ];

  function getMessageByLocale(selectedLocale) {
    return messages && messages[selectedLocale] && messages[selectedLocale].message
      ? messages[selectedLocale].message
      : '';
  }

  function getTitleByLocale(selectedLocale) {
    return messages && messages[selectedLocale] && messages[selectedLocale].title ? messages[selectedLocale].title : '';
  }

  function mapSupportedLocales(locales = []) {
    const supported = locales.reduce((acc, curVal) => {
      acc.push({ label: curVal, value: curVal });

      return acc;
    }, []);

    setSupportedLocales(supported);
  }

  function handleFieldUpdate(fieldLocale, fieldName, fieldValue) {
    const updatedMessages = { ...messages };
    if (!updatedMessages[fieldLocale]) {
      updatedMessages[fieldLocale] = {
        title: '',
        message: '',
      };
    }

    updatedMessages[fieldLocale][fieldName] = fieldValue;
    setMessages(updatedMessages);
  }

  function updateFromServerData(siteMessage) {
    const {
      isDomesticEnabled: domesticEnabled,
      isIntlEnabled: intlEnabled,
      supportedLocales: locales,
      messages: generalMessages,
      type: messageType,
    } = siteMessage;
    setIsDomesticEnabled(domesticEnabled);
    setIsIntlEnabled(intlEnabled);
    mapSupportedLocales(locales);
    if (generalMessages) {
      setMessages(generalMessages);
    }
    setType(messageType);
  }

  async function handleSubmit() {
    setResponseMessage('');
    setResponseError('');

    const payload = {
      isDomesticEnabled,
      isIntlEnabled,
      messages,
      type,
      applyForAllLocales,
      messageType: siteMessageType,
    };

    try {
      return siteMetaService.submitSiteMessageInformation(payload).then(({ message }) => {
        updateFromServerData(message);
        setResponseMessage('Site message updates applied.');
      });
    } catch (e) {
      setResponseError('An error occurred while saving');
    }

    return null;
  }

  useEffect(() => {
    siteMetaService
      .getSiteMessageInformation(siteMessageType)
      .then(({ message }) => {
        updateFromServerData(message);
      })
      .catch(() => null)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="ibox flow-e-margins">
          <div className="ibox-title">
            <h2>{pageTitle}</h2>
          </div>
          <div className="ibox-content">
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <div className="general-settings m-b-md">
                  <div className="row">
                    <div className="col-lg-12">
                      {responseError && <FlashError message={responseError} />}
                      {!responseError && responseMessage && <FlashSuccess message={responseMessage} />}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 d-flex ai-fe">
                      <div style={{ width: '200px', marginRight: 10 }}>
                        <Select
                          id="locale"
                          name="locale"
                          label="Locale"
                          value={locale}
                          options={supportedLocales}
                          onBlur={() => null}
                          onChange={(name, value) => setLocale(value)}
                          styles={{
                            menu: (provided) => ({
                              ...provided,
                              zIndex: 9,
                            }),
                          }}
                        />
                      </div>
                      <div style={{ width: '200px', marginRight: 10 }}>
                        <Select
                          id="type"
                          name="type"
                          label="Type"
                          value={type}
                          options={supportedTypes}
                          onBlur={() => null}
                          onChange={(name, value) => setType(value)}
                          styles={{
                            menu: (provided) => ({
                              ...provided,
                              zIndex: 9,
                            }),
                          }}
                        />
                      </div>
                      <FormikTickbox
                        id="domesticEnabled"
                        name="domesticEnabled"
                        className="m-r-sm"
                        value={isDomesticEnabled}
                        onChange={(name, value) => setIsDomesticEnabled(value)}
                      >
                        Dom Enable
                      </FormikTickbox>
                      <FormikTickbox
                        id="intlEnabled"
                        name="intlEnabled"
                        className="m-r-sm"
                        value={isIntlEnabled}
                        onChange={(name, value) => setIsIntlEnabled(value)}
                      >
                        Intl Enable
                      </FormikTickbox>
                      <FormikTickbox
                        id="applyForAllLocales"
                        name="applyForAllLocales"
                        value={applyForAllLocales}
                        onChange={(name, value) => setApplyForAllLocales(value)}
                      >
                        Apply for all locales
                      </FormikTickbox>
                    </div>
                    <div className="col-lg-6" />
                  </div>
                </div>
                <hr />

                {locale && (
                  <SiteMessageForm
                    locale={locale}
                    title={getTitleByLocale(locale)}
                    message={getMessageByLocale(locale)}
                    onFieldUpdate={handleFieldUpdate}
                    onSubmit={handleSubmit}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

SiteMessage.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  siteMessageType: PropTypes.string.isRequired,
};

const $el = document.getElementById('message-site-meta');
if ($el) {
  const pTitle = $el.dataset.pageTitle;
  const mType = $el.dataset.messageType;
  ReactDOM.render(<SiteMessage pageTitle={pTitle} siteMessageType={mType} />, $el);
}
