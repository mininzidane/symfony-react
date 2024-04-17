import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Submenu from '../Submenu';

function MoreLinks({ links }) {
  const formattedLinks = useMemo(
    () =>
      links.reduce((acc, cur) => {
        if (!cur || (typeof cur.isVisible === 'function' && !cur.isVisible())) {
          return acc;
        }

        acc.push({ isCategory: true, href: cur.link || null, label: cur.title, id: cur.id });
        if (cur.links) {
          // eslint-disable-next-line no-param-reassign
          acc = acc.concat(cur.links);
        }
        return acc;
      }, []),
    [links],
  );

  return <Submenu label={<FormattedMessage id="shared.label.more" />} menuItems={formattedLinks} />;
}

MoreLinks.propTypes = {
  links: PropTypes.array,
};

MoreLinks.defaultProps = {
  links: [],
};

export default MoreLinks;
