import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  '@global': {
    'html > body.sell-your-car-page > div > style + iframe[title]:last-of-type': {
      [breakpoints.down('sm')]: {
        bottom: '0 !important',
        transition: 'bottom .25s ease !important',
      },
    },
    '#header-auth-buttons': {
      display: 'none',
    },
  },
  root: ({ v2 }) => ({
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: '4px',
    minHeight: v2 ? '368px' : '420px',
    display: 'grid',
    gridGap: '20px',
    gridTemplateRows: v2 ? 'minmax(max-content, 58px) max-content auto' : 'auto',
    [breakpoints.down('md')]: {
      minHeight: '395px',
      padding: '14px',
      gridGap: '14px',
    },
  }),
  header: {
    color: '#333',
    paddingTop: 4,
  },
  title: {
    fontWeight: '300',
    fontSize: '28px',
    lineHeight: '39px',
    textAlign: 'center',
    [breakpoints.down('md')]: {
      fontSize: '17px',
      lineHeight: '30px',
    },
  },
  stepLabel: {
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'center',
    [breakpoints.down('md')]: {
      paddingBottom: '2px',
    },
  },
  footer: {
    marginTop: 'auto',
  },
  actions: {
    display: 'grid',
    gridGap: '20px',
    gridAutoColumns: '1fr',
    gridAutoFlow: 'column',
    [breakpoints.down('md')]: {
      gridGap: '14px',
    },
  },
  footerDesc: {
    fontSize: '14px',
    lineHeight: '19px',
    textAlign: 'center',
    color: '#333333',
    marginTop: 10,
    paddingBottom: 19,
    [breakpoints.down('md')]: {
      marginTop: '6px',
      paddingBottom: '7px',
    },
    [breakpoints.down('sm')]: {
      maxWidth: '300px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
}));
