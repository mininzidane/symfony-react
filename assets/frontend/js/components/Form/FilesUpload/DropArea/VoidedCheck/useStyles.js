import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  title: {
    ...mixins.font(14, 24, 700),
    textTransform: 'none',
    display: 'grid',
    gridTemplateColumns: '20px 1fr',
    gridGap: '5px',
    alignItems: 'center',
    color: '#333',
    marginBottom: 6,
  },
  subtitle: {
    ...mixins.font(14, 20),
    color: '#333',
    maxWidth: 400,
  },
  browseCta: {
    color: '#2158F5',
    borderBottom: '1px dashed #2158F5',
    whiteSpace: 'nowrap',
    '&:hover': {
      borderBottomColor: 'transparent',
    },
  },
  desc: {
    ...mixins.font(12, 18, 400),
    marginTop: 6,
    color: '#828282',
  },
}));
