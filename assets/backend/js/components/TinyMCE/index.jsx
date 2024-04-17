import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Editor } from '@tinymce/tinymce-react';
import appConfig from './config';
import registeredPlugins from './Plugins';

function TinyMCE({
  value,
  className,
  config,
  externalPlugins,
  contentCss,
  onChange,
  imageUploadUrl,
  onImageUploadSuccess,
  placeholder,
}) {
  const { apiKey, config: defaultConfig } = appConfig;

  const mceConfig = { ...defaultConfig, ...config };
  if (externalPlugins && externalPlugins.length) {
    const pluginsStr = externalPlugins.join(' ');
    if (!mceConfig.plugins.includes(pluginsStr)) {
      mceConfig.plugins.push(pluginsStr);
    }

    mceConfig.setup = (mceEditor) => {
      externalPlugins.forEach((pluginKey) => {
        if (typeof registeredPlugins[pluginKey] === 'function') {
          registeredPlugins[pluginKey](mceEditor);
        }
      });
    };
  }

  if (contentCss) {
    mceConfig.content_css = contentCss;
  }

  if (placeholder) {
    mceConfig.placeholder = placeholder;
  }

  if (imageUploadUrl) {
    mceConfig.image_uploadtab = true;
    mceConfig.image_upload_url = imageUploadUrl;
    mceConfig.images_upload_handler = (blobInfo, success, failure) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', imageUploadUrl);

      xhr.onload = () => {
        if (xhr.status < 200 || xhr.status >= 300) {
          failure(`HTTP Error: ${xhr.status}`);
          return;
        }

        const json = JSON.parse(xhr.responseText);
        if (!json || typeof json.location !== 'string') {
          failure(`Invalid JSON: ${xhr.responseText}`);
          return;
        }

        success(json.location);
        onImageUploadSuccess(json);
      };

      xhr.onerror = () => {
        failure(`Image upload failed due to a XHR Transport error. Code: ${xhr.status}`);
      };

      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    };
  }

  return (
    <div className={classNames('content-editor', className)}>
      <Editor apiKey={apiKey} init={{ ...mceConfig }} value={value} onEditorChange={onChange} />
    </div>
  );
}

TinyMCE.propTypes = {
  config: PropTypes.shape({
    plugins: PropTypes.arrayOf(PropTypes.string),
    toolbar: PropTypes.string,
  }),
  value: PropTypes.string,
  className: PropTypes.string,
  externalPlugins: PropTypes.arrayOf(PropTypes.string),
  contentCss: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  imageUploadUrl: PropTypes.string,
  onImageUploadSuccess: PropTypes.func,
};

TinyMCE.defaultProps = {
  config: {},
  value: '',
  className: '',
  externalPlugins: [],
  contentCss: '',
  placeholder: '',
  imageUploadUrl: undefined,
  onImageUploadSuccess: () => null,
};

export default TinyMCE;
