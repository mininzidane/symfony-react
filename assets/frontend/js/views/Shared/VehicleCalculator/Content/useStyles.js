import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isMobileView, isLegacyView }) => {
  if (isLegacyView) {
    return {
      grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          gridTemplateColumns: 'auto 1fr',
        },
      },
      refinements: {
        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          gridColumn: '1/-1',
        },
      },
      receiptSectionWrap: {
        backgroundColor: '#FFF1C3',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        gridRowEnd: 'span 2',

        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 4,
        },
        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          gridColumn: '1/-1',
        },
      },
      orderShipping: {
        padding: [[0, 30, 20]],

        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          padding: [[0, 14, 20]],
        },
      },
      print: {
        gridRow: '2/5',
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          gridRow: 'auto',
          backgroundColor: '#FFF1C3',
          marginTop: 0,
        },
      },
    };
  }

  return {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'minmax(250px, 2fr) 5fr',

      [breakpoints.down('sm')]: {
        gridTemplateColumns: '4fr 7fr',
      },

      [breakpoints.down(isMobileView ? 'xl' : 'xs')]: {
        gridTemplateColumns: 'auto 1fr',
      },
    },
    receiptSectionWrap: {
      gridRowEnd: 'span 2',
      [breakpoints.down(isMobileView ? 'xl' : 'xs')]: {
        gridColumn: '1/-1',
      },
    },
    refinements: {
      [breakpoints.down(isMobileView ? 'xl' : 'xs')]: {
        gridColumn: '1/-1',
      },
    },
    receiptSection: {
      padding: [[12, 14]],
      backgroundColor: '#FFFCDF',
      borderRadius: 4,

      [breakpoints.down(isMobileView ? 'xl' : 'xs')]: {
        borderLeft: 'none',
        paddingLeft: 14,
        paddingTop: 14,
        marginTop: 16,
      },
    },
    orderShipping: {
      marginTop: 10,
    },
    print: {
      gridRow: '2/5',
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      [breakpoints.down(isMobileView ? 'xl' : 'xs')]: {
        gridRow: 'auto',
        marginTop: '14px',
      },
    },
  };
});
