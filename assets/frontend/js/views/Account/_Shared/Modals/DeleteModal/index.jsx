/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useMutation, useQueryClient } from 'react-query';
import SavedSearchesService from 'frontend/js/api/SavedSearches';
import useIntl from 'frontend/js/hooks/useIntl';
import PaginationContext from 'frontend/js/context/PaginationContext';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import ButtonText from 'frontend/js/components/ButtonText';
import Button from 'frontend/js/components/Button';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';

function DeleteModal({ isOpen, onClose, search, query }) {
  const { currentPage: page, total, setTotal } = useContext(PaginationContext);
  const intl = useIntl();
  const queryString = query || `page=${page}`;
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation((payload) => SavedSearchesService.deleteSavedSearch(payload), {
    onSuccess: () => {
      const cacheSavedSearches = queryClient.getQueryData(['saved-searches-data', queryString]);

      queryClient.setQueryData(['saved-searches-data', queryString], {
        ...cacheSavedSearches,
        savedSearches: cacheSavedSearches.savedSearches.filter((item) => item.id !== search.id),
        total: cacheSavedSearches.total - 1,
      });
    },
  });

  function onSubmit() {
    mutateAsync(search.id).then(() => {
      const googleAnalyticsService = new GoogleAnalyticsService();
      googleAnalyticsService.sendEvent('delete', 'saved_search', 'delete');
      onClose();
      setTotal(total - 1);
    });
  }

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose}>
      <ModalWindowHeader
        title={intl.formatMessage({ id: 'savedSearches.results.deleteDialog.title' })}
        onClose={onClose}
      />
      <ModalWindowBody hasFooter>
        <FormattedMessage
          id="savedSearches.results.deleteDialog.text"
          values={{
            b: (chunks) => <b>{chunks}</b>,
            name: search.title,
          }}
        />
      </ModalWindowBody>
      <ModalWindowFooter>
        <>
          <ButtonText label={intl.formatMessage({ id: 'shared.cta.cancel' })} onClick={onClose} fontWeight={700} />
          <Button
            onClick={onSubmit}
            label={intl.formatMessage({ id: 'savedSearches.results.deleteDialog.confirm' })}
            isLoading={isLoading}
            isInline
          />
        </>
      </ModalWindowFooter>
    </ModalWindow>
  );
}

export default DeleteModal;
