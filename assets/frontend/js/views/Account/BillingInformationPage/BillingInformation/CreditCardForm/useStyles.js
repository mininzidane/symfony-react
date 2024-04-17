import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[18, 20]],
  },
  loader: {
    minHeight: '220px',
    position: 'relative',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    alignItems: 'flex-start',
    paddingBottom: '4px',
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  column: {
    display: 'grid',
    gridAutoColumns: '1fr',
    gridGap: '10px',
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
  inputTooltip: {
    ...mixins.absolute(12, 10),

    '& svg': {
      display: 'block',
    },
  },
  inputLabel: {
    ...mixins.font(14, 19),
    paddingBottom: '6px',
    color: '#4b5158',
  },
}));
