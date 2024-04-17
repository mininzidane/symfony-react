/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import DocumentGraySvg from './img/document-gray.svg';
import useStyles from './useStyles';
import SectionTitle from '../SectionTitle';
import SectionSubtitle from '../SectionSubtitle';
import DocumentEntry from '../DocumentEntry';

function DocumentsToSign({ documents, openModal }) {
  const classes = useStyles();
  const count = documents.length;

  useEffect(() => {
    const token = RouterService.getQueryParam('signToken');

    if (token) {
      const $cta = document.getElementById(`sign-cta-${token}`);

      if ($cta) {
        $cta.click();
      }
    }
  }, []);

  return (
    <div className={classes.root}>
      <SectionTitle text={<FormattedMessage id="documentsPage.documentsToSign" />} count={count} />
      <SectionSubtitle
        text={
          count ? (
            <FormattedMessage id="documentsPage.thereAreDocsToSign" values={{ count }} />
          ) : (
            <FormattedMessage id="documentsPage.thereAreNoDocsToSign" />
          )
        }
      />

      <div className={classes.documentsList}>
        {Boolean(count) &&
          documents.map((doc, index) => (
            <DocumentEntry
              icon={<img src={DocumentGraySvg} width="32" alt="Document" />}
              title={doc.lot?.description}
              subtitle={<FormattedMessage id="documentsPage.requiredForLiveBidding" />}
              action={
                doc.currentEnvelopeAssigned ? (
                  <Button
                    size="sm"
                    href={RouterService.getRoute('documentsSign', null, null, { token: doc.token })}
                    label={<FormattedMessage id="documentsPage.signOnline" />}
                    id={`sign-cta-${doc.token}`}
                    isNowrap
                  />
                ) : (
                  <Button
                    size="sm"
                    onClick={() => openModal(doc)}
                    label={<FormattedMessage id="documentsPage.signOnline" />}
                    id={`sign-cta-${doc.token}`}
                    isNowrap
                  />
                )
              }
              isMobileActionFullWidth
              type="highlighted"
              key={index}
            />
          ))}
      </div>
    </div>
  );
}

export default DocumentsToSign;
