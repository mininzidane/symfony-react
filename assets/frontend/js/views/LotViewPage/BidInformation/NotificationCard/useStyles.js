import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    paddingTop: 6,
    paddingBottom: 14,
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '20px 1fr',
    gridGap: '10px',
  },
  card: {
    position: 'relative',
    padding: 14,
    backgroundColor: '#FFF1D2',
    color: '#333',
    borderRadius: 4,
    ...mixins.font(14, 20, 400),

    '&.is-error': {
      color: '#fff',
      backgroundColor: '#B00000',
      '& a': {
        color: 'rgb(197, 231, 255)',
      },
    },

    '&.is-success': {
      color: '#fff',
      backgroundColor: '#4A9029',

      '& a:not(.is-button)': {
        color: '#fff !important',
        textDecoration: 'underline !important',

        '&:hover': {
          textDecoration: 'none !important',
        },
      },
    },
  },
  title: {
    ...mixins.font(16, 24, 700),
    marginBottom: 9,
  },
  icon: {
    marginTop: 3,
  },
  payNow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: [[18, 0, 6]],
    marginTop: 10,
    borderTop: '1px solid #35761C',
    minWidth: 150,
  },
  payNowCta: {
    textDecoration: 'none !important',
    color: '#333 !important',
  },
}));
