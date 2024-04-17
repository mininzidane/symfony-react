import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.scrollbar(),
    position: 'relative',
    padding: 20,
    backgroundColor: '#fff',
    overflow: ({ isOverflowVisible }) => (isOverflowVisible ? null : 'auto'),
    minHeight: 80,

    [breakpoints.down('sm')]: {
      ...mixins.scrollbar('sm'),
      padding: 14,
    },
  },
}));
