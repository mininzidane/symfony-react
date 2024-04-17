import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: ({ minHeight }) => ({
    position: 'relative',
    minHeight: minHeight || 400,
  }),
}));
