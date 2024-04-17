import { createContainer } from 'react-tracked';
import useSort from './useSort';
import useView from './useView';

const useValues = () => {
  const [viewOptions, view, setView, isGridView] = useView();
  const [sortOptions, sort, setSort] = useSort();

  return [
    {
      view,
      setView,
      sort,
      setSort,
      viewOptions,
      sortOptions,
      isGridView,
    },
  ];
};

export const { Provider: DisplaySettingsProvider, useTracked: useDisplaySettingsContext } = createContainer(useValues);
