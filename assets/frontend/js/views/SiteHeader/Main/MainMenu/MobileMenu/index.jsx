import React, { useState, useRef, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import Fade from 'frontend/js/components/Fade';
import CountrySelect from '../Shared/CountrySelect';
import LanguageSelect from '../Shared/LanguageSelect';
import linksData from '../linksData';
import useStyles from './useStyles';
import Submenu from './Submenu';
import LinkItem from './LinkItem';
import LazySubmenu from './LazySubmenu';

function MobileMenu({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const classes = useStyles();
  const extraMenuRef = useRef();
  const [activeSubmenu, setActiveSubmenu] = useState('');
  const [isExtraMenuOpen, showExtraMenu] = useState(false);

  function handleTriggerClick(title) {
    if (activeSubmenu === title) {
      setActiveSubmenu('');
    } else {
      setActiveSubmenu(title);
    }
  }

  function closeAll() {
    setActiveSubmenu('');
    setIsMobileMenuOpen(false);
  }

  return (
    <div className={classes.root}>
      <div className={classes.menuContainer}>
        <Collapse in={isMobileMenuOpen} timeout="auto" mountOnEnter>
          <div className={classes.wrap}>
            <Fade isOpen={!isExtraMenuOpen} duration={250} isAlwaysMounted>
              <div className={classnames(classes.menu, { 'is-hidden': isExtraMenuOpen })}>
                {linksData.map((group) => (
                  <Fragment key={group.title}>
                    {group.lazyLoad ? (
                      <LazySubmenu
                        isMobileMenuOpen={isMobileMenuOpen}
                        showExtraMenu={showExtraMenu}
                        isOpen={activeSubmenu === group.title}
                        onTriggerClick={() => handleTriggerClick(group.title)}
                        label={group.title}
                        menuItems={group.links}
                        options={group.lazyLoad}
                        extraMenuRef={extraMenuRef}
                        closeAll={closeAll}
                      />
                    ) : (
                      <>
                        {group.links && (
                          <Submenu
                            isOpen={activeSubmenu === group.title}
                            onTriggerClick={() => handleTriggerClick(group.title)}
                            label={group.title}
                            menuItems={group.links}
                            closeAll={closeAll}
                          />
                        )}
                        {group.link && (
                          <LinkItem
                            key={group.title}
                            label={group.title}
                            link={group.link}
                            isVisible={group.isVisible}
                            type={group.type}
                          />
                        )}
                      </>
                    )}
                  </Fragment>
                ))}

                <CountrySelect
                  isOpen={activeSubmenu === 'countrySelect'}
                  onTriggerClick={() => handleTriggerClick('countrySelect')}
                  SubmenuComponent={Submenu}
                />

                <LanguageSelect
                  isOpen={activeSubmenu === 'languageSelect'}
                  onTriggerClick={() => handleTriggerClick('languageSelect')}
                  SubmenuComponent={Submenu}
                />
              </div>
            </Fade>
            <Fade isOpen={isExtraMenuOpen} duration={250} isAlwaysMounted>
              <div ref={extraMenuRef} className={classnames(classes.extraMenu, { 'is-hidden': !isExtraMenuOpen })} />
            </Fade>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

MobileMenu.propTypes = {
  isMobileMenuOpen: PropTypes.bool.isRequired,
  setIsMobileMenuOpen: PropTypes.func,
};

MobileMenu.defaultProps = {
  setIsMobileMenuOpen: () => {},
};

export default MobileMenu;
