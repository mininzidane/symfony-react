/* eslint-disable react/prop-types */
import React from 'react';

function Pins({ scale }) {
  const r = 4.5 / scale;
  const strokeWidth = 3 / scale;

  return (
    <>
      <circle cx="288" cy="267" r={r} strokeWidth={strokeWidth} /> {/* USA */}
      <circle cx="1034" cy="200" r={r} strokeWidth={strokeWidth} /> {/* Ukraine */}
      <circle cx="1325" cy="115" r={r} strokeWidth={strokeWidth} /> {/* Russia */}
      <circle cx="1000" cy="223" r={r} strokeWidth={strokeWidth} /> {/* Romania */}
      <circle cx="905" cy="475" r={r} strokeWidth={strokeWidth} /> {/* Nigeria */}
      <circle cx="333" cy="437" r={r} strokeWidth={strokeWidth} /> {/* Honduras */}
      <circle cx="311" cy="433" r={r} strokeWidth={strokeWidth} /> {/* Guatemala */}
      <circle cx="1107" cy="250" r={r} strokeWidth={strokeWidth} /> {/* Georgia */}
      <circle cx="320" cy="446" r={r} strokeWidth={strokeWidth} /> {/* El Salvador */}
      <circle cx="1002" cy="245" r={r} strokeWidth={strokeWidth} /> {/* Bulgaria */}
      <circle cx="1011" cy="172" r={r} strokeWidth={strokeWidth} /> {/* Belarus */}
      <circle cx="1592" cy="287" r={r} strokeWidth={strokeWidth} /> {/* South Korea */}
      <circle cx="975" cy="256" r={r} strokeWidth={strokeWidth} /> {/* Albania */}
    </>
  );
}

export default Pins;
