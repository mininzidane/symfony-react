import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    position: 'relative',
    zIndex: 4000,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.16)',

    '& > div:not(:first-child)': {
      borderTop: '1px solid #d6d6d6',
    },
  },
  notification: {
    padding: [[15, 0, 17]],
    position: 'relative',
    backgroundColor: '#FFF1D2',
    '&.is-warning': {},
    '&.is-error': {
      backgroundColor: '#6F130B',
      color: '#fff',
      '& a': {
        color: '#fff',
        textDecoration: 'underline',
      },
      '& $content p': {
        color: '#fff',
      },
    },

    [breakpoints.down('sm')]: {
      padding: [[15, 0, 18]],
    },
  },
  title: {
    ...mixins.font(18, 26, 700),
    paddingRight: 40,
    marginBottom: 12,

    [breakpoints.down('sm')]: {
      paddingRight: 34,
    },
  },
  content: {
    ...mixins.font(16, 21, 400),

    '& p': {
      fontSize: 'inherit',
      lineHeight: 1.25,
      marginBottom: 0,

      '&:empty': {
        minHeight: '1em',
      },
    },

    '& ul, ol': {
      paddingInlineStart: 40,
    },

    '& ul': {
      listStyle: 'initial',
    },

    '& ol': {
      listStyle: 'decimal',
    },
  },
  section: {
    marginTop: 15,
  },
  contactsSection: {
    [breakpoints.down('xs')]: {
      display: 'block',
      marginTop: 5,
      width: '100%',
    },
  },
  contacts: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  closeButton: {
    ...mixins.extraHitbox(),
    position: 'absolute !important',
    top: '25px',
    right: '30px',
    cursor: 'pointer',
    userSelect: 'none',

    '&:hover': {
      opacity: 0.6,
    },

    [breakpoints.down('sm')]: {
      right: 20,
      top: 28,
    },
  },
}));
