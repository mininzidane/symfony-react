/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'frontend/js/components/Link';

function FileLink({ href, label }) {
  if (!href || !label) {
    return null;
  }

  return (
    <div>
      <Link href={href} isTargetBlank>
        {label}
      </Link>
    </div>
  );
}

export default FileLink;
