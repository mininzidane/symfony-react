/* eslint-disable react/prop-types */
import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useSavedSearchesCount from 'frontend/js/hooks/useSavedSearchesCount';
import AccordionItem from '../AccordionItem';
import Content from './Content';
import useStyles from './useStyles';

function SavedSearches({ onLinkClick }) {
  const classes = useStyles();
  const intl = useIntl();
  const { isAuthenticated } = useCustomerHelper();
  const savedSearchesCount = useSavedSearchesCount();

  if (!isAuthenticated) {
    return null;
  }

  const label =
    intl.formatMessage({ id: 'shared.label.savedSearches' }) +
    (savedSearchesCount > 0 ? ` (${savedSearchesCount})` : '');

  return (
    <AccordionItem label={label}>
      <div className={classes.content}>
        <Content onLinkClick={onLinkClick} />
      </div>
    </AccordionItem>
  );
}

export default SavedSearches;
