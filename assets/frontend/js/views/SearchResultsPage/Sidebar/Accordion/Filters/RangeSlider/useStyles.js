import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  grid: {
    display: 'flex',
    paddingBottom: 2,
  },
  inputLabel: {
    ...mixins.font(15, 20, 400),
    marginBottom: 8,
  },
  separator: {
    background: '#BDBDBD',
    height: 1,
    margin: [[48, 7, 0]],
    width: 10,
  },
  cell: {
    width: 'calc(50% - 12px)',
  },
  input: {},
  slider: {
    marginTop: 22,
  },
  apply: {
    marginTop: 12,
  },
  sliderWrap: {
    position: 'relative',
    marginTop: 15,
    zIndex: 20,
    padding: [[0, 9]],
    overflow: 'hidden',
  },
}));
