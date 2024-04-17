import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    fontSize: 14,
    lineHeight: '20px',
    paddingTop: 6,
    paddingBottom: 6,

    '&:first-child': {
      marginTop: 0,
    },

    '&:last-child, &.is-medium': {
      borderTop: 'none',
    },

    '&.is-medium': {
      paddingTop: 15,
      alignItems: 'center',

      [breakpoints.down('sm')]: {
        paddingTop: 5,
        paddingBottom: 5,
      },
    },
    '& + $root': {
      borderTop: '1px solid #E0DDC4',
    },

    '&.has-input': {
      alignItems: 'center',
      [breakpoints.down('sm')]: {
        flexWrap: 'wrap',
      },
      '& $input': {
        [breakpoints.down('sm')]: {
          order: 3,
          marginLeft: 0,
          marginTop: 4,
          width: '100%',
          maxWidth: '100%',
        },
      },
    },
  },
  value: {
    paddingLeft: 15,
    marginLeft: 'auto',
    whiteSpace: 'nowrap',

    '&.is-medium': {
      fontSize: 16,
      lineHeight: '22px',
    },

    '&.is-loading': {
      opacity: 0.5,
    },
  },
  toggle: {
    display: 'flex',
    marginRight: 15,
  },
  tickbox: {
    '& label': {
      fontSize: 14,
      lineHeight: '20px',
      color: '#333',
    },
  },
  tooltipWrap: {
    whiteSpace: 'nowrap',
  },
  tooltipTrigger: {
    position: 'relative',
    top: -1,
  },
  input: {
    marginLeft: 12,
    width: '100%',
    maxWidth: 170,
  },
}));
