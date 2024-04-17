import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: '0 0 20px',
    [breakpoints.down('md')]: {
      paddingBottom: 40,
    },
  },
  title: {
    ...mixins.font(36, 48, 300),
    margin: '0',
    padding: '65px 0 84px',
    textAlign: 'center',
    color: '#055A98',
    [breakpoints.down('md')]: {
      ...mixins.font(24, 29, 400),
      padding: '36px 0 0',
      color: '#496B90',
    },
  },

  stepWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 65px',

    [breakpoints.down('md')]: {
      height: 'auto !important',
      padding: '0 12px !important',
    },

    [breakpoints.down('sm')]: {
      padding: '0!important',
    },

    /* Step 1 */
    '&.is-step1-section1': {
      height: '360px',
      '& $stepPin': {
        bottom: '130px',
      },
      '& $stepContainer': {
        '&:first-child': {
          paddingTop: '50px',
          justifyContent: 'flex-end',
        },
        '&:last-child': {
          paddingTop: '182px',
        },
      },
    },
    '&.is-step1-section2': {
      height: '360px',
      '& $stepPin': {
        bottom: '205px',
      },
      '& $stepContainer.is-step-mid': {
        [breakpoints.down('md')]: {
          order: '-1',
          paddingTop: '20px!important',
        },
      },
    },
    '&.is-step1-section3': {
      '& $stepPin': {
        bottom: '145px',
      },
      '& $stepContainer': {
        '&:first-child': {
          paddingRight: 38,
        },
        '&:last-child': {
          paddingTop: 83,
        },
      },
    },

    /* Step 2 */
    '&.is-step2-section1': {
      height: '360px',
      '& $stepPin': {
        bottom: 170,
      },
      [breakpoints.down('md')]: {
        '& br': {
          display: 'block !important',
        },
        '& .is-step-single': {
          order: '-1',
          marginBottom: '15px !important',
        },
      },
    },
    /* Step 3 */
    '&.is-step3-section1': {
      height: '360px',
      '& $stepPin': {
        bottom: 170,
      },
      [breakpoints.down('md')]: {
        '& img': {
          marginBottom: '10px !important',
        },
        '& br': {
          display: 'block !important',
        },
      },
    },

    /* Step 4 */
    '&.is-step4-section1': {
      height: '360px',
      '& $stepPin': {
        bottom: 170,
      },
      [breakpoints.down('md')]: {
        '& img': {
          marginBottom: '10px !important',
        },
        '& br': {
          display: 'block !important',
        },
        '& $stepContainer': {
          padding: '20px 0 6px !important',
        },
        '& .is-step-single': {
          order: '-1',
        },
      },
    },

    /* Step 5 */
    '&.is-step5-section1': {
      height: 500,
      '& $stepPin': {
        bottom: 290,
      },
      '& $stepContainer': {
        paddingBottom: 120,
      },
      [breakpoints.down('md')]: {
        '& img': {
          margin: '30px 0 15px !important',
        },
        '& .is-step-single': {
          paddingBottom: '40px !important',
          '& br': {
            display: 'block !important',
          },
        },
      },
    },
    '&.is-two-ways': {
      ...mixins.font(16, 22),
      position: 'relative',
      paddingBottom: '70px',
      color: '#000000',
      '&:after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        width: '1px',
        height: '90px',
        left: '50%',
        bottom: '0',
        background: 'linear-gradient(180deg, #C4C4C4 0%, rgba(196, 196, 196, 0) 100%)',
        [breakpoints.down('md')]: {
          display: 'none !important',
        },
      },
    },

    /* Step 6 */
    '&.is-step6-section1': {
      height: 440,
      '& $stepPin': {
        bottom: 220,
      },
      [breakpoints.down('md')]: {
        '& .is-step-single': {
          padding: '0 !important',
          order: '-1',
        },
        '& br': {
          display: 'block !important',
        },
      },
    },

    /* Step 7 */
    '&.is-step7-section1': {
      height: 360,
      '& $stepPin': {
        bottom: 170,
      },
      '& $stepContainer.is-step-start:before': {
        height: 207,
      },
    },
  },
  stepContainer: {
    width: '50%',
    position: 'relative',
    fontSize: '20px',
    lineHeight: '30px',
    color: '#000000',

    [breakpoints.down('md')]: {
      width: '100% !important',
      padding: '0 !important',
      height: 'auto',
      fontSize: '16px',
      lineHeight: '20px',
      '& img': {
        maxWidth: '480px',
        position: 'static !important',
        display: 'block',
        margin: '30px auto !important',
        width: 'calc(100% + 20px)',
        [breakpoints.down('sm')]: {
          width: '100%',
          margin: '0 !important',
        },
      },
      '& br': {
        display: 'none',
      },
    },

    '&:first-child': {
      paddingRight: '52px',
    },
    '&:last-child': {
      paddingLeft: '53px',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: '0',
      height: '100%',
      width: '1px',
      display: 'none',
      [breakpoints.down('md')]: {
        display: 'none !important',
      },
    },
    '&.is-step-start:before': {
      display: 'block',
      background: 'linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #C4C4C4 100%)',
      top: '-30px',
    },
    '&.is-step-mid:before': {
      display: 'block',
      background: '#C4C4C4',
      top: '-30px',
      height: 'calc(100% + 60px)',
    },
    '&.is-step-end:before': {
      display: 'block',
      background: 'linear-gradient(180deg, #C4C4C4 0%, rgba(196, 196, 196, 0) 100%)',
      bottom: '-30px',
    },
    '&.is-step-single:before': {
      display: 'block',
      background: 'linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #C4C4C4 50%, rgba(196, 196, 196, 0) 100%)',
      bottom: '-20px',
      top: '-20px',
      height: 'calc(100% + 40px)',
    },
  },
  stepPin: {
    position: 'absolute',
    left: '-12px',
    [breakpoints.down('md')]: {
      display: 'none!important',
    },
  },
  twoWaysCaption: {
    ...mixins.font(36, 43, 300),
    color: '#055A98',
    width: '100%',
    [breakpoints.down('md')]: {
      fontWeight: 'normal !important',
      fontSize: '24px !important',
      lineHeight: '29px !important',
    },
  },
  twoWaysTitle: {
    ...mixins.font(24, 48, 300),
    color: '#055A98',
    width: '100%',
    [breakpoints.down('md')]: {
      fontWeight: 'bold !important',
      fontSize: '18px !important',
      lineHeight: '48px !important',
    },
  },
}));
