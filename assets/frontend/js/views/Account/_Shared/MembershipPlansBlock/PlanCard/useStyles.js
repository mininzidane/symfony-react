import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    margin: '12px',
    width: '25%',
    maxWidth: '300px',
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.25)',

    [breakpoints.down('lg')]: {
      margin: '12px 5px',
    },

    [breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '100%',
      margin: 0,
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      cursor: 'pointer',
      outline: '2px solid rgba(0, 0, 0, 0)',
      outlineOffset: -2,
    },
  },
  selectedPlan: {
    [breakpoints.down('md')]: {
      '&$root': {
        outlineColor: '#2158F5',
      },

      '&$compare__column': {
        backgroundColor: '#F2F9FF',
      },

      '& $compare__even': {
        backgroundColor: '#EEF5FA',
      },
    },

    '& $radio': {
      borderColor: '#2158F5',
      '&::after': {
        display: 'block',
        backgroundColor: '#2158F5',
      },
    },

    '&$compare__column': {
      position: 'relative',
      zIndex: 1,
      boxShadow: '0 0 0 2px #2158F5, 2px 0px 2px rgba(0, 0, 0, 0.15), -2px 0 4px rgba(0, 0, 0, 0.15)',
    },
  },
  disabledPlan: {
    '& $radio': {
      borderColor: '#F2F2F2',
    },
  },
  currentPlan: {
    '& $radio': {
      borderColor: '#F2F2F2',
      '&::after': {
        display: 'block',
        backgroundColor: '#F2F2F2',
      },
    },
  },
  radio: {
    position: 'relative',
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: '2px solid rgba(0, 0, 0, 0.2)',
    marginRight: 7,
    display: 'none',

    '&::after': {
      content: '""',
      borderRadius: '50%',
      width: 10,
      height: 10,
      position: 'absolute',
      top: 3,
      right: 3,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      display: 'none',
    },

    [breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  extra: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -24,
    width: '100%',
    lineHeight: '17px',

    [breakpoints.down('md')]: {
      marginBottom: -10,
      justifyContent: 'flex-start',
    },

    '& div': {
      borderRadius: '0 0 10px 10px',
      background: '#226900',
      fontSize: '14px',
      lineHeight: '20px',
      textTransform: 'uppercase',
      padding: '2px 15px',
      color: '#FFFFFF',

      [breakpoints.down('md')]: {
        borderRadius: '0 0 4px 0',
        fontSize: '11px',
        lineHeight: '16px',
        padding: '2px 10px',
      },
    },
  },
  header: {
    padding: '52px 14px 0',

    [breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 80,
      padding: 15,
      fontSize: '16px',
      lineHeight: '16px',
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    [breakpoints.down('md')]: {
      fontSize: '16px',
      fontWeight: 700,
      width: 250,
      textAlign: 'start',
      lineHeight: '20px',
    },
    [breakpoints.down('sm')]: {
      width: 150,
    },
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2158F5',
    fontSize: '18px',
    height: 80,
    margin: '30px 0 42px',

    [breakpoints.down('md')]: {
      margin: 0,
      height: 'auto',
      fontWeight: 700,
      marginLeft: 'auto',
    },
  },
  price_discounted: {
    color: '#8E0000',
    fontSize: '16px',
    marginBottom: -20,
    height: 50,
    position: 'relative',

    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  price__strike: {
    display: 'block',
    width: '55%',
    height: 2,
    border: 0,
    backgroundColor: '#8E0000',
    position: 'absolute',
    left: 25,
    top: 17,
    transform: 'rotate(-25deg)',
  },
  currency: {
    margin: '10px 7px 0 0',
    alignSelf: 'flex-start',

    [breakpoints.down('md')]: {
      margin: 0,
      alignSelf: 'center',
    },
  },
  period: {
    padding: '0 0 2px 7px',
    whiteSpace: 'nowrap',
    alignSelf: 'flex-end',

    [breakpoints.down('md')]: {
      padding: 0,
      fontSize: '14px',
      fontWeight: 400,
      alignSelf: 'center',
    },
  },
  fractional: {
    alignSelf: 'flex-start',
    fontSize: '18px',
    width: 0,

    [breakpoints.down('md')]: {
      width: 'auto',
      alignSelf: 'center',
    },
  },
  value: {
    fontSize: 82,

    [breakpoints.down('md')]: {
      fontSize: 'inherit',
      lineHeight: 'inherit',
    },
  },
  value_discounted: {
    fontSize: 48,
  },
  switch: {
    width: 20,
    height: 20,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    marginLeft: 15,
    display: 'none',
    transition: 'transform .3s',
    outline: 'none',

    [breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  switch__arrow: {
    display: 'flex',
  },
  description: {
    padding: '19px 20px 21px',
    background: '#F2F9FF',
    transition: 'padding .3s, max-height .3s cubic-bezier(0.4, 0, 0.2, 1) 0ms',

    [breakpoints.down('md')]: {
      padding: '0 15px',
      maxHeight: 0,
    },
  },
  descriptionOpened: {
    '& $description': {
      [breakpoints.down('md')]: {
        maxHeight: 500,
        padding: 15,
      },
    },
    '& $switch': {
      transform: 'rotate(90deg)',
    },
  },
  descriptionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '&:not(:first-child)': {
      marginTop: 8,
    },
  },
  descriptionLabel: {
    borderBottom: '1px dotted #C9CED3',
  },
  descriptionValue: {
    color: '#232122',
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
  compare__root: {
    paddingTop: 20,
    backgroundColor: '#fff',
    display: 'none',

    [breakpoints.down('md')]: {
      display: 'block',
    },
  },
  compare__table: {
    display: 'flex',
    overflow: 'hidden',
    marginTop: 22,
  },
  compare__column: {
    flexGrow: 1,
    fontWeight: 700,
    outline: 'none',
    '& > div': {
      minHeight: 44,
      alignItems: 'center',
      display: 'flex',
      padding: 12,
    },
    '& $svg-icon': {
      width: 10,
      height: 10,
    },
  },
  compare__valuesWrapper: {
    overflowY: 'scroll',
    flexGrow: 1,
    padding: '2px 0',
    paddingRight: 2,
  },
  compare__values: {
    display: 'flex',
    minWidth: 320,
  },
  compare__feature: {
    zIndex: 1,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    maxWidth: '30vw',
    fontWeight: 400,
    lineHeight: '16px',
    minWidth: 160,
    padding: '2px 0',
  },
  compare__centered: {
    '& div': {
      justifyContent: 'center',
    },
  },
  compare__header: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'middle',
    border: 'none',
    borderBottom: '1px solid #F0F0F6',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#919091',
    fontWeight: 700,
    textAlign: 'center',
  },
  compare__even: {
    backgroundColor: '#FAFAFA',
  },
  compare__transFee: {
    height: '59px !important',
  },
  compare__transFeeValue: {
    flexDirection: 'column',
  },
  compare__prioritySupport: {
    height: '58px !important',
  },
  compare__radio: {
    height: '64px !important',
  },
  compare__liveBidding: {
    padding: '6px',
  },
  compare__transFeeMin: {
    whiteSpace: 'nowrap',
    fontSize: '11px',
    color: '#B3B3B3',
    fontWeight: 400,
    lineHeight: '16px',
  },
  compare__title: {
    textAlign: 'center',
    fontSize: '24px',
  },
  compare__subtitle: {
    textAlign: 'center',
    padding: '5px 10px 0',
    color: '#919090',
    fontSize: '14px',
    lineHeight: '20px',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    padding: [[0, 0, 41]],
    margin: 'auto',
    flexGrow: 1,
    flexDirection: 'column',

    [breakpoints.down('md')]: {
      display: 'none !important',
    },
  },
  tooltipTrigger: {
    textAlign: 'left',
  },
  hidden: {
    visibility: 'hidden',
  },
}));
