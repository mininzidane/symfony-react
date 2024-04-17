import React from 'react';
import CompanyService from 'frontend/js/api/CompanyService';
import Link from 'frontend/js/components/Link';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ToTopButton from '../../ToTopButton';
import InstagramSvg from '../img/instagram.svg';
import FacebookSvg from '../img/facebook.svg';
import TwitterSvg from '../img/twitter.svg';
import YoutubeSvg from '../img/youtube.svg';
import BlogSvg from '../img/blog.svg';
import useStyles from './useStyles';

function SocialLinks() {
  const classes = useStyles();
  const { socials } = CompanyService;
  const { isBelowSm } = useBreakpoint();

  return (
    <div className={classes.root}>
      <Link href={socials.facebook} isTargetBlank isNoopener isNoreferrer>
        <img src={FacebookSvg} alt="Facebook" width={24} height={24} />
      </Link>
      <Link href={socials.instagram} isTargetBlank isNoopener isNoreferrer>
        <img src={InstagramSvg} alt="Instagram" width={24} height={24} />
      </Link>
      <Link href={socials.twitter} isTargetBlank isNoopener isNoreferrer>
        <img src={TwitterSvg} alt="Twitter" width={24} height={24} />
      </Link>
      <Link href={socials.youtube} isTargetBlank isNoopener isNoreferrer>
        <img src={YoutubeSvg} alt="Youtube" width={24} height={24} />
      </Link>
      <Link href={socials.blog} isTargetBlank isNoopener isNoreferrer>
        <img src={BlogSvg} alt="Blog" width={24} height={24} />
      </Link>

      {isBelowSm && <ToTopButton />}
    </div>
  );
}

export default SocialLinks;
