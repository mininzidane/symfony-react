import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    background: '#FFFFFF',
    border: '1px solid #BFBFBF',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  title: {
    ...mixins.font(16, 20, 700),
    borderTopRightRadius: '4px',
    borderTopLeftRadius: '4px',
    background: '#2158F5',
    color: 'white',
    padding: '10px 20px',
  },
  container: {
    padding: ({ hasPadding }) => (hasPadding ? '16px 20px 35px' : 0),
  },
}));
