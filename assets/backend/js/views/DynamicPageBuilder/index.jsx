import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DynamicPageService from '../../api/DynamicPageService';
import FlashMessage from '../../components/FlashMessage';
import useFlash from '../../hooks/useFlash';
import DynamicPageForm from './DynamicPageForm';

function DynamicPageBuilder({ dynamicPageEntity, supportedLocales, contentCss }) {
  const [dynamicPage, setDynamicPage] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const { flash, setFlash, resetFlash } = useFlash();
  const dynamicPageService = new DynamicPageService();

  async function handleOnSubmit(payload) {
    resetFlash();
    if (editMode) {
      const { id } = dynamicPage;
      return dynamicPageService.updateDynamicPage(id, payload);
    }

    return dynamicPageService.createDynamicPage(payload);
  }

  function handleOnSubmitSuccess(updatedContent) {
    const message = editMode ? 'Page Updated' : 'Page Added';
    setFlash(message, 'success');

    setDynamicPage(updatedContent);
    setEditMode(true);
  }

  function handleOnSubmitError(errorMessages) {
    setFlash(errorMessages, 'error');
  }

  useEffect(() => {
    if (dynamicPageEntity) {
      try {
        const entity = JSON.parse(dynamicPageEntity);
        setDynamicPage(entity);
        setEditMode(true);
      } catch (e) {
        /** Ignore */
      }
    }
  }, []);

  return (
    <div className="wrapper wrapper-content">
      {flash.message && <FlashMessage message={flash.message} type={flash.type} />}
      <div className="ibox float-e-margins">
        <div className="ibox-title">
          <h2>{editMode && dynamicPage ? <>Edit Dynamic Page {dynamicPage.id}</> : <>Create Dynamic Page</>}</h2>
        </div>

        <div className="ibox-content">
          <DynamicPageForm
            dynamicPage={dynamicPage}
            contentCss={contentCss}
            onSubmit={handleOnSubmit}
            onSubmitSuccess={handleOnSubmitSuccess}
            onSubmitError={handleOnSubmitError}
            supportedLocales={supportedLocales}
          />
        </div>
      </div>
    </div>
  );
}

DynamicPageBuilder.propTypes = {
  dynamicPageEntity: PropTypes.string,
  supportedLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
  contentCss: PropTypes.string,
};

DynamicPageBuilder.defaultProps = {
  dynamicPageEntity: undefined,
  contentCss: '',
};

const $el = document.getElementById('dynamic-page-builder');
if ($el) {
  const dynamicPageEntity = $el.getAttribute('data-dynamic-page');
  const supportedLocales = JSON.parse($el.getAttribute('data-supported-locales')) || [];
  const dynamicPageCssFile = $el.getAttribute('data-dynamic-page-css');

  ReactDOM.render(
    <DynamicPageBuilder
      dynamicPageEntity={dynamicPageEntity}
      supportedLocales={supportedLocales}
      contentCss={dynamicPageCssFile}
    />,
    $el,
  );
}
