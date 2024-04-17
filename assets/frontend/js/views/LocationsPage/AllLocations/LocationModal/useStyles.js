import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  row: {
    display: 'flex',
    padding: [[10, 0]],

    '&:not(:last-child)': {
      borderBottom: '1px solid #E0E0E0',
    },

    '& > *:last-child': {
      marginLeft: 'auto',
    },
  },
  modalBody: {
    borderRadius: '0',
    minHeight: 0,
  },
  modalFooter: {
    backgroundColor: '#FCFAEC',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 1.4,
    fontWeight: 700,
    flexDirection: 'column',
  },
  btnGroup: {
    display: 'flex',
    gap: 25,
  },
  footerTitle: {
    marginBottom: 10,
  },
  cta: {
    paddingLeft: '10px !important',
    paddingRight: '10px !important',
    fontSize: '14px !important',
    textTransform: 'uppercase !important',

    '& svg': {
      position: 'relative',
      top: 2,
      right: 6,
    },

    '& path': {
      fill: '#2158F5',
      transition: 'all .2s ease',
    },

    '& a': {
      color: '#2158F5 !important',
      textDecoration: 'none !important',
      fontWeight: '400 !important',
      fontSize: 14,
    },

    '& span': {
      fontWeight: '700 !important',
    },

    '&:hover': {
      '& a': {
        color: '#FFF !important',
      },

      '& path': {
        fill: '#FFF',
      },
    },
  },
}));
