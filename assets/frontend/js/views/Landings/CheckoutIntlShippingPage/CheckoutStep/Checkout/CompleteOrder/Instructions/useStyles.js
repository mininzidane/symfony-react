import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    background: '#fff',
    borderRadius: 2,
    border: '1px solid #2158F5',
    padding: [[9, 18, 13]],

    [breakpoints.down('md')]: {
      padding: [[10, 12, 15, 12]],
    },
  },
  title: {
    ...mixins.font(16, 21, 600),
    color: '#333333',
    marginBottom: 11,

    [breakpoints.down('md')]: {
      ...mixins.font(14, 19),
    },
  },
  steps: {
    '& > div:not(:first-child)': {
      marginTop: 14,
    },

    [breakpoints.down('md')]: {
      '& > div:not(:first-child)': {
        marginTop: 10,
      },
    },
  },
}));
