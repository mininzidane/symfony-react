import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',

    '&:not(:last-child)': {
      marginRight: 15,
    },
  },
  label: ({ isActive }) => ({
    color: '#457AB2',
    marginRight: 5,
    fontWeight: isActive ? 700 : 400,
  }),
  upArrow: {
    fill: ({ isActive, order }) => (isActive && order === 'asc' ? '#676A6C' : 'rgba(103, 106, 108, .4)'),
  },
  downArrow: {
    fill: ({ isActive, order }) => (isActive && order === 'desc' ? '#676A6C' : 'rgba(103, 106, 108, .4)'),
  },
}));
