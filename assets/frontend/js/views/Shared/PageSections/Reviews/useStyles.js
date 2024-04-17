import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: ({ isAuthenticated, bgColor }) => ({
    paddingTop: 1,
    borderTop: isAuthenticated && '2px solid #F1F1F8',
    backgroundColor: bgColor,
  }),
  container: {
    '@media (max-width: 1440px)': {
      maxWidth: 1170,
      paddingLeft: 15,
      paddingRight: 15,
    },
    [breakpoints.down('lg')]: {
      maxWidth: 1004,
    },
    [breakpoints.down('md')]: {
      maxWidth: 768,
    },
  },
  article: {
    padding: [[35, 0, 40]],
    color: '#000',

    [breakpoints.down('sm')]: {
      padding: [[24, 0, 30]],
    },
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '62px',
    paddingBottom: '36px',
    marginTop: 40,

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: '36px',
    },
  },
  footer: {
    display: 'grid',
    gridGap: '60px',
    gridTemplateColumns: '1fr 1fr 1fr',

    '&:before,&:after': {
      content: "''",
    },

    [breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',

      '&:before,&:after': {
        display: 'none',
      },
    },

    [breakpoints.down('xs')]: {
      display: 'grid',
      gridTemplateColumns: '1fr',
    },
  },
}));
