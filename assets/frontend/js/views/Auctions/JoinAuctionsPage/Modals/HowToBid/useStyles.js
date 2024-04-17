import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  description: {
    fontSize: 20,
    lineHeight: '27px',
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 20,

    [breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '20px',
      marginBottom: 15,
    },
  },
  step1Image: {
    left: -5,
  },
  step2Image: {
    top: -8,
    left: 27,
  },
  step3Image: {
    paddingTop: 27,
    left: '4.2%',
    width: '88%',
    margin: '0 auto',
    position: 'relative',
    marginBottom: 16,
  },
  grid: {
    [breakpoints.down('sm')]: {
      '& .MuiGrid-item': {
        padding: 1,

        '&:last-child': {
          marginBottom: 5,
        },
      },
    },
  },
  footer: {
    padding: [[14, 10]],
    textAlign: 'center',
    width: '100%',

    [breakpoints.down('sm')]: {
      padding: [[6, 0, 5]],
    },
  },
  confirmButton: {
    marginTop: 15,
    width: '100% !important',
    maxWidth: 390,
  },
}));
