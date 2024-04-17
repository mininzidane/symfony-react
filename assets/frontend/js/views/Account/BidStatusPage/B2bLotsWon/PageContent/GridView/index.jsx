/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import ChunksRender from 'frontend/js/components/ChunksRender';
import useStyles from './useStyles';
import Card from './Card';

function GridView({ invoices }) {
  const classes = useStyles();
  const chunkSize = useRef(Infinity);

  useEffect(() => {
    chunkSize.current = 8;
  }, []);

  return (
    <div className={classes.root}>
      <ChunksRender chunkSize={chunkSize.current}>
        {invoices.map((invoice) => (
          <Card key={invoice.token} invoice={invoice} />
        ))}
      </ChunksRender>
    </div>
  );
}

export default GridView;
