import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto fit-content(0)',
    gridGap: 15,
    fontSize: 14,
    lineHeight: '19px',

    '&:not(:first-child)': {
      marginTop: 12,
    },
  },
  button: {
    display: 'flex',
    textAlign: 'left',

    '& > span:first-child': {
      width: 16,
      height: 16,
      flexShrink: 0,
    },

    '& > span:last-child': {
      paddingLeft: 6,
    },

    '&:hover': {
      textDecoration: 'none',

      '& $label': {
        textDecoration: 'underline',
        color: '#2158F5 !important',

        [breakpoints.down('sm')]: {
          textDecoration: 'none',
        },
      },
    },
  },
  icon: {
    display: 'grid',
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    color: '#2158F5',

    '&.is-completed': {
      color: '#000000',
    },

    '&.is-current': {
      fontWeight: 700,

      '&.is-playing': {
        color: '#000 !important',
      },
    },
  },
  duration: {
    fontSize: 14,
    lineHeight: '19px',
  },
}));
