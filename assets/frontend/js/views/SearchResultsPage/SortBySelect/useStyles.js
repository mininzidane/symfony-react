import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  trigger: {
    ...mixins.font(14, 20, 400),
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    lineHeight: 'inherit',
    display: 'inline-flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    textDecoration: 'none !important',
    backgroundColor: '#FFFFFF',
    height: 30,
    border: '1px solid #BDBDBD',
    borderRadius: 4,
    paddingLeft: 11,
    paddingRight: 30,
    marginRight: '0 !important',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    transition: 'all .15s ease',

    '&:hover': {
      borderColor: '#2158F5',
      boxShadow: '0px 1px 2px rgba(0,0,0,.2)',
      zIndex: 20,

      '& $label': {
        color: '#2158F5',
      },

      '& $selectArrow': {
        color: '#2158F5',
        borderTopColor: '#2158F5',
      },
    },

    [breakpoints.down('xs')]: {
      paddingRight: 30,
    },
  },
  selectArrow: {
    transition: 'all .15s ease',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    top: 13,
    right: 9,
  },
  label: {
    transition: 'all .15s ease',
    color: '#333333',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));
