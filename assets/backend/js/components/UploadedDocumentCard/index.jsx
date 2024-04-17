import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ConfirmModal from 'backend/js/components/ConfirmModal';

function UploadedDocumentCard({ document, content, removeCallback, undoRemoveCallback }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { isImage, isVideo } = useMemo(
    () => ({
      isImage: document?.mime_type?.includes('image/') || new RegExp(/\.(jpe?g|png)$/i).test(document.file_name),
      isVideo: document?.mime_type?.includes('video/'),
    }),
    [document],
  );

  const hasActiveFlag = typeof document.active !== 'undefined';

  return (
    <div className="uploaded-document-card">
      {removeCallback && (document.active || !hasActiveFlag) && (
        <>
          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={() => {
              removeCallback(document);
              setIsConfirmOpen(false);
            }}
            title="Do you want to remove document?"
            subtitle={<>This action can&apos;t be undone.</>}
          />
          <button type="button" className="btn--delete-id" onClick={() => setIsConfirmOpen(true)}>
            <i className="fa fa-remove" />
          </button>
        </>
      )}
      {!document.active && hasActiveFlag && (
        <button type="button" className="btn--delete-id" onClick={() => undoRemoveCallback(document)}>
          <i className="fa fa-plus" />
        </button>
      )}
      <div className="document__preview" style={document.active || !hasActiveFlag ? {} : { opacity: 0.3 }}>
        <a href={document.s3_url} target="_blank" rel="noopener noreferrer">
          {isImage ? (
            <img src={document.s3_url} alt={document.file_name} />
          ) : (
            <>
              {isVideo ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={document.s3_url} alt={document.file_name} controls />
              ) : (
                <div className="document__placeholder">
                  <i className="fa fa-file" />
                </div>
              )}
            </>
          )}
        </a>
      </div>
      {content && <div className="document__content">{content}</div>}
    </div>
  );
}

UploadedDocumentCard.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.number,
    file_name: PropTypes.string,
    mime_type: PropTypes.string,
    s3_url: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
  content: PropTypes.string,
  removeCallback: PropTypes.func,
  undoRemoveCallback: PropTypes.func,
};

UploadedDocumentCard.defaultProps = {
  content: null,
  removeCallback: null,
  undoRemoveCallback: null,
};

export default React.memo(UploadedDocumentCard);
