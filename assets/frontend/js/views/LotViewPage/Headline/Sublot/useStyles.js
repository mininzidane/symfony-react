import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  trigger: {
    border: '1px solid #2158F5',
    fontSize: 10,
    lineHeight: '18px',
    borderRadius: '9999px',
    color: '#2158F5',
    textTransform: 'uppercase',
    padding: [[0, 10, 0, 8]],
    transition: 'all .2s ease',

    '&.is-active': {
      backgroundColor: '#2158F5',
      color: '#FFFFFF',

      '& > svg': {
        transform: 'scaleY(-1)',

        '& path': {
          fill: '#FFFFFF',
        },
      },
    },
  },
  triggerTriangle: {
    position: 'relative',
    top: -2,
    marginLeft: 5,

    '& path': {
      transition: 'fill .2s ease',
      fill: '#2158F5',
    },
  },
  popover: {
    [breakpoints.up('sm')]: {
      maxWidth: 325,
    },
  },
  address: {
    fontSize: 14,
    lineHeight: '22px',

    '& > strong': {
      fontWeight: 700,
    },
  },
  note: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: '22px',
    color: '#333333',
  },
}));
