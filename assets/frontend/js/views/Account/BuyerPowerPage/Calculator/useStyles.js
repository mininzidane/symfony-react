import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#ffffff',
    border: '1px solid #E0E0E0',
    borderRadius: 4,
    alignSelf: 'flex-start',

    '&.is-disabled': {
      pointerEvents: 'none',
    },
  },
  caption: {
    ...mixins.font(24, 32, 400),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'left',

    [breakpoints.down('sm')]: {
      paddingTop: 5,
      justifyContent: 'space-between',
      ...mixins.font(18, 24),
    },
  },
  sliderContainer: {
    padding: [[20, 24]],

    [breakpoints.down('sm')]: {
      padding: [[8, 14, 20]],
    },
  },
  sliderWrap: {
    paddingTop: 38,

    [breakpoints.down('sm')]: {
      paddingTop: 36,
    },
  },
  sliderBarWrap: {
    position: 'relative',
    padding: [[0, 4]],
  },
  sliderCorner: {
    position: 'absolute',
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: '50%',
  },
  sliderLeftCorner: {
    left: 1,
  },
  sliderRightCorner: {
    right: 1,
  },
  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    lineHeight: '20px',
    color: '#BDBDBD',
    padding: [[4, 2, 0]],
  },
  sliderSteps: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 8,

    '& span': {
      width: 1,
      height: 4,
      backgroundColor: '#C4C4C4',
    },
  },
  vehicles: {
    flexWrap: 'wrap',
    fontSize: 14,
    lineHeight: '20px',
  },
  formContainer: {},
  inputContainer: {
    width: '100%',
  },
  inputCaption: {
    fontSize: 14,
    lineHeight: '20px',
  },
  inputWrap: {
    marginTop: 8,
  },
  ctaContainer: {
    margin: [[20, -15, -11]],
    padding: [[16, 16, 24]],
    backgroundColor: '#E6ECFD',

    [breakpoints.down('sm')]: {
      margin: [[15, -10, -16]],
      padding: [[16, 14]],
    },
  },
  summaryTotalRow: {
    fontSize: 14,
    lineHeight: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    paddingTop: 8,
    marginTop: 8,
    borderTop: '1px solid #B8CBE3',
  },
  summaryRow: {
    fontSize: 14,
    lineHeight: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',

    '&:not(:first-child)': {
      marginTop: 5,
    },
  },
  cta: {
    marginTop: 10,

    '&.is-disabled': {
      backgroundColor: '#BFBFBF !important',
      color: '#999999 !important',
      pointerEvents: 'none !important',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 20,
    marginTop: 15,

    [breakpoints.down('sm')]: {
      marginTop: 8,
    },
  },
}));
