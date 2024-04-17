import { makeStyles } from '@material-ui/core/styles';
import checkmarkSvg from 'frontend/images/shared/various/checkmark.svg';

export default makeStyles(({ breakpoints }) => ({
  root: {
    margin: [[5, 0, 20]],

    [breakpoints.down('sm')]: {
      marginTop: 8,
    },
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridGap: 0,
    alignItems: 'flex-start',
    marginTop: '4px',
    '&.is-active': {
      gridGap: 10,
    },
    '& .input-plane.is-error': {
      marginBottom: '22px',
    },
    '& .form-hint-plane': {
      position: 'absolute',
      marginTop: '-18px',
    },
  },
  remove: {
    fontSize: 14,
    color: '#2158F5',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  cta: {
    fontSize: 14,
    '& span': {
      color: '#2158F5',
    },
    '&:hover span': {
      textDecoration: 'underline',
    },
    '&:before': {
      content: "''",
      width: 22,
      height: 22,
      display: 'inline-block',
      backgroundImage: 'linear-gradient(#333,#333), linear-gradient(#333,#333)',
      backgroundSize: '50% 1px,1px 50%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'relative',
      margin: '-4px 2px -4px -4px',
      top: 2,
    },
    '&.is-input-shown': {
      '&:before': {
        backgroundImage: 'linear-gradient(#333,#333)',
      },
      '& span': {
        color: '#333',
        textDecoration: 'none',
      },
    },
  },
  successMessage: {
    color: '#333',
    display: 'inline-block',
    '&:before': {
      content: "''",
      backgroundImage: `url(${checkmarkSvg})`,
      backgroundSize: 'cover',
      display: 'inline-block',
      marginRight: '6px',
      marginBottom: '-2px',
      width: 14,
      height: 14,
    },
  },
}));
