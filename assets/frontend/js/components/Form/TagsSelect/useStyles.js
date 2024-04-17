import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#FFF',
    border: '1px solid #333333',
    borderRadius: 4,
    paddingLeft: 9,
    paddingRight: 80,
    boxShadow: 'inset 0 0 0 1px transparent',
    transition: 'border-color .2s ease, box-shadow .2s ease',
    cursor: 'default',
    minWidth: 280,
    height: 40,

    [breakpoints.down('xs')]: {
      width: '100%',
    },

    '&.is-focused': {
      boxShadow: 'inset 0 0 0 1px #2158F5',
      borderColor: '#2158F5',
    },
  },
  input: {
    ...mixins.font(14, 18, 400),
    background: 'transparent',
    border: 'none',
    height: 20,
  },
  inputWrap: {
    '&:first-child input': {
      width: '180px !important',
    },
  },
  grid: {
    display: 'flex',
    alignItems: 'center',

    '& > *:not(:first-child)': {
      marginLeft: 4,
    },
  },
}));
