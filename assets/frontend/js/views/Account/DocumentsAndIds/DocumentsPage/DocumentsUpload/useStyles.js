import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 21,
    [breakpoints.down('sm')]: {
      paddingTop: 21,
    },
  },
  documentsList: {
    marginTop: 15,
    [breakpoints.down('sm')]: {
      marginTop: 14,
    },
  },
  filesUpload: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,
  },
  loaderContainer: {
    border: '1px dashed #2158F5',
  },
}));
