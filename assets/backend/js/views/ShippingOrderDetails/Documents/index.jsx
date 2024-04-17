import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UploadedDocumentCard from 'backend/js/components/UploadedDocumentCard';

class Documents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: props.documents,
    };
  }

  render() {
    const { documents } = this.state;

    if (documents.length === 0) {
      return null;
    }

    return (
      <div className="vehicle-bol">
        <h4 className="vehicle-bol__header">Additional Documents ({documents.length})</h4>

        <div className="uploaded-documents__card-list">
          {documents.map((document) => (
            <UploadedDocumentCard key={document.id} document={document} />
          ))}
        </div>
      </div>
    );
  }
}

Documents.propTypes = {
  documents: PropTypes.array.isRequired,
};

export default Documents;
