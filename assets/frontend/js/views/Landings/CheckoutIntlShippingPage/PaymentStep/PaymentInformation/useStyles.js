import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: [[12, 20, 20]],

    [breakpoints.down('sm')]: {
      padding: [[12, 12, 16]],
    },
  },
  description: {
    ...mixins.font(16, 21, 600),
    paddingBottom: 12,
    borderBottom: '1px solid #BDBDBD',
  },
  methodsTitle: {
    ...mixins.font(16, 21, 600),
    marginTop: 12,
    paddingBottom: 8,
  },
  info: {
    backgroundColor: '#F7F8FA',
    borderRadius: 2,
    marginTop: 10,
    padding: [[14, 20]],
    lineHeight: '20px',
  },
  radioButton: {
    display: 'flex',

    '& img': {
      marginLeft: 10,
    },
  },
}));
