import t from 'frontend/js/api/TranslatorService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import { useState, useCallback } from 'react';

const OPTIONS = [
  {
    label: t('shared.label.cardView'),
    value: 'full',
  },
  {
    label: t('shared.label.listView'),
    value: 'compact',
  },
];

function useView() {
  const defaultView = OPTIONS[1].value;
  const [view, setView] = useState(LocalStorageService.get('ABM:searchViewMode') ?? defaultView);
  const isGridView = view === OPTIONS[0].value;

  const handleChange = useCallback((value) => {
    setView(value);

    LocalStorageService.set('ABM:searchViewMode', value);
  }, []);

  return [OPTIONS, view, handleChange, isGridView];
}

export default useView;
