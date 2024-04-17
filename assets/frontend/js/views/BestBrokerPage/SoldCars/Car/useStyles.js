import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: '12px 20px 14px',
  },
  title: {
    ...mixins.font(14, 19, 700),
    marginBottom: 3,
  },
  container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  column: {
    ...mixins.font(12, 17),
    width: 'calc(100% / 3)',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
