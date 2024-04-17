import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F1F1F8',
    padding: [[137, 36, 100]],
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    width: '100%',
    height: '100%',

    [breakpoints.down('sm')]: {
      padding: [[0, 14]],
      paddingTop: '45px !important',
    },
  },
  item: {
    ...mixins.font(16, 23, 400),
    color: '#333333',
    marginTop: 36,
    display: 'flex',

    '&:first-child': {
      marginTop: 0,
    },

    [breakpoints.down('sm')]: {
      marginTop: 24,
    },
  },
}));
