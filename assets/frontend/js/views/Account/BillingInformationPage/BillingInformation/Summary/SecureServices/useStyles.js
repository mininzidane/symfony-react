import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: 15,
    marginTop: 17,
    placeItems: 'center',
    gridAutoFlow: 'column',
    justifyContent: 'center',
  },
}));
