import { makeStyles } from '@material-ui/core/styles';
import Card1Desktop2xJpg from './img/desktop/card1@2x.jpg';
import Card2Desktop2xJpg from './img/desktop/card2@2x.jpg';
import Card3Desktop2xJpg from './img/desktop/card3@2x.jpg';
import Card4Desktop2xJpg from './img/desktop/card4@2x.jpg';
import Card1Mobile2xJpg from './img/mobile/card1@2x.jpg';
import Card2Mobile2xJpg from './img/mobile/card2@2x.jpg';
import Card3Mobile2xJpg from './img/mobile/card3@2x.jpg';
import Card4Mobile2xJpg from './img/mobile/card4@2x.jpg';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#fff',
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    maxWidth: '1920px',
    margin: '0 auto',
    [breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },
  card: {
    display: 'block',
    position: 'relative',
    width: '100%',
    backgroundSize: 'auto 529px',
    backgroundPosition: 'center',
    height: 529,
    '&:nth-child(1)': {
      backgroundColor: '#84643b',
      backgroundImage: `url(${Card1Desktop2xJpg})`,
      [breakpoints.down('md')]: {
        backgroundImage: `url(${Card1Mobile2xJpg})`,
      },
    },
    '&:nth-child(2)': {
      backgroundColor: '#2c5066',
      backgroundImage: `url(${Card2Desktop2xJpg})`,
      [breakpoints.down('md')]: {
        backgroundImage: `url(${Card2Mobile2xJpg})`,
      },
    },
    '&:nth-child(3)': {
      backgroundColor: '#0a3227',
      backgroundImage: `url(${Card3Desktop2xJpg})`,
      [breakpoints.down('md')]: {
        backgroundImage: `url(${Card3Mobile2xJpg})`,
      },
    },
    '&:nth-child(4)': {
      backgroundColor: '#4a4947',
      backgroundImage: `url(${Card4Desktop2xJpg})`,
      [breakpoints.down('md')]: {
        backgroundImage: `url(${Card4Mobile2xJpg})`,
      },
    },
    [breakpoints.down(1440)]: {
      height: 440,
      backgroundSize: 'auto 440px',
    },
    [breakpoints.down('md')]: {
      height: 224,
      backgroundSize: 'cover',
      width: '50%',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '25px 30px',
    },
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '32px',
    color: '#fff',
    display: 'block',
    minHeight: 64,
  },
  titles: {
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: '46px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    padding: '0',
    margin: '0',
    backgroundColor: 'transparent',
    bottom: '0',
    listStyle: 'none',
    [breakpoints.down(1440)]: {
      fontSize: '28px',
      lineHeight: '38px',
    },
    '& li': {
      padding: '40px 30px',
      width: '100%',
      [breakpoints.down('md')]: {
        padding: 20,
      },
    },
  },
}));
