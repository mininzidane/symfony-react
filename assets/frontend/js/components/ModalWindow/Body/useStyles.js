import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.scrollbar(),
    position: 'relative',
    padding: 20,
    borderBottomLeftRadius: ({ hasFooter }) => (hasFooter ? 0 : 4),
    borderBottomRightRadius: ({ hasFooter }) => (hasFooter ? 0 : 4),
    backgroundColor: '#F6F6F6',
    overflow: ({ isOverflowVisible }) => (isOverflowVisible ? null : 'auto'),
    minHeight: 80,

    [breakpoints.down('sm')]: {
      ...mixins.scrollbar('sm'),
      padding: 14,
    },
  },
}));
