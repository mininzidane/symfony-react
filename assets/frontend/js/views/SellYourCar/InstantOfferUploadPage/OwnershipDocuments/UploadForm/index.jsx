import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FilesUpload from 'frontend/js/components/Form/FilesUpload';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import useStyles from '../useStyles';

function UploadForm({ formik, contentType }) {
  const classes = useStyles();
  const { FILE_CONTENT_TYPES } = InstantOfferService;

  return (
    <form onSubmit={formik.handleSubmit} className={classes.grid}>
      <div className={classnames(classes.filesUpload, contentType === FILE_CONTENT_TYPES.DOCUMENT && 'is-document')}>
        <FilesUpload
          id="files"
          name="files"
          fileValues={formik.values.files}
          accept="image/png,image/jpg,image/jpeg"
          error={formik.errors.files}
          touched={formik.touched.files}
          onTouched={formik.setFieldTouched}
          onError={formik.setFieldError}
          isDropArea
          isLoading={false}
          dropAreaType={contentType === FILE_CONTENT_TYPES.DOCUMENT ? 'carTitle' : 'carPhotos'}
          onChange={formik.setFieldValue}
          filesContainerClassName={classes.files}
          fileWrapClassName={classes.fileWrap}
          dropAreaClassName={classnames(classes.dropArea, contentType === FILE_CONTENT_TYPES.DOCUMENT && 'is-document')}
          multiple
        />
      </div>
    </form>
  );
}

UploadForm.propTypes = {
  formik: PropTypes.object.isRequired,
  contentType: PropTypes.string.isRequired,
};

export default UploadForm;
