import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  desc: {
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
  cta: {
    width: 'calc(100% / 2.4)',
    paddingLeft: 20,

    [breakpoints.down('sm')]: {
      padding: '14px 0 0 0',
      width: '100%',
    },
  },
  status: {
    width: '100%',
    marginTop: 'auto',
    fontSize: 14,
    textAlign: 'right',
    justifyContent: 'flex-end',

    [breakpoints.down('sm')]: {
      paddingTop: 13,
      textAlign: 'left',
    },
  },
}));
