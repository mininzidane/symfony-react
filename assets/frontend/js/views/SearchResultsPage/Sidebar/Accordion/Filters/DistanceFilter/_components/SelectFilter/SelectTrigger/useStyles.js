import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: ({ isPort, placeholder }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    height: 40,
    background: isPort ? '#FFF' : '#F1F1F8',
    border: '1px solid #B7B5B3',
    color: placeholder ? '#828282' : '#000',
    padding: [[0, 11]],
    cursor: 'pointer',
    borderTopRightRadius: isPort ? 0 : 4,
    borderBottomRightRadius: isPort ? 0 : 4,
    borderTopLeftRadius: isPort ? 4 : 0,
    borderBottomLeftRadius: isPort ? 4 : 0,
    marginLeft: isPort ? 0 : -1,
    width: isPort ? '100%' : 'auto',

    [breakpoints.down('sm')]: {
      height: 30,
      padding: [[0, 9]],
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      width: '50%',
    },

    '&:hover': {
      borderColor: '#4B5158',
      zIndex: 21,
    },

    '&.is-error': {
      borderColor: '#8C0C0C',
    },
  }),
  caret: {
    width: '0',
    height: '0',
    borderTop: '5px solid #797979',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    transition: 'transform .2s linear',
    marginLeft: 10,
    marginTop: 2,
  },
  label: ({ isPort }) => ({
    maxWidth: isPort ? 155 : 60,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    minWidth: 50,

    [breakpoints.down('xs')]: {
      maxWidth: 'initial',
    },
  }),
}));
