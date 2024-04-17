import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  bankName: {
    fontSize: '12px',
    marginTop: '3px',
    lineHeight: '18px',
    color: '#333',
  },
  dropArea: {
    padding: 12,
    backgroundColor: '#fff',
    minHeight: '120px',
    '& .selected-files': {
      width: '100%',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  },
  fileWrap: {
    flexDirection: 'row !important',
    width: '100%',

    '& > *': {
      marginBottom: '0 !important',

      '&:nth-child(1)': {
        height: '20px',
      },

      '&:nth-child(2)': {
        margin: [[0, 8]],
        textAlign: 'left',
        fontWeight: '400',
      },

      '&:nth-child(3)': {
        marginLeft: 'auto',
      },
    },
  },
  filesForm: {
    display: 'none',
  },
  notification: {
    ...mixins.font(12, 16),
    padding: [[8, 12]],
    marginTop: 6,
    backgroundColor: '#E6ECFD',
    borderRadius: 4,
    display: 'grid',
    alignItems: 'center',
  },
  uploadVoidedCheckNotification: {
    gridTemplateColumns: '14px 1fr',
    gridGap: 9,
  },
  uploadedSuccess: {
    gridTemplateColumns: '14px 1fr 12px',
    gridGap: 7,
  },
  clear: {
    ...mixins.extraHitbox(),
    position: 'relative',

    '&:hover': {
      opacity: 0.7,
    },
  },
}));
