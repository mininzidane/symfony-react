import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

function UploadedDocumentCard({ document, checked, toggle }) {
  const isImage = useMemo(
    () =>
      (typeof document.mime_type !== 'undefined' && document.mime_type !== 'application/pdf') ||
      new RegExp(/\.(jpe?g|png)$/i).test(document.file_name),
  );

  return (
    <div className="uploaded-document-card">
      <div className="uploaded-document-card__action">
        <input name="externalImages" type="checkbox" checked={checked} value="1" onChange={toggle} />
      </div>
      <div className="document__preview">
        <a href={document.s3_url} target="_blank" rel="noopener noreferrer">
          {isImage === true ? (
            <img src={document.s3_url} alt={document.file_name} />
          ) : (
            <div className="document__placeholder">
              <i className="fa fa-file" />
            </div>
          )}
        </a>
      </div>
    </div>
  );
}

UploadedDocumentCard.defaultProps = {
  checked: false,
  toggle: () => {},
};

UploadedDocumentCard.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.number,
    file_name: PropTypes.string,
    mime_type: PropTypes.string,
    s3_url: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
  checked: PropTypes.bool,
  toggle: PropTypes.func,
};

export default React.memo(UploadedDocumentCard);
