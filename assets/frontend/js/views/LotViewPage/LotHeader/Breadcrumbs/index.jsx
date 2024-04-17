/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import classnames from 'classnames';
import StringService from 'frontend/js/lib/utils/StringService';
import t from 'frontend/js/api/TranslatorService';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';

function Breadcrumbs({ breadcrumbs, isSelect, isAbmInventory, isNpaInventory }) {
  const classes = useStyles({ isSelect, isAbmInventory, isNpaInventory });
  const navRef = useRef();
  const $nav = navRef.current || {};

  const translationSets = {
    home: t('shared.label.home'),
  };

  return (
    <div className={classnames(classes.root, $nav.scrollWidth > $nav.clientWidth && 'is-overflow')}>
      <nav className={classes.nav} ref={navRef}>
        <ol className={classes.list}>
          <li className={classes.listItem} itemScope itemProp="itemListElement" itemType="http://schema.org/ListItem">
            <a href={RouterService.getRoute('home')} itemProp="item">
              <span itemProp="name">{translationSets.home}</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>

          {(breadcrumbs || []).map((crumb, index) => (
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
    </div>
  );
}

Breadcrumbs.propTypes = {};

export default Breadcrumbs;
