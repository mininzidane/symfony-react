import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ isLegacyView }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '21px',
    '& + div': {
      borderTop: '1px solid #D8BB7A',
    },
    ...(isLegacyView && {
      fontSize: '18px',
      lineHeight: '22px',
      fontWeight: 'normal',
    }),
  },
  value: {
    whiteSpace: 'nowrap',

    '&.is-loading': {
      opacity: 0.5,
    },

    ...(isLegacyView && {
      top: '-1px',
      position: 'relative',
      fontSize: '24px',
      lineHeight: '30px',
    }),
  },
}));
