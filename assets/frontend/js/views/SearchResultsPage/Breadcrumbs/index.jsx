import React from 'react';
import { useSearchData } from 'frontend/js/views/SearchResultsPage/_Context/SearchDataContext';
import StringService from 'frontend/js/lib/utils/StringService';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function Breadcrumbs() {
  const classes = useStyles();
  const [{ seo }] = useSearchData();

  if (!seo.breadcrumbs.length) {
    return null;
  }

  return (
    <nav className={classes.root}>
      <ol className={classes.list}>
        {seo.breadcrumbs.map((crumb, index) => (
          <li
            className={classes.listItem}
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
            key={crumb.title}
          >
            {crumb.link ? (
              <Link href={crumb.link} itemProp="item">
                <span itemProp="name">{StringService.htmlDecode(crumb.title)}</span>
              </Link>
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

export default Breadcrumbs;
