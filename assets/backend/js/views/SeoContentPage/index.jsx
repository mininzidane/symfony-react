import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SeoContentService from '../../api/SeoContentService';
import SeoContentForm from './SeoContentForm';
import FlashMessage from '../../components/FlashMessage';

function SeoContentPage({ seoContentEntity, supportedLocales, supportedPageTypes }) {
  const defaultFlash = { message: '', type: null };
  const [isLoading, setIsLoading] = useState(true);
  const [seoContent, setSeoContent] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const [flash, setFlash] = useState(defaultFlash);
  const [availableParents, setAvailableParents] = useState([]);
  const seoContentService = new SeoContentService();

  async function handleOnSubmit(payload) {
    setFlash(defaultFlash);
    if (editMode) {
      const { id } = seoContent;
      return seoContentService.updateSeoContent(id, payload);
    }

    return seoContentService.createSeoContent(payload);
  }

  function handleOnSubmitSuccess(updatedContent) {
    const message = editMode ? 'Content Updated' : 'Content Added';
    setFlash({ message, type: 'success' });

    setSeoContent(updatedContent);
    setEditMode(true);
  }

  function handleOnSubmitError(errorMessages) {
    setFlash({ message: errorMessages, type: 'error' });
  }

  async function loadAvailableParents() {
    try {
      const { seoContent: seoParents } = await seoContentService.getAvailableParents();
      let parents = seoParents;
      if (seoContent) {
        parents = seoParents.filter((parent) => parent.id !== seoContent.id);
      }

      setAvailableParents(parents);
    } catch (e) {
      /** Ignore */
    }
  }

  useEffect(() => {
    if (seoContentEntity) {
      try {
        const entity = JSON.parse(seoContentEntity);
        setSeoContent(entity);
        setEditMode(true);
      } catch (e) {
        /** Ignore */
      }
    }

    (async () => {
      await loadAvailableParents();
    })();

    setIsLoading(false);
  }, []);

  return (
    <div className="wrapper wrapper-content">
      {flash.message && <FlashMessage message={flash.message} type={flash.type} />}
      <div className="ibox float-e-margins">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <div className="ibox-title">
              <h2>{editMode && seoContent ? <>Edit Seo Content {seoContent.id}</> : <>Create Seo Content</>}</h2>
            </div>

            <div className="ibox-content">
              <SeoContentForm
                seoContent={seoContent}
                supportedLocales={supportedLocales}
                supportedPageTypes={supportedPageTypes}
                availableParents={availableParents}
                onSubmit={handleOnSubmit}
                onSubmitSuccess={handleOnSubmitSuccess}
                onSubmitError={handleOnSubmitError}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

SeoContentPage.propTypes = {
  seoContentEntity: PropTypes.string,
  supportedLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
  supportedPageTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

SeoContentPage.defaultProps = {
  seoContentEntity: undefined,
};

const $el = document.getElementById('seo-content');
if ($el) {
  const seoContentEntity = $el.getAttribute('data-seo-content');
  const supportedLocales = JSON.parse($el.getAttribute('data-supported-locales')) || [];
  const supportedPageTypes = JSON.parse($el.getAttribute('data-supported-page-types')) || [];

  ReactDOM.render(
    <SeoContentPage
      seoContentEntity={seoContentEntity}
      supportedLocales={supportedLocales}
      supportedPageTypes={supportedPageTypes}
    />,
    $el,
  );
}
