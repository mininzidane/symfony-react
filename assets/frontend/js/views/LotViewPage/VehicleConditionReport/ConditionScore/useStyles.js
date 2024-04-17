import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    border: '1px solid #DDEAD7',
    borderRadius: 6,
    position: 'relative',

    '&.average': {
      borderColor: '#E69F03',

      '&::after': {
        backgroundColor: '#E69F03',
      },
    },

    '&.belowAverage': {
      borderColor: '#F7BEBE',

      '&::after': {
        backgroundColor: '#F7BEBE',
      },
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 6,
      width: 1,
      height: '19px',
      left: '50%',
      backgroundColor: '#DDEAD7',
    },
  },
  scoreSection: {
    backgroundColor: '#EDF4EA',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: [[8, 10, 10]],
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyContent: 'center',
    textAlign: 'center',
    gridGap: 2,

    '&.average': {
      backgroundColor: '#FFF8E8',
    },

    '&.belowAverage': {
      backgroundColor: '#FDEEEE',
    },
  },
  statsSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    textAlign: 'center',
  },
  scoreTitle: {
    ...mixins.font(18, 24),
  },
  scoreStatus: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',
    textTransform: 'uppercase',
    color: '#4B9029',

    '&.average': {
      color: '#E69F03',
    },

    '&.belowAverage': {
      color: '#EB5657',
    },

    '& img': {
      marginRight: 4,
    },
  },
  stat: {
    padding: [[8, 0]],
  },
}));
