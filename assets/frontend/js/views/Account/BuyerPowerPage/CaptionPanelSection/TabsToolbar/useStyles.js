import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#F6F6F6',

    '& button': {
      ...mixins.font(14, 18),
      color: 'inherit',
      padding: [[5, 0]],

      [breakpoints.down('sm')]: {
        paddingBottom: 14,
      },
    },
  },
  count: {
    backgroundColor: '#B20000',
    borderRadius: '50%',
    color: '#FFF',
    textAlign: 'center',
    marginLeft: '7px',
    display: 'inline-block',
    minWidth: 15,
    fontSize: 11,
    lineHeight: '15px',
    fontFamily: 'Arial',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
}));
