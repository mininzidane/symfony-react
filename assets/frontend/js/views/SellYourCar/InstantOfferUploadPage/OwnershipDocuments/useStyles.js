import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 15,
  },
  title: {
    ...mixins.font(28, 39, 300),
    marginBottom: 8,
    padding: '0 14px',
    textAlign: 'center',
  },
  subtitle: {
    ...mixins.font(20, 30, 700),
    marginBottom: 22,
    padding: '0 14px',
    textAlign: 'center',
  },
  card: {
    background: '#FFFFFF',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    padding: '13px 14px 14px',
    maxWidth: 752,
    width: '100%',
  },
  vehicleInfo: {
    display: 'grid',
    gridGap: '19px',
    gridTemplateColumns: '80px auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '16px',
  },
  vehicleInfoWithoutIcon: {
    display: 'grid',
    gridGap: '19px',
    gridTemplateColumns: '1fr',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '13px',
    maxWidth: '508px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottom: '1px solid rgba(0,0,0,.1)',
  },
  icon: {
    width: '80px',
    height: '80px',
    background: 'rgba(230,236,253,.6)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    display: 'grid',
    gridTemplateColumns: 'minmax(112px, max-content) auto',
    '& > div': {
      borderTop: '1px solid rgba(0,0,0,.1)',
      padding: '4px 0',
      '&:nth-child(1),&:nth-child(2)': {
        borderTop: 'none',
      },
      '&:nth-child(even)': {
        fontWeight: 700,
        textAlign: 'right',
      },
    },
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  form: {},
  action: {
    background: '#E6ECFD',
    borderRadius: '6px',
    padding: '16px 14px',
    display: 'flex',
    flexWrap: 'wrap-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    gap: '20px',
    [breakpoints.down('md')]: {
      gap: '14px',
    },
  },
  cta: {
    minWidth: 290,
  },
  backBtn: {
    [breakpoints.down('xs')]: {
      minWidth: 290,
    },
  },

  grid: {
    display: 'grid',
    gap: '20px',
    [breakpoints.down('md')]: {
      gap: '14px',
    },
  },
  files: {
    marginTop: 6,
    marginBottom: 0,
    marginRight: 0,
    maxHeight: '150px',
  },
  filesUpload: {
    minHeight: 229,
    '&.is-document': {
      minHeight: 209,
    },
  },
  fileWrap: {
    flexDirection: 'row !important',
    width: '100%',
    '&:not(:last-child)': {
      marginBottom: '0 !important',
    },
    '& > *': {
      marginBottom: '0 !important',

      '&:nth-child(1)': {
        maxWidth: 64,
        height: 'auto',
        maxHeight: 64,
        '& img': {
          height: 'auto',
        },
      },

      '&:nth-child(2)': {
        margin: [[0, 14]],
        textAlign: 'left',
      },

      '&:nth-child(3)': {
        marginLeft: 'auto',
      },
    },
  },
  dropArea: {
    height: 229,
    padding: '14px !important',
    overflow: 'auto',
    alignItems: 'center !important',
    justifyContent: 'center',
    flexDirection: 'row !important',
    flexWrap: 'wrap',
    '&.is-document': {
      height: 209,
      '&.is-compact': {
        height: 'auto',
      },
    },
  },
}));
