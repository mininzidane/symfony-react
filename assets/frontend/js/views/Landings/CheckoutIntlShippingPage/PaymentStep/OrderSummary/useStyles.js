import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: 0,
  },
  stats: {
    padding: [[12, 20]],

    [breakpoints.down('sm')]: {
      padding: [[10, 12]],
    },
  },
  stat: {
    ...mixins.font(16, 20, 400),
    display: 'flex',
    justifyContent: 'space-between',
    padding: [[5, 0]],

    '&:not(:last-child)': {
      borderBottom: '1px solid #BDBDBD',
    },

    '& > div:last-child': {
      fontWeight: 700,
      textAlign: 'right',
    },
  },
  action: {
    padding: [[0, 20]],
    backgroundColor: '#EEEEEE',

    [breakpoints.down('sm')]: {
      padding: [[0, 12]],
    },
  },
  total: {
    ...mixins.font(16, 20, 700),
    display: 'flex',
    justifyContent: 'space-between',
    padding: [[12, 0]],
  },
  price: {
    color: '#2158F5',
  },
  totalTitle: {
    color: '#333',
    textTransform: 'uppercase',

    '& span': {
      fontWeight: 400,
    },
  },
  desc: {
    ...mixins.font(12, 16, 400),
    marginTop: 10,
    color: '#828282',
    textAlign: 'center',
  },
  norton: {
    padding: [[15, 0, 20]],
    display: 'flex',
    justifyContent: 'center',
  },
  error: {
    marginBottom: 16,
  },
}));
