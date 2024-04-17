import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ButtonCross from 'frontend/js/components/ButtonCross';
import useStyles from './useStyles';

function FilesList({ filesList, onRemoveFile }) {
  if (!filesList || filesList.length === 0) {
    return null;
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <div className={classes.filesList}>
          {filesList.map((file, index) => (
            <div key={index} className={classes.file}>
              <span className={classes.filename}>{file.name}</span>
              <ButtonCross onClick={() => onRemoveFile(file)} isThin size={8} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

FilesList.propTypes = {
  filesList: PropTypes.array,
  onRemoveFile: PropTypes.func,
};

FilesList.defaultProps = {
  filesList: null,
  onRemoveFile: () => {},
};

export default memo(FilesList);
