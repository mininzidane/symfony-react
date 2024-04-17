import React, { Fragment } from 'react';
import SocialLinks from '../SocialLinks';
import LinkGroup from './LinkGroup';
import data from '../data';
import useStyles from './useStyles';

function DesktopLinks() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {Object.keys(data).map((key) => (
        <Fragment key={key}>
          {key === 'finder' ? (
            <>
              <LinkGroup
                title={data[key].title}
                isNowrap
                links={data[key].links.slice(0, Math.floor(data[key].links.length / 2))}
              />
              <LinkGroup
                links={data[key].links.slice(Math.floor(data[key].links.length / 2), data[key].links.length)}
              />
            </>
          ) : (
            <div>
              <LinkGroup title={data[key].title} links={data[key].links} />
              {key === 'companyInfo' && <SocialLinks />}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

DesktopLinks.propTypes = {};

export default DesktopLinks;
