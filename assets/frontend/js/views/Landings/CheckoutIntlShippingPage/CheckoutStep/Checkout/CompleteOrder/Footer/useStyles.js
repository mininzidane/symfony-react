import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#EEEEEE',
    display: 'grid',
    padding: '20px 20px 16px 20px',
    gridTemplateColumns: '1fr minmax(auto, 328px)',
    gridGap: 18,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr minmax(auto, 276px)',
    },

    [breakpoints.down('sm')]: {
      display: 'block',
      padding: [[10, 12, 16]],
    },
  },
  wrap: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    minWidth: '276px',
    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  notice: {
    ...mixins.font(16, 21, 600),
    marginTop: 11,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    color: '#333',

    [breakpoints.down('sm')]: {
      paddingTop: '12px',
      marginTop: 0,
      paddingLeft: 0,
      textAlign: 'center',
      justifyContent: 'flex-start',
    },

    '& img': {
      marginRight: '8px',
    },
  },
}));
