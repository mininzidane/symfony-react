import React from 'react';
import PropTypes from 'prop-types';
import FilesUpload from 'frontend/js/components/Form/FilesUpload';
import useStyles from '../useStyles';

function PhotosForm({ formik }) {
  const classes = useStyles();

  return (
    <form onSubmit={formik.handleSubmit} className={classes.grid}>
      <div className={classes.filesUpload}>
        <FilesUpload
          label="UPLOAD FILE(S)"
          id="photos"
          name="photos"
          fileValues={formik.values.photos}
          accept="image/png,image/jpg,image/jpeg,.pdf"
          error={formik.errors.photos}
          touched={formik.touched.photos}
          onTouched={formik.setFieldTouched}
          onError={formik.setFieldError}
          isDropArea
          isLoading={false}
          dropAreaType="carPhotos"
          onChange={formik.setFieldValue}
          filesClassName={classes.files}
          fileWrapClassName={classes.fileWrap}
          dropAreaClassName={classes.dropArea}
          multiple
        />
      </div>
    </form>
  );
}

PhotosForm.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default PhotosForm;
