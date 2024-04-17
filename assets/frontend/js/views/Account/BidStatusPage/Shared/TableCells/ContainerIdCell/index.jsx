/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'frontend/js/components/Link';

function ContainerIdCell({ containerId, shippingLine, shippingLineUrl }) {
  return (
    <>
      {containerId && <>{containerId}</>}
      {shippingLine && (
        <div>
          {shippingLineUrl ? (
            <Link href={shippingLineUrl} isTargetBlank isNoopener isNoreferrer>
              {shippingLine}
            </Link>
          ) : (
            shippingLine
          )}
        </div>
      )}
    </>
  );
}

export default ContainerIdCell;
