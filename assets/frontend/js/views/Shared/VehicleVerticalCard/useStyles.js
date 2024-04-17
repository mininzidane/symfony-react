import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    transition: 'box-shadow .15s ease',
    position: 'relative',
    backgroundColor: ({ isHighlighted }) => (isHighlighted ? '#FCFAEC' : '#FFFFFF'),

    '&::before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: '2px solid transparent',
      transition: 'border-color .15s ease',
      borderRadius: 4,
      zIndex: 20,
      pointerEvents: 'none',

      [breakpoints.down('sm')]: {
        borderRadius: 0,
      },
    },

    '&:hover': {
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)',

      '& $quickView': {
        opacity: 0.6,
      },

      '&::before': {
        borderColor: '#2158F5',
      },
    },
  },
  content: {
    padding: [[0, 14]],
    marginTop: 10,
  },
  quickView: {},
}));
