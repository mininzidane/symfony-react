import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#fff',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  title: {
    ...mixins.font(28, 39, 300),
    textAlign: 'center',
    color: '#000',
    marginBottom: 2,
    marginTop: -2,
    [breakpoints.down('sm')]: {
      ...mixins.font(20, 24),
      marginTop: 14,
      marginBottom: 5,
    },
  },
  description: {
    ...mixins.font(14, 20),
    textAlign: 'center',
    color: '#000',
    marginBottom: 19,
    [breakpoints.down('sm')]: {
      ...mixins.font(14, 20, 350),
      marginBottom: 14,
    },
  },
  cta: {
    marginTop: 10,
  },
  fields: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'flex-start',
    gridGap: 10,
    marginBottom: 10,
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));
