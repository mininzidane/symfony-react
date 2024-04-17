import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& > div': {
      minWidth: 200,
      '@media (max-width: 550px)': {
        width: '100%',
        '&:first-child': {
          marginBottom: 30,
        },
      },
    },
  },
  list: {
    margin: 0,
    padding: 0,
    '& li': {
      listStyleType: 'none',
      paddingLeft: 10,
      marginBottom: 15,
      position: 'relative',
      '&:last-child': {
        marginBottom: 0,
      },
      '&:before': {
        content: "''",
        position: 'absolute',
        top: '9px',
        left: '-3px',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: '#2158F5',
      },
    },
  },
}));
