import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#fff',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    flex: 1,
  },
  container: {
    padding: 14,
  },
  thumb: {
    borderRadius: '4px 4px 0px 0px',
    [breakpoints.down('md')]: {
      width: 350,
    },
  },
  title: {
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '26px',
    color: '#2158F5',
    margin: [[10, 0, 4]],
  },
  row: {
    display: 'flex',
    padding: [[5, 0]],

    '& + &': {
      borderTop: '1px solid #E3E3E3',
    },

    '& > *:last-child': {
      marginLeft: 'auto',
      textAlign: 'right',
    },
  },
  button: {
    marginTop: 10,
  },
}));
