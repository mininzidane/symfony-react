import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(14, 17),
    marginTop: 7,
    textAlign: 'right',
    width: 'calc(100% / 1.71429)',

    [breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
  },
  label: {
    [breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'left',
      justifyContent: 'flex-start',
    },
  },
  content: {
    ...mixins.font(16, 21),
    ...mixins.textEllipsis(),
    paddingTop: 3,
    minWidth: 120,
    textAlign: 'right',

    [breakpoints.down('md')]: {
      paddingTop: 0,
    },
  },
  currency: {
    fontWeight: 300,
  },
}));
