import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ isWideView }) => ({
  stats: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: isWideView ? '1fr' : 'max-content',
    paddingTop: '5px',
    paddingBottom: '10px',
  },
  stat: {
    display: 'flex',
    alignItems: 'baseline',
    lineHeight: '22px',
    whiteSpace: 'nowrap',
    paddingTop: '6px',
    position: 'relative',
    justifyContent: isWideView ? 'space-between' : 'flex-start',

    '&:after': {
      content: '""',
      height: '1px',
      background: isWideView ? '#E0E0E0' : 'linear-gradient(90deg, #E0E0E0 0%, rgba(224, 224, 224, 0) 100%)',
      position: 'absolute',
      width: isWideView ? '100%' : '55%',
      top: '0',
    },

    '& > div:last-child': {
      fontWeight: 'bold',
      marginLeft: 5,
    },
  },
  priceDesc: {
    minWidth: 210,
    display: 'inline-block',
    maxWidth: '100%',
    paddingTop: 5,
    fontSize: 12,
    lineHeight: '20px',
    textTransform: 'uppercase',
    position: 'relative',
    '&:after': {
      content: '""',
      height: '1px',
      background: 'linear-gradient(90deg, #E0E0E0 0%, rgba(224, 224, 224, 0) 100%)',
      position: 'absolute',
      width: '55%',
      top: '0',
    },
  },
  total: {
    fontSize: 20,
    lineHeight: '22px',
    fontWeight: '300!important',
    color: '#333333',
    marginTop: '-3px',
  },
}));
