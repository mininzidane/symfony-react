import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  grid: {
    display: 'grid',
    gap: '20px',

    [breakpoints.down('md')]: {
      gap: '14px',
    },
  },
  gridGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',

    [breakpoints.down('md')]: {
      gap: '14px',
      gridTemplateColumns: '1fr',
    },
  },
  label: {
    ...mixins.font(14, 20, 700),
  },
  radio: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'start',
    gridGap: '20px',
    padding: [[8, 0, 14]],

    '& > *': {
      marginBottom: '0 !important',

      '& label': {
        paddingLeft: 26,
      },
    },
  },
  textarea: {
    minHeight: 84,
    marginTop: 14,
  },
  dropArea: {
    height: 106,
    padding: '14px !important',
    overflow: 'auto',
    alignItems: 'center !important',
    flexDirection: 'row !important',
    flexWrap: 'wrap',
  },
  filesUpload: {
    minHeight: 106,
    marginTop: 14,
  },
  fileWrap: {
    flexDirection: 'row !important',
    width: '100%',

    '& > *': {
      marginBottom: '0 !important',

      '&:nth-child(1)': {
        maxWidth: 64,
        height: 'auto',
      },

      '&:nth-child(2)': {
        margin: [[0, 14]],
        textAlign: 'left',
      },

      '&:nth-child(3)': {
        marginLeft: 'auto',
      },
    },

    '&:not(:last-child)': {
      marginBottom: 14,
    },
  },
}));
