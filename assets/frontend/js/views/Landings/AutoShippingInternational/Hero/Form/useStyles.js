import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    gridGap: 10,
    paddingTop: 15,
  },
  field: {
    border: '1px solid rgba(255, 255, 255, 0.25)',

    '& input': {
      color: '#fff',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '0 14px',

      '&::placeholder': {
        color: '#fff',
      },
    },

    '&:hover': {
      borderColor: '#fff',
    },
  },
  formSubmitButton: {
    marginTop: 6,
  },
  btnArrow: {
    height: 12,
    marginLeft: 6,
  },
  calcImg: {},
  calcLabel: {
    color: '#0D5DB8',
    fontSize: 14,
    marginTop: 4,
    lineHeight: '24px',
    fontWeight: '400',

    [breakpoints.down('sm')]: {
      marginLeft: 13,
    },
  },
  separator: {
    ...mixins.font(11, 14, 400),
    opacity: 0.5,
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '&::before': {
      content: '""',
      width: 'calc(50% - 12px)',
      height: 1,
      background: 'linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
      opacity: 0.5,
    },

    '&::after': {
      content: '""',
      width: 'calc(50% - 12px)',
      height: 1,
      background: 'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
      opacity: 0.5,
    },
  },
  calc: {
    border: '1px solid rgba(255, 255, 255, 0.25)',
    color: '#fff',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '0 14px',
    minHeight: 50,
    cursor: 'pointer',
    borderRadius: 90,
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,

    '&:hover': {
      borderColor: '#fff',
    },

    '& img': {
      marginLeft: 12,
    },
  },
}));
