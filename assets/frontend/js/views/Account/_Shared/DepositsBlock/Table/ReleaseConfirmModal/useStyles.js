import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  errorText: {
    color: '#8A2824',

    '& ul': {
      margin: 0,
      paddingLeft: 15,

      '& li:not(:first-child)': {
        marginTop: 10,
      },
    },
  },
  successText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: '14px',

    '& span': {
      fontWeight: '700 !important',
    },
  },
  successSubtitle: {
    color: '#828282',
    paddingTop: '8px',
    textAlign: 'center',
  },
  successDesc: {
    paddingTop: '18px',
    borderTop: '1px solid #E0E0E0',
    marginTop: '20px',
  },
  modalBody: {
    backgroundColor: '#FFF',
  },
  requestTitle: {
    ...mixins.font(18, 24, 700),

    '& span': {
      fontWeight: 700,
    },
  },
  refundSuccessDesc: {
    paddingTop: 12,
    lineHeight: '20px',

    '& strong': {
      fontSize: 14,
    },
  },
  linkWrap: {
    paddingTop: 14,
  },
}));
