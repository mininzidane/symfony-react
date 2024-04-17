import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    margin: '55px auto',
    maxWidth: '600px',
    [breakpoints.down('sm')]: {
      margin: '30px auto 40px',
    },
  },
  header: {
    transition: 'background-color .25s ease',
    padding: '26px 15px 32px',
    textAlign: 'center',
  },
  title: {
    ...mixins.font(36, 48),
    color: '#fff',
    fontWeight: '300',
  },
  desc: {
    ...mixins.font(16, 21),
    marginTop: '4px',
    color: '#fff',
  },
  wrap: {
    padding: '20px 60px 52px',
    backgroundColor: '#fff',
    [breakpoints.down('sm')]: {
      padding: '15px 30px 30px',
    },
  },
  table: {
    width: '100%',
    '& tbody tr': {
      borderBottom: '2px solid white',
    },
    '& th': {
      padding: '6px 14px',
      textTransform: 'uppercase',
      textAlign: 'left',
      ...mixins.font(14, 19, 300),
      '&:first-child': {
        width: '50%',
      },
    },
    '& td': {
      ...mixins.font(14, 17, 400),
      padding: '14px',
      backgroundColor: '#F5F5F5',
      '&:first-child': {
        backgroundColor: '#EFEFEF',
      },
    },
  },
}));
