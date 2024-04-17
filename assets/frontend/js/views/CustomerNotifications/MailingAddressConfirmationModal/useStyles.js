import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  cta: {
    marginTop: 10,
  },
  body: {
    padding: [[14, 16]],

    [breakpoints.up('md')]: {
      overflow: 'visible',
    },
  },
  desc: {
    ...mixins.font(16, 22),
  },
  note: {
    ...mixins.font(12, 16),
    display: 'grid',
    gridTemplateColumns: '14px 1fr',
    gridGap: 10,
    backgroundColor: '#E6ECFD',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,

    '& img': {
      marginTop: 3,
    },
  },
  tabs: {
    display: 'flex',
    padding: [[14, 0]],

    '& > div:first-child': {
      marginRight: 34,
    },
  },
  inputContainer: {
    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
  inputsGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 14,
    marginTop: 10,
  },
  error: {
    ...mixins.font(12, 16),
    color: '#8C0C0C',
    marginTop: 10,
  },
}));
