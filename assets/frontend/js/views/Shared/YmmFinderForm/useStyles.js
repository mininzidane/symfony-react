import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '19fr 19fr 23fr 19fr 20fr',
    gridGap: 3,
    padding: 3,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    borderRadius: 6,
    marginTop: 26,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '20fr 20fr 24fr 20fr 16fr',
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      marginTop: 22,
    },

    '& .select-plane__control': {
      height: 52,
      cursor: 'pointer !important',
      borderColor: '#626262 !important',
    },

    '& .select-plane__arrow': {
      right: 13,
      top: 24,
    },

    '& .select-plane__menu': {
      marginTop: '-1px !important',
      borderColor: 'rgba(0, 0, 0, .7) !important',
      borderTopColor: '#FFF !important',
    },

    '& .select-plane__value-container': {
      paddingLeft: '12px !important',
    },
  },
  yearsWrap: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
}));
