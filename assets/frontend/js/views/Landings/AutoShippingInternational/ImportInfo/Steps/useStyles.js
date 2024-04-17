import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    justifyContent: 'space-between',
    gridGap: 90,

    '@media (max-width: 1440px)': {
      gridGap: 122,
      maxWidth: 1140,
      margin: '0 auto',
    },

    [breakpoints.down('lg')]: {
      gridGap: 100,
      maxWidth: 974,
    },

    [breakpoints.down('md')]: {
      gridGap: 54,
    },

    '& > div': {
      maxWidth: 580,
      minWidth: 275,

      [breakpoints.down('lg')]: {
        minWidth: 250,
      },

      [breakpoints.down('md')]: {
        minWidth: 210,
      },

      [breakpoints.down('sm')]: {
        width: 'auto',

        '&:not(:last-child)': {
          marginBottom: 50,
        },
      },
    },

    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}));
