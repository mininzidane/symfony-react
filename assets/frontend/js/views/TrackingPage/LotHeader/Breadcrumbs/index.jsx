/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import StringService from 'frontend/js/lib/utils/StringService';
import useStyles from './useStyles';

function Breadcrumbs({ breadcrumbs, isSelect }) {
  const classes = useStyles({ isSelect });

  return (
    <nav className={classes.nav}>
      <ol className={classes.list}>
        {breadcrumbs.map((crumb, index) => (
          <li
            className={classes.listItem}
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
            key={crumb.title}
          >
            {crumb.link ? (
              <a href={crumb.link} itemProp="item">
                <span itemProp="name">{StringService.htmlDecode(crumb.title)}</span>
              </a>
            ) : (
              <span itemProp="name">{StringService.htmlDecode(crumb.title)}</span>
            )}

            <meta itemProp="position" content={index + 1} />
          </li>
        ))}
      </ol>
    </nav>
  );
}

Breadcrumbs.propTypes = {};

export default Breadcrumbs;
