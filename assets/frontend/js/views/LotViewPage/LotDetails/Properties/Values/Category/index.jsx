/* eslint-disable react/prop-types */
import React from 'react';

function Category({ lot }) {
  return (
    <>
      CAT {lot.title.type} {lot.title.description && <>{lot.title.description}</>}
    </>
  );
}

export default Category;
