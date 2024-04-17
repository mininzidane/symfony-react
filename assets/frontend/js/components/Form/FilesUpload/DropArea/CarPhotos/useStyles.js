import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    '&.is-compact': {
      height: 'auto',
      paddingTop: '6px!important',
      paddingBottom: '8px!important',
      [breakpoints.down('sm')]: {
        padding: '14px 14px 8px!important',
      },
      '& $content': {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
        [breakpoints.down('sm')]: {
          gridTemplateColumns: '1fr',
          textAlign: 'center',
        },
      },
      '& $title': {
        [breakpoints.down('sm')]: {
          display: 'none',
        },
      },
      '& $subtitle': {
        padding: '0',
        lineHeight: '18px',
      },
      '& $button': {
        gridRow: '3/1',
        gridColumn: '2/2',
        margin: '1px 0 0',
        [breakpoints.down('sm')]: {
          gridRow: 'auto',
          gridColumn: 'auto',
          margin: '0',
        },
      },
      '& $desc': {
        marginTop: '0',
        [breakpoints.down('sm')]: {
          marginTop: '4px',
        },
      },
      '&:hover $button': {
        color: '#FFFFFF',
        backgroundColor: '#2158F5',
      },
    },
    '&:hover $button': {
      backgroundColor: '#5681F7',
    },
  },
  content: {},
  button: {
    textTransform: 'uppercase',
    margin: [[16, 'auto', 0]],
    minWidth: 278,
    width: 'auto',
    pointerEvents: 'none',
    [breakpoints.down('sm')]: {
      marginTop: '16px',
    },
  },
  title: {
    ...mixins.font(16, 24, 700),
    color: '#333',
    marginTop: -4,
    [breakpoints.down('sm')]: {
      maxWidth: '260px',
      lineHeight: '20px',
    },
  },
  subtitle: {
    ...mixins.font(14, 20, 400),
    color: '#828282',

    [breakpoints.up('md')]: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  desc: {
    ...mixins.font(12, 18, 400),
    marginTop: 5,
    color: '#828282',
  },
}));
