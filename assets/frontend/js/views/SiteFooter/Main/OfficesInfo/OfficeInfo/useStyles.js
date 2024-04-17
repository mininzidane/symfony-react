import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  container: {
    padding: [[22, 0]],
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E3E3E3',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 2fr',

    '@media (max-width: 1580px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',

      '& > div': {
        '&:nth-child(2)': {
          marginTop: 20,
        },

        '&:nth-child(3)': {
          marginTop: 28,
        },
      },
    },
  },
  flag: {
    width: 45,
    height: 34,
    borderRadius: 4,
    border: '1px solid #E0E0E0',

    [breakpoints.down('md')]: {
      width: 22,
      height: 'auto',
      borderRadius: 2,
    },
  },
  locationDetails: {
    fontSize: 16,
    lineHeight: '24px',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridGap: 12,
    paddingRight: 20,
    alignSelf: 'start',
  },
  locationTitle: {
    position: 'relative',
    top: -5,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    minHeight: 40,
  },
  blackText: {
    color: '#333',
  },
  contactsList: {
    '& > div:not(:first-child)': {
      marginTop: 9,
    },
  },
  locationTitleText: {
    fontWeight: 700,
    color: '#333',
    width: '100%',
  },
  openHours: {
    color: '#828282',
    marginRight: 5,
  },
}));
