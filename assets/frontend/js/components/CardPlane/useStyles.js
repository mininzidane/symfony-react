import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    borderRadius: 4,
    background: '#FFFFFF',

    '&.is-elevation-0': {
      boxShadow: 'none',
      border: '1px solid #E0E0E0',
    },

    '&.is-elevation-1': {
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    },

    '&.is-elevation-2': {
      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    },

    '&.is-elevation-3': {
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
    },

    '&.is-highlighted': {
      backgroundColor: '#FCFAEC',
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 42,
    padding: [[8, 14]],
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: 700,
    color: '#333333',
    backgroundColor: '#F2F2F2',
    borderRadius: '3px 3px 0 0',
  },
  content: {
    padding: 14,
  },
}));
