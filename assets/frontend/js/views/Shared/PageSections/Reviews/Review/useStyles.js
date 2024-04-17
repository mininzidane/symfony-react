import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    color: '#000',
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
    marginTop: '-3px',
    marginBottom: '-2px',
  },
  ratingStars: {
    width: 60,
    paddingTop: '2px',
    paddingBottom: '3px',
  },
  ratingHint: {
    fontSize: '10px',
    lineHeight: '14px',
    color: '#B2B2B2',
    marginTop: '-2px',
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
