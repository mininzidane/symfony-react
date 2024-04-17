import { useState } from 'react';
import { useDropzone as useReactDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';

function useDropzone({
  multiple = true,
  maxSize = 50000000,
  isOverwriteFiles = false,
  accept = 'image/png,image/jpg,image/jpeg,.pdf',
  maxFiles = 0,
  onDrop = null,
} = {}) {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);

  function handleDrop(acceptedFiles, rejectedFiles) {
    if (onDrop) {
      return onDrop(acceptedFiles, rejectedFiles);
    }

    if (rejectedFiles.length) {
      rejectedFiles.forEach((file) => {
        enqueueSnackbar(
          intl.formatMessage(
            {
              id: file.size > maxSize ? 'form.error.fileUpload.tooLarge' : 'form.error.fileUpload.unsupportedFormat',
            },
            { fileName: file.name },
          ),
          { variant: 'error' },
        );
      });
      return false;
    }

    if (!acceptedFiles.length) {
      enqueueSnackbar(
        intl.formatMessage({
          id: 'form.error.fileUpload.unknownError',
        }),
        { variant: 'error' },
      );
      return false;
    }

    setFiles(isOverwriteFiles ? [...acceptedFiles] : [...files, ...acceptedFiles]);

    return true;
  }

  function onRemoveFile(file) {
    setFiles(files.filter((item) => item !== file));
  }

  function resetFiles() {
    setFiles([]);
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFileDialog,
  } = useReactDropzone({
    onDrop: handleDrop,
    noClick: true,
    noKeyboard: true,
    accept,
    maxSize,
    multiple,
    maxFiles,
  });

  return {
    files,
    resetFiles,
    onRemoveFile,
    getRootProps,
    getInputProps,
    isDragActive,
    openFileDialog,
  };
}

export default useDropzone;
