import { makeStyles } from '@material-ui/core/styles';
import StickerBgSvg from './img/sticker-bg.svg';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundSize: 'cover',
    maxWidth: 'none',
    padding: [[20, 0, 20]],
    [breakpoints.down('lg')]: {
      paddingBottom: 30,
    },
    [breakpoints.down('md')]: {
      padding: [[16, 0, 30]],
    },
    [breakpoints.down('sm')]: {
      padding: [[0, 0, 25]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gridGap: '20px',

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr 1fr',
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  title: {
    ...mixins.font(36, 50, 700),
    color: '#FFF',
    margin: 0,
    top: -5,
    position: 'relative',

    [breakpoints.down('sm')]: {
      ...mixins.font(18, 24, 700),
    },

    '& span': {
      ...mixins.font(30, 42, 400),
      display: 'inline-block',
      marginTop: 6,
      [breakpoints.down('sm')]: {
        ...mixins.font(18, 24),
        display: 'inline',
      },
    },
    '& br': {
      [breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
  subtitle: {
    margin: [[17, 0, 0]],
    ...mixins.font(18, 30, 350),
    color: '#FFF',

    [breakpoints.down('md')]: {
      ...mixins.font(16, 22, 350),
    },

    [breakpoints.down('sm')]: {
      margin: [[10, 0, 0]],
      ...mixins.font(14, 20, 350),
    },
  },
  sticker: {
    ...mixins.font(24, 33, 700),
    color: '#0A233B',
    height: 33,
    position: 'relative',
    textTransform: 'uppercase',
    backgroundColor: '#F2BA47',
    alignItems: 'center',
    display: 'inline-flex',
    marginTop: 14,
    marginLeft: 17,
    marginBottom: 22,
    paddingLeft: 5,
    paddingRight: 3,
    '&:before': {
      content: '""',
      position: 'absolute',
      height: '100%',
      width: 50,
      backgroundImage: `url(${StickerBgSvg})`,
      left: -47,
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      height: '100%',
      width: 22,
      backgroundImage: `url(${StickerBgSvg})`,
      right: -21,
      backgroundPosition: 'right',
    },
    [breakpoints.down('lg')]: {
      fontSize: 16,
    },
    [breakpoints.down('sm')]: {
      fontSize: 12,
      display: 'flex',
      margin: '0px -14px 15px -14px',
      padding: '0 14px',
      justifyContent: 'center',
    },
  },
}));
