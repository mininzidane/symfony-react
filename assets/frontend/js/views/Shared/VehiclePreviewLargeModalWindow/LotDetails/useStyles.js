import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    alignSelf: 'self-start',
    marginTop: 20,
  },
  content: {
    paddingTop: 6,
    paddingBottom: 15,
  },
  vinDetailsRow: {
    borderTop: '1px solid #E3E3E3',
    paddingTop: 8,
  },
  button: {
    margin: [[15, 0, 10]],
  },
  clearVin: {
    margin: [[6, 14, 0]],
  },
}));
