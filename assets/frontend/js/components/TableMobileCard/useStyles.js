import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    background: 'white',
    borderRadius: 4,
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25), 0 0 0 2px transparent',
    transition: 'all .2s ease',

    [breakpoints.down('sm')]: {
      '&.is-hoverable:hover': {
        backgroundColor: '#F1F1F1',
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25), 0 0 0 2px #2158F5',
      },
    },

    '&:not(:first-child)': {
      marginTop: 6,
    },
  },
  listRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: [[5, 14]],
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,

    '&:not(:first-child)': {
      borderTop: '1px solid #E3E3E3',
    },
  },
  listLabel: {
    minWidth: '35%',
    paddingRight: 15,
    color: '#333',
    wordBreak: 'normal',
  },
  listValue: {
    textAlign: 'right',
    fontWeight: 700,
    wordBreak: 'break-word',

    '&:only-child': {
      width: '100%',
    },
  },
  dash: {
    color: '#777',
  },
}));
