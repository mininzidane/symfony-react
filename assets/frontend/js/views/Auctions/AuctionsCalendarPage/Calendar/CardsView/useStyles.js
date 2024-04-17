import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  card: {
    display: 'grid',
    gridTemplateRows: 'max-content 1fr',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gridGap: '15px',
    marginTop: '20px',
    [breakpoints.down('sm')]: {
      marginTop: 16,
    },
    [breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  header: {
    backgroundColor: '#E0E0E0',
    borderRadius: '3px 3px 0px 0px',
    padding: '0 14px',
  },
  content: {
    backgroundColor: '#FFF',
    padding: '14px',
    borderRadius: '0px 0px 3px 3px',
  },
  active: {
    backgroundColor: '#D5DEFA',
    boxShadow: '0px -1px 0px 0px #2158f5 inset',
  },
}));
