import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '& tr > td': {
      fontSize: '14px',
      color: '#3D4255',
      '&:first-child': {
        minWidth: 90,
        color: '#6B7384',
      },
      '&:last-child': {
        minWidth: 110,
        fontWeight: '700',
        textAlign: 'right',
      },
    },
  },
  title: {
    fontSize: '18px',
    lineHeight: '30px',
    color: '#000',
    marginBottom: '8px',
  },
  total: {
    paddingLeft: '20px',
  },
  emptyState: {
    textAlign: 'left!important',
    fontWeight: '400!important',
  },
  select: {
    textAlign: 'left!important',
  },
  amount: {
    color: '#fff',
    padding: '5px 10px',
    display: 'inline',
  },
  'amount_not-equal': {
    backgroundColor: '#EC535F',
  },
  amount_equal: {
    backgroundColor: '#4CC99E',
  },
}));
