import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '3fr 5fr',
    gridGap: 12,
    alignItems: 'center',
  },
  label: {
    ...mixins.font(18, 24, 400),

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20),
    },
  },
}));
