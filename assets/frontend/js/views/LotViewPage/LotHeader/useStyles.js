import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    transition: '0.25s background-color ease',

    '&.is-watched': {
      backgroundColor: '#FFF1D2',

      '& .navigation-control-button:hover': {
        backgroundColor: '#FFF',
      },
    },

    '&.is-select': {
      background: 'linear-gradient(45deg, #3B8AFF, #0F62DE)',
    },

    '&.is-abm-inventory': {
      background: '#217E00',
    },

    '&.is-npa-inventory': {
      background: '#606060',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridGap: 20,

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
      gridGap: 5,
      paddingBottom: 12,
    },

    [breakpoints.down('sm')]: {
      gridGap: 2,
    },
  },
  titleSection: {
    minWidth: 0,
  },
}));
