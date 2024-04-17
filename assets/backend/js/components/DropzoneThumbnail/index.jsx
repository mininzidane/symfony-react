import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import MathUtils from '../../lib/MathUtils';

class DropzoneThumbnail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      src: undefined,
    };
  }

  componentDidMount() {
    this.loadImagePreview();
  }

  loadImagePreview() {
    const { file } = this.props;

    this.setState({ loading: true }, () => {
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          this.setState({ loading: false, src: reader.result });
        },
        false,
      );

      reader.readAsDataURL(file);
    });
  }

  isVideo() {
    const { file } = this.props;
    return file.type?.includes('video');
  }

  isImage() {
    const { file } = this.props;
    return file.type?.includes('image');
  }

  render() {
    const { file, width, height, deleteAllowed, onDelete } = this.props;
    const { loading, src } = this.state;
    const dropzoneStyle = {
      position: 'relative',
      width,
      height,
      margin: '5px 10px',
    };

    if (!file) {
      return null;
    }

    return (
      <div className="dropzone-thumbnail-wrapper" style={dropzoneStyle}>
        {src && !loading ? (
          <>
            {deleteAllowed && (
              <Button
                className="btn-xs btn-danger btn-outline"
                label={<i className="fa fa-trash" />}
                disabled={loading}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onDelete(file);
                }}
              />
            )}
            <div className="dropzone-img-wrapper" style={{ height: '100%' }}>
              {this.isImage() ? (
                <img src={src} alt={file.name} style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto' }} />
              ) : (
                <>
                  {this.isVideo() ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video src={src} alt={file.name} controls />
                  ) : (
                    <div className="dropzone-thumbnail-file">
                      <div className="thumbnail-file__size">{MathUtils.formatBytes(file.size)}</div>
                      <div className="thumbnail-file__name">{file.name}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

DropzoneThumbnail.defaultProps = {
  width: 150,
  height: 150,
  deleteAllowed: false,
};

DropzoneThumbnail.propTypes = {
  file: PropTypes.instanceOf(File).isRequired,
  onDelete: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  deleteAllowed: PropTypes.bool,
};

export default DropzoneThumbnail;
