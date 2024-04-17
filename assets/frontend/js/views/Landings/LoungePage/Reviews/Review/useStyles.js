import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    color: '#000',
    padding: 20,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: 6,
  },
  details: {
    display: 'flex',
    alignItems: 'flex-start',
    [breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  info: {},
  photo: {
    marginRight: '12px',
    borderRadius: '50%',
    overflow: 'hidden',
    '& > img': {
      display: 'block',
    },
  },
  name: {
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: '600',
  },
  ratingStars: {
    width: 60,
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  ratingHint: {
    fontSize: '12px',
    lineHeight: '16px',
    color: '#4F4F4F',
    marginTop: 2,
  },
  message: {
    fontSize: '16px',
    lineHeight: '24px',
    marginTop: '15px',
    marginBottom: 0,
    [breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}));
