import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    width: '100%',
    marginTop: 4,
    display: 'inline-flex',
    minWidth: 0,
    [breakpoints.down('md')]: {
      marginTop: 6,
    },
  },
  link: {
    ...mixins.textEllipsis(),
    color: '#2158F5',
    ...mixins.font(16, 24),
    [breakpoints.down('md')]: {
      ...mixins.font(14, 19),
    },
  },
  count: {
    marginLeft: 4,
    color: '#828282',
    ...mixins.font(14, 26),
    [breakpoints.down('md')]: {
      lineHeight: '19px',
    },
  },
}));
