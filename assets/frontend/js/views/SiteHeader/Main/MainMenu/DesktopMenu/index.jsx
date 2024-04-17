import React, { Fragment, useRef, useEffect, useState, useMemo, useCallback } from 'react';
import CountryService from 'frontend/js/api/CountryService';
import useEventListener from 'frontend/js/hooks/useEventListener';
import HelpForm from '../../Shared/HelpForm';
import Phone from '../../Shared/Phone';
import SocialLinks from '../../Shared/SocialLinks';
import CountrySelect from '../Shared/CountrySelect';
import LanguageSelect from '../Shared/LanguageSelect';
import linksData from '../linksData';
import Submenu from './Submenu';
import LazySubmenu from './LazySubmenu';
import useStyles from './useStyles';
import LinkItem from './LinkItem';
import MoreLinks from './MoreLinks';

function DesktopMenu() {
  const classes = useStyles();
  const isIntl = !CountryService.isDomestic();
  const gapRef = useRef();
  const [moreLinksCount, setMoreLinksCount] = useState(0);
  const [links, moreLinks] = useMemo(() => {
    const delimiterIndex = linksData.length - moreLinksCount;
    return [linksData.slice(0, delimiterIndex), linksData.slice(delimiterIndex)];
  }, [moreLinksCount, linksData]);

  const update = useCallback(() => {
    const MIN_GAP = 30;
    const LINK_PADDING = 27;
    const currentGap = gapRef.current.offsetWidth;
    if (currentGap < MIN_GAP) {
      if (moreLinksCount < linksData.length) {
        setMoreLinksCount((count) => count + 1);
      }
    }

    if (moreLinksCount !== 0) {
      const CHAR_WIDTH = 10;
      const nextLinkIndex = linksData.length - moreLinksCount;
      const nextLinkWidth = linksData[nextLinkIndex].title.length * CHAR_WIDTH;
      if (currentGap > nextLinkWidth + LINK_PADDING + MIN_GAP) {
        setMoreLinksCount((count) => count - 1);
      }
    }
  }, [moreLinksCount, setMoreLinksCount, linksData]);

  useEventListener('resize', update);

  useEffect(() => {
    update();
  }, [moreLinksCount]);

  return (
    <>
      <ul className={classes.navigation}>
        {links.map((group) => (
          <Fragment key={group.title}>
            {group.lazyLoad ? (
              <LazySubmenu label={group.title} menuItems={group.links} options={group.lazyLoad} />
            ) : (
              <>
                {group.links && <Submenu label={group.title} menuItems={group.links} />}
                {group.link && (
                  <LinkItem label={group.title} link={group.link} isVisible={group.isVisible} type={group.type} />
                )}
              </>
            )}
          </Fragment>
        ))}
        {moreLinks && moreLinks.length > 0 && <MoreLinks links={moreLinks} />}
      </ul>
      <div ref={gapRef} className={classes.gap} />
      <ul className={classes.settings}>
        <CountrySelect SubmenuComponent={Submenu} />
        <LanguageSelect SubmenuComponent={Submenu} />
        <li className={classes.contacts}>
          {isIntl ? <Phone /> : <HelpForm />}
          {isIntl && <SocialLinks />}
        </li>
      </ul>
    </>
  );
}

export default DesktopMenu;
