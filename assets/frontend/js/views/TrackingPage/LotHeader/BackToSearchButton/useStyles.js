import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    fontSize: '14px !important',
    lineHeight: '20px !important',
    fontWeight: '400 !important',
    padding: '10px 13px !important',

    '&.is-select': {
      boxShadow: 'inset 0 0 0 1px #91B9F4 !important',

      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, .15) !important',
      },

      '& span': {
        color: '#FFF !important',
      },

      '& path': {
        fill: '#FFF !important',
      },
    },

    [breakpoints.down('lg')]: {
      height: 30,
      padding: '5px 13px !important',
    },

    [breakpoints.down('sm')]: {
      width: '30px !important',
      padding: '7px 7px 3px !important',
    },
  },
}));
