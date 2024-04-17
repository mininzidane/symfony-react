import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[35, 0]],

    [breakpoints.down('sm')]: {
      padding: [[18, 0]],
    },
  },
  title: {
    margin: 0,
    ...mixins.font(28, 40, 300),
    color: '#333333',
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      fontSize: 20,
      lineHeight: '24px',
    },
  },
  subtitle: {
    margin: [[7, 0, 0]],
    ...mixins.font(18, 24, 300),
    color: '#828282',
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 20),
      marginTop: 3,
    },
  },
  content: {
    margin: [[20, 'auto', 0]],
    maxWidth: 480,

    [breakpoints.down('sm')]: {
      marginTop: 18,
    },
  },
}));
