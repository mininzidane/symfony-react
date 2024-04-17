import React, { useState } from 'react';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import EditIconSvg from './img/edit-icon.svg';
import useStyles from './useStyles';

function EditableInput({ ...props }) {
  const classes = useStyles();
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <div className={classes.root}>
      <InputPlane {...props} disabled={isDisabled} />
      {isDisabled && (
        <button type="button" onClick={() => setIsDisabled(!isDisabled)} className={classes.editButton}>
          <img width="14px" height="14px" src={EditIconSvg} alt="Edit" />
        </button>
      )}
    </div>
  );
}

export default EditableInput;
