import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: 0,
  },
  header: {
    backgroundColor: '#FFF1D2',
    padding: [[24, 24, 18]],
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,

    [breakpoints.down('sm')]: {
      padding: [[16, 14]],
    },
  },
  caption: {
    ...mixins.font(24, 32, 400),

    [breakpoints.down('sm')]: {
      ...mixins.font(20, 27),
    },
  },
  desc: {
    lineHeight: '24px',
  },
  featureList: {
    margin: [[0, 0, 0, 10]],
    padding: 0,
  },
  featureListTrigger: {
    textDecoration: 'underline',
    textDecorationStyle: 'dotted',
    color: '#2158F5',

    '&:hover': {
      textDecoration: 'none',
    },
  },
  body: {
    backgroundColor: '#FFF',
    padding: [[16, 24]],
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,

    [breakpoints.down('sm')]: {
      padding: [[16, 14]],
    },
  },
  label: {
    ...mixins.font(14, 20, 400),
    paddingBottom: 2,
    color: '#828282',
  },
  value: {
    ...mixins.font(24, 32, 400),

    [breakpoints.down('sm')]: {
      ...mixins.font(20, 27),
    },
  },
  row: {
    '&:not(:first-child)': {
      marginTop: 12,
      paddingTop: 12,
      borderTop: '1px solid #E5E5E5',
    },
  },
  depositsSummaryValue: {
    textDecoration: 'none',
  },
  balanceDueValue: {
    color: '#9f2d19',
    borderBottom: '1px dotted #9f2d19',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  inlineGrid: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  customRow: {
    display: 'flex',
    '&:not(:first-child)': {
      marginTop: 12,
      paddingTop: 12,
      borderTop: '1px solid #E5E5E5',
    },
  },
  activeBids: {
    paddingRight: 12,
    marginRight: 12,
    borderRight: '1px solid #E5E5E5',
  },
  balanceDue: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    '& > $releaseCta': {
      top: 'inherit',
    },
  },
  releaseCta: {
    position: 'relative',
    top: -11,
  },
}));
