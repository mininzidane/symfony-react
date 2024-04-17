import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    position: 'relative',
    padding: 14,
    background: '#FCF1D5',
    borderRadius: '4px',
    marginBottom: 0,
  },
  submitButton: {
    marginTop: 14,
  },
  formWrap: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    gridGap: '14px 14px',
  },
  social: {
    ...mixins.flex('center', 'center'),
    paddingLeft: 14,

    '& img': {
      display: 'block',
    },

    '& > a:nth-child(2)': {
      margin: [[0, 18]],
    },

    [breakpoints.down('md')]: {
      paddingRight: 0,
    },

    [breakpoints.down('xs')]: {
      '& > a:nth-child(2)': {
        margin: [[0, 14]],
      },
    },
  },
  phoneNumber: {
    display: 'inline-block',
    marginTop: 5,
    fontWeight: 700,
  },
  subcaption: {
    ...mixins.font(16, 21, 400),
    margin: [[10, 0, 0]],
    paddingBottom: 10,
  },
  caption: {
    ...mixins.font(20, 27, 700),
    margin: 0,
  },
  contacts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 14,

    '&:before': {
      content: "''",
      position: 'absolute',
      marginTop: -14,
      right: 0,
      left: 0,
      borderTop: '1px solid #E6ECFD',
    },
  },
}));
