import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {},
  header: {
    paddingBottom: 18,
  },
  title: {
    fontSize: '16px',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '1px',
    marginBottom: '2px',
    lineHeight: '20px',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gridGap: '26px',
    [breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    },
    [breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(166px, 1fr))',
      gridGap: '15px',
    },
    [breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr 1fr',
      gridGap: '15px',
      '& div:last-child': {
        gridColumnStart: '1',
        gridColumnEnd: '-1',
      },
    },
  },
  actions: {
    background: '#E6ECFD',
    borderRadius: '6px',
    padding: '16px 14px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 290px))',
    justifyContent: 'center',
    gridGap: '18px',
    alignItems: 'center',
    marginTop: 28,
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  cta: {
    minWidth: 290,
    [breakpoints.down('xs')]: {
      minWidth: 'auto',
    },
  },
  backBtn: {
    [breakpoints.down('lg')]: {
      order: 3,
    },
  },
  mobileStickyBtn: {
    position: 'fixed',
    bottom: 14,
    left: 44,
    right: 44,
    maxWidth: 1110,
    padding: 14,
    zIndex: 4000,
    background: '#E6ECFD',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    [breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      left: 14,
      right: 14,
    },
  },
}));
