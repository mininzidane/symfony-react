import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: 712,
    paddingTop: 42,
    marginLeft: 'auto',
    marginRight: 'auto',

    [breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    display: 'grid',
    minHeight: 466,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    [breakpoints.down('sm')]: {
      minHeight: 529,
      height: 'auto',
      gridGap: '10px',
      borderRadius: '0',
      borderBottom: '1px solid #E0E0E0',
    },
  },
  header: {
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    [breakpoints.down('sm')]: {
      paddingTop: '8px',
      paddingBottom: '2px',
    },
  },
  body: {
    padding: '4px 14px 14px 14px',
    [breakpoints.down('sm')]: {
      padding: 14,
    },
  },
  actions: {
    marginTop: 'auto',
    backgroundColor: '#fff',
    borderRadius: '0 0 4px 4px',
    [breakpoints.down('sm')]: {
      borderRadius: '0',
    },
  },
}));
