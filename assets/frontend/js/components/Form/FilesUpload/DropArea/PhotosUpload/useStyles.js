import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '54px 1fr',
    gridGap: 14,
    textAlign: 'left',
  },
  icon: {
    marginTop: 5,
  },
  title: {
    ...mixins.font(14, 20, 400),
    color: '#0D5DB8',
    display: 'inline-block',
    borderBottom: '1px dashed #0D5DB8',

    [breakpoints.down('md')]: {
      marginBottom: '4px',
    },
  },
  supportedFiles: {
    fontSize: '11px',
    lineHeight: '16px',
    color: '#828282',
    marginTop: 3,
  },
}));
