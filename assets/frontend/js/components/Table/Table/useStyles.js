import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: ({ hasShadow }) => ({
    boxShadow: hasShadow && '0px 2px 6px rgba(0, 0, 0, 0.2)',
  }),
}));
