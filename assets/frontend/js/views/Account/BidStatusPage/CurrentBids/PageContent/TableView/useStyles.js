import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  table: ({ isB2BBroker }) => {
    const baseCount = isB2BBroker ? 1 : 0;

    return {
      '& td, & th': {
        [`&:nth-child(${baseCount + 1})`]: {
          width: 125,
        },
      },

      '@media(max-width: 1920px)': {
        '& td, & th': {
          [`&:nth-child(${baseCount + 2})`]: {
            width: 250,
          },
        },
      },

      '@media(max-width: 1700px)': {
        '& td, & th': {
          [`&:nth-child(${baseCount + 4})`]: {
            display: 'none',
          },
        },
      },

      '@media(max-width: 1600px)': {
        '& td, & th': {
          [`&:nth-child(${baseCount + 5})`]: {
            display: 'none',
          },
        },
      },

      '@media(max-width: 1400px)': {
        '& td, & th': {
          [`&:nth-child(${baseCount + 6})`]: {
            display: 'none',
          },
        },
      },

      [breakpoints.down('md')]: {
        '& td, & th': {
          [`&:nth-child(${baseCount + 1})`]: {
            width: 200,
          },

          [`&:nth-child(${baseCount + 5})`]: {
            display: 'none',
          },
        },
      },
    };
  },
}));
