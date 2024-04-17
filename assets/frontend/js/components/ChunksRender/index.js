// https://itnext.io/improving-slow-mounts-in-react-apps-cff5117696dc
import React from 'react';

const ChunksRender = ({ chunkSize, children }) => {
  const [renderedItemsCount, setRenderedItemsCount] = React.useState(chunkSize);

  const childrenArray = React.useMemo(() => React.Children.toArray(children), [children]);

  React.useEffect(() => {
    setRenderedItemsCount(chunkSize);
  }, [children]);

  React.useEffect(() => {
    if (renderedItemsCount < childrenArray.length) {
      window.requestIdleCallback(
        () => {
          setRenderedItemsCount(Math.min(renderedItemsCount + chunkSize, childrenArray.length));
        },
        { timeout: 50 },
      );
    }
  }, [renderedItemsCount, childrenArray.length, chunkSize]);

  return childrenArray.slice(0, renderedItemsCount);
};

export default ChunksRender;
