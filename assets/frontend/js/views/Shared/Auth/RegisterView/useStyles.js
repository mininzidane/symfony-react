import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    maxWidth: 530,
    margin: 'auto',

    [breakpoints.down('sm')]: {
      maxWidth: 'none',
    },
  },
  rootWithBg: {
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  rootWithPadding: {
    padding: [[25, 24]],

    [breakpoints.down('sm')]: {
      padding: [[25, 14]],
    },
  },
  signInLinkContainer: {
    marginTop: 22,
    textAlign: 'center',
  },
  signInLink: {
    textDecoration: 'none !important',
    position: 'relative',
    display: 'inline-block',
    color: '#333333',

    '&:hover::after': {
      opacity: 0,
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -3,
      left: 0,
      width: '100%',
      height: 6,
      borderBottom: '1px dashed #999999',
    },
  },
  title: {
    ...mixins.font(28, 39, 300),
    marginBottom: 25,
    marginTop: 0,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(20, 27),
      marginBottom: 25,
    },
  },
  subtitle: {
    ...mixins.font(14, 19, 300),
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  inputs: {
    gridGap: 20,

    [breakpoints.down('sm')]: {
      gridColumnGap: 10,
      gridRowGap: 15,
    },
  },
  submitBtn: {
    marginTop: 14,
    textTransform: 'uppercase',
  },
  spacer: {
    height: 15,
  },
}));
