/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import { useMutation, useQueryClient } from 'react-query';
import PaginationContext from 'frontend/js/context/PaginationContext';
import SavedSearchesService from 'frontend/js/api/SavedSearches';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import validationSchema from './ValidationSchema';

function EditTitleModal({ isOpen, onClose, search, query }) {
  const intl = useIntl();
  const { currentPage: page } = useContext(PaginationContext);
  const queryString = query || `page=${page}`;
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation((payload) => SavedSearchesService.updateSavedSearch(payload), {
    onSuccess: (data) => {
      if (!data) {
        return;
      }

      const cacheSavedSearches = queryClient.getQueryData(['saved-searches-data', queryString]);

      const updatedSearch = data.saved_search;
      const copy = cacheSavedSearches.savedSearches.map((savedSearch) =>
        savedSearch.id === updatedSearch.id ? { ...savedSearch, ...updatedSearch } : savedSearch,
      );

      queryClient.setQueryData(['saved-searches-data', queryString], {
        ...cacheSavedSearches,
        savedSearches: copy,
      });
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: { title: search.title || '' },
    onSubmit: (values) => {
      const { title } = values;

      if (search.title === title) {
        onClose();
        return;
      }

      mutateAsync({ id: search.id, title })
        .then(() => {
          const googleAnalyticsService = new GoogleAnalyticsService();
          googleAnalyticsService.sendEvent('title', 'saved_search', `field_entry ${title}`);
        })
        .finally(() => {
          onClose();
        });
    },
  });

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose}>
      <ModalWindowHeader
        title={intl.formatMessage({ id: 'savedSearches.results.changeNameDialog.title' })}
        onClose={onClose}
      />

      <ModalWindowBody hasFooter>
        <form onSubmit={formik.handleSubmit}>
          <InputPlane
            id="title"
            name="title"
            label={intl.formatMessage({ id: 'shared.label.name' })}
            value={formik.values.title}
            touched={formik.touched.title}
            error={formik.errors.title}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            onError={formik.setFieldError}
            isLabelOnTop
          />
        </form>
      </ModalWindowBody>

      <ModalWindowFooter>
        <Button
          label={intl.formatMessage({ id: 'shared.cta.save' })}
          onClick={formik.handleSubmit}
          isLoading={isLoading}
        />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

export default EditTitleModal;
