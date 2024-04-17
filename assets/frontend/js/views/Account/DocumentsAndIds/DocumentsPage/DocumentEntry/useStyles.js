import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'min-content 1fr min-content',
    alignItems: 'start',
    gridGap: 15,
    padding: 15,
    borderRadius: 2,
    boxShadow: 'inset 0 0 0 1px #E4E4E4',

    '&.is-default': {
      backgroundColor: '#FFFFFF',
    },

    '&.is-highlighted': {
      backgroundColor: '#F7EFC9',
    },

    '&:not(:first-child)': {
      marginTop: 2,
    },
  },
  imageContainer: {
    width: 44,
    height: 44,

    '& > img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
  },
  iconContainer: {
    ...mixins.flex('center', 'center'),
    width: 44,
    height: 44,
  },
  documentDescription: {
    fontSize: 14,
    lineHeight: '20px',
  },
  viewLinkWrap: {
    marginTop: 2,
    color: '#8D8D8D',
  },
  action: ({ isMobileActionFullWidth }) => ({
    alignSelf: 'center',

    [breakpoints.down('xs')]: {
      gridRow: isMobileActionFullWidth ? '2' : null,
      gridColumn: isMobileActionFullWidth ? '1/3' : null,
    },
  }),
}));
