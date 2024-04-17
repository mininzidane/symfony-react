import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  header: {
    alignItems: 'flex-start',
    paddingTop: '18px',
    paddingBottom: '24px',
    '& button': {
      marginTop: '-2px',
      marginRight: '-6px',
      [breakpoints.down('sm')]: {
        marginRight: '-2px',
      },
    },
    [breakpoints.down('sm')]: {
      paddingTop: '11px',
      paddingBottom: '15px',
    },
  },
  title: {
    ...mixins.font(32, 40, 700),
    textTransform: 'uppercase',
    color: '#FFFFFF',
    [breakpoints.down('sm')]: {
      ...mixins.font(22, 24),
    },
  },
  subtitle: {
    ...mixins.font(22, 26),
    marginTop: '2px',
    [breakpoints.down('sm')]: {
      ...mixins.font(13, 18),
      marginTop: '4px',
    },
  },
  body: {
    paddingTop: '8px',
    paddingBottom: '2px',
  },
  desc: {
    fontSize: '14px',
    lineHeight: '14px',
    paddingBottom: '8px',
    color: '#333',
  },
  footer: {
    display: 'block',
    backgroundColor: '#F6F6F6',
    borderTop: '0',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap-reverse',
    margin: '0 -5px',
    justifyContent: 'center',
  },
  btn: {
    margin: '4px 10px',
    width: 'auto',
    flexGrow: '1',
    maxWidth: '320px',
    [breakpoints.down('md')]: {
      margin: '4px 5px',
    },
  },
  clearVinCtaWrap: {
    display: 'inline-flex',
  },
  clearVinSpinner: {
    margin: '0 3px',
    position: 'relative',
    top: '2px',
  },
  icon: {
    display: 'inline-block',
    marginBottom: '-4px',
    marginRight: '-2px',
  },
  calcIcon: {
    marginBottom: '-6px',
    marginLeft: '-2px',
  },
  shippingIcon: {
    marginRight: '1px',
    marginLeft: '-2px',
  },
  creditCardIcon: {
    margin: '-3px 1px -8px -1px',
  },
}));
