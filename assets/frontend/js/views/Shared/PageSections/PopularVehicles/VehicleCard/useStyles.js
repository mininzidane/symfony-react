import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'block',
    textDecoration: 'none !important',
    minWidth: 0,

    '&:hover $title': {
      textDecoration: 'underline !important',
    },
    '@media (max-width: 1440px)': {
      '&.is-big': {
        gridColumn: '1/3',
        gridRow: '1/3',
        '& $desc': {
          padding: [[11, 20]],
          minHeight: 66,
        },
        '& $title': {
          fontSize: 16,
          lineHeight: '22px',
        },
        '& $location': {
          fontSize: 16,
          lineHeight: '22px',
        },
        '& $labels': {
          width: 'auto',
          padding: [[11, 20]],
          fontSize: 16,
          lineHeight: '16px',
        },
        '& $timeIcon': {
          maxWidth: 14,
          maxHeight: 14,
        },
      },
    },
  },
  card: {
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#C4C4C4',
    paddingBottom: '75%',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: 'cover',
    height: '100%',
  },
  desc: {
    padding: [[11, 14]],
    backgroundColor: '#FFF',
    minHeight: 58,
  },
  title: {
    ...mixins.textEllipsis(),
    fontSize: 14,
    lineHeight: '18px',
    fontWeight: 400,
    color: '#2158F5 !important',
    textDecoration: 'none !important',
  },
  location: {
    ...mixins.textEllipsis(),
    fontSize: 12,
    lineHeight: '18px',
    fontWeight: 400,
    color: '#4F4F4F',
    textDecoration: 'none !important',
  },
  labels: {
    display: 'flex',
    backgroundColor: '#F1B227',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: [[5, 14]],
    color: '#333333',
    fontSize: 12,
    lineHeight: '14px',
    fontWeight: '700',

    '& span.is-normal': {
      fontWeight: 400,
    },

    '& > div:nth-child(2)': {
      borderLeft: '1px solid #A8812C',
      paddingLeft: 9,
      marginLeft: 9,
    },
  },
  highBid: {
    '& span': {
      fontWeight: 400,
    },
  },
  date: {
    display: 'flex',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: 6,
    maxWidth: 12,
    maxHeight: 12,
  },
}));
