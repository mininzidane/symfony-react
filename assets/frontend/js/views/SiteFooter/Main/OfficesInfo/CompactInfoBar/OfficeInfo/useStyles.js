import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    position: 'relative',

    '&:hover': {
      '& $dropdown': {
        opacity: 1,
        visibility: 'visible',
      },

      '& $label': {
        borderBottomColor: 'transparent',
      },

      '& $arrow': {
        transform: 'scaleY(-1)',
      },
    },
  },
  button: {
    display: 'grid',
    gridTemplateColumns: '1fr 10px',
    gridGap: 8,
    alignItems: 'center',
  },
  label: {
    ...mixins.font(16, 20, 400),
    borderBottom: '1px dashed #90ACFA',
    color: '#2158F5',
  },
  arrow: {
    marginTop: 2,
  },
  dropdown: {
    opacity: 0,
    visibility: 'hidden',
    position: 'absolute',
    top: 40,
    right: -16,
    width: 375,
    backgroundColor: '#FFF',
    transition: 'opacity .2s ease',
    borderRadius: 4,
    padding: 20,
    boxShadow: '0 0 30px rgb(0, 0, 0, .35)',
    zIndex: 300,

    '&::before': {
      content: '""',
      position: 'absolute',
      top: -20,
      left: 0,
      width: '100%',
      height: 20,
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -20,
      left: 0,
      width: '100%',
      height: 20,
    },
  },
}));
