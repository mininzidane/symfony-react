import React, { useState } from 'react';
import get from 'lodash/get';
import useEventListener from 'frontend/js/hooks/useEventListener';
import TagsSelect from 'frontend/js/components/Form/TagsSelect';
import BrokerService from 'frontend/js/api/BrokerService';
import { useQuery } from 'react-query';
import { useContainerIdsContext } from '../../Context/ContainerIds';
import DownloadDocuments from './DownloadDocuments';
import useStyles from './useStyles';

function Filters() {
  const classes = useStyles();
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const [{ setSelectedContainerIds }] = useContainerIdsContext();
  const { data } = useQuery('broker-containers-data', () => BrokerService.getContainers());
  const containers = get(data, 'containers', []);

  function handleInputSubmit(values) {
    setSelectedContainerIds(values);
  }

  useEventListener('resize', () => setWidth(document.documentElement.clientWidth));

  return (
    <div className={classes.root} style={{ width, marginLeft: `calc(50% - ${width * 0.5}px)` }}>
      <TagsSelect suggestions={containers} onSubmit={handleInputSubmit} />
      <DownloadDocuments />
    </div>
  );
}

export default Filters;
