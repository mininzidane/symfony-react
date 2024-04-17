/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Link from 'frontend/js/components/Link';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import SectionTitle from '../SectionTitle';
import DocumentEntry from '../DocumentEntry';
import DocumentGreenSvg from './img/document-green.svg';
import useStyles from './useStyles';

function DocumentsSigned({ documents }) {
  const classes = useStyles();
  const count = documents.length;
  const ga = new GoogleAnalyticsService();

  if (!count) {
    return null;
  }

  return (
    <div className={classes.root}>
      <SectionTitle text={<FormattedMessage id="documentsPage.signedDocuments" />} count={count} />

      <div className={classes.documentsList}>
        {documents.map((doc, index) => (
          <DocumentEntry
            icon={<img src={DocumentGreenSvg} width="32" alt="Document" />}
            title={doc.lot?.description}
            subtitle={<FormattedMessage id="documentsPage.requiredForLiveBidding" />}
            action={
              doc.activeBos && (
                <Link
                  href={doc.activeBos.s3Url}
                  onClick={() => ga.sendEvent('download_copy', 'bill_of_sale', 'download_copy')}
                  isNoWrap
                  isTargetBlank
                >
                  <FormattedMessage id="shared.cta.downloadPdf" />
                </Link>
              )
            }
            isMobileActionFullWidth
            type="default"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default DocumentsSigned;
