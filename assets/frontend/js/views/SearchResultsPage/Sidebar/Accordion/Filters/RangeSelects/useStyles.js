import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  grid: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 3,
  },
  inputLabel: {
    ...mixins.font(15, 20, 400),
    marginBottom: 8,
  },
  separator: {
    background: '#BDBDBD',
    height: 1,
    margin: [[0, 10]],
    width: 9,
  },
  cell: {
    width: 'calc(50% - 13px)',
  },
  select: {
    '& .select-plane__control': {
      backgroundColor: '#F1F1F8',
    },
  },
}));
