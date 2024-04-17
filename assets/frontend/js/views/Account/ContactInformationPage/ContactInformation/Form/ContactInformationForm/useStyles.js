import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  loader: {
    minHeight: '220px',
    position: 'relative',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '20px',
    alignItems: 'flex-start',
    paddingBottom: '4px',
    '@media (max-width: 1440px)': {
      gridTemplateColumns: '1fr 1fr',
    },
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  column: {
    display: 'grid',
    gridAutoColumns: '1fr',
    gridGap: '10px',
    '&:first-child': {
      '@media (max-width: 1440px)': {
        gridRow: '1/3',
      },
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#333333',
  },
  fieldGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '10px',
  },
  tickbox: {
    minHeight: '40px',
    paddingTop: 4,
    [breakpoints.down('sm')]: {
      minHeight: 'auto',
    },
    '& .tickbox label': {
      fontSize: '14px',
    },
  },
  tickboxInline: {
    paddingTop: 4,
    '& .tickbox label': {
      fontSize: '14px',
    },
  },
  inputContainer: {
    position: 'relative',
  },
  inputLabel: {
    ...mixins.font(14, 19),
    paddingBottom: '6px',
    color: '#4b5158',
  },
}));
