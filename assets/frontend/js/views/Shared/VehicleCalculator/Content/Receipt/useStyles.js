import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isMobileView, isLegacyView }) => {
  if (isLegacyView) {
    return {
      title: {
        textTransform: 'uppercase',
        color: '#999889',
        fontSize: 14,
        lineHeight: '20px',
        fontWeight: 700,
        paddingBottom: 14,
      },
      rows: {
        backgroundColor: '#FFFCDF',
        borderTopRightRadius: 4,
        padding: [[20, 30, 14]],

        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          padding: [[20, 14, 14]],
          borderTopRightRadius: 0,
        },
      },
      footer: {
        padding: [[4, 30, 14]],

        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          padding: [[0, 14, 10]],
        },
      },
    };
  }

  return {
    title: {
      textTransform: 'uppercase',
      color: '#999889',
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 700,
      paddingBottom: 14,
    },
    highlighted: {
      backgroundColor: '#FFF1D2',
      margin: '0 -14px',
      padding: '0 14px',
    },
    footer: {
      backgroundColor: '#FFE197',
      margin: '0 -14px -14px',
      padding: '0 14px',
      borderRadius: '0 0 4px 4px',
    },
  };
});
