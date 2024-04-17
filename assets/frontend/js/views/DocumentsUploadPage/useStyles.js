import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    paddingBottom: 45,

    [breakpoints.down('sm')]: {
      paddingBottom: 30,
    },
  },
  card: {
    padding: 14,
  },
  title: {
    ...mixins.font(28, 34, 400),
    width: '100%',
    textAlign: 'center',
    margin: 0,
    padding: [[20, 0]],

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 24, 700),
      textAlign: 'left',
    },
  },
  subtitle: {
    ...mixins.font(24, 32, 300),
    width: '100%',
    textAlign: 'center',
    margin: [[0, 0, 20]],
    color: 'rgba(0, 0, 0, .7)',

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 21, 400),
      color: '#000000',
      marginTop: 8,
    },
  },
  successDescription: {
    ...mixins.font(24, 32, 400),
    marginTop: 20,
    marginBottom: 0,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 22, 400),
      marginTop: 12,
    },
  },
  centerer: {
    maxWidth: 420,
    margin: [[0, 'auto']],
  },
  dropAreaWrap: {
    margin: [[0, 'auto']],
    padding: 14,
    paddingTop: 0,
  },
  grayBg: {
    backgroundColor: '#F6F6F6',
  },
  yellowBg: {
    backgroundColor: '#FFF1D2',
  },
  inputWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: [[14, 0]],
    maxWidth: 420,
    margin: [[0, 'auto']],

    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  invoiceDueWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 14,
  },
  inputLabel: {
    paddingTop: 12,
    width: '100%',

    [breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  input: {
    width: 160,
    position: 'relative',
    flexShrink: 0,

    [breakpoints.down('sm')]: {
      width: '100%',
      marginTop: 8,
    },

    '& input': {
      paddingLeft: 50,
      fontWeight: 700,
      color: '#333',
      fontSize: 15,
    },
  },
  description: {
    color: 'rgba(0, 0, 0, .6)',
    display: 'flex',
    alignItems: 'flex-start',
    padding: '10px 24px 0',

    [breakpoints.down('sm')]: {
      padding: '10px 0 0 0',
    },

    '& img': {
      margin: '5px 14px 0 0',
    },
  },
  error: {
    ...mixins.font(14, 20, 400),
    color: '#A20000',
    marginBottom: '12px',
  },
  orderShippingWrap: {
    marginTop: 10,
    padding: '30px 50px',
    backgroundColor: '#F6F6F6',
    display: 'flex',
    justifyContent: 'center',

    [breakpoints.down('sm')]: {
      margin: '24px 0 0',
      padding: '22px 20px 26px 20px',
    },

    '& > div': {
      maxWidth: '890px',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },

    '& h3': {
      ...mixins.font(16, 20, 700),
      display: 'flex',
      justifyContent: 'center',
      margin: 0,
    },

    '& p': {
      ...mixins.font(16, 20),
      marginTop: 20,
      textAlign: 'center',
    },
  },
  successMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  successSubtitle: {
    ...mixins.font(16, 22, 400),
    marginTop: 12,
    marginBottom: 0,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 20, 400),
    },
  },
  successState: {
    padding: [[26, 30]],
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',

    [breakpoints.down('sm')]: {
      padding: [[10, 0]],
    },
  },
  continueToBidding: {
    width: 'auto !important',
    marginTop: 20,
  },
  successIcon: {
    [breakpoints.down('sm')]: {
      width: 38,
      height: 38,
    },
  },
  receivedAmount: {
    ...mixins.font(24, 32, 700),

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 22),
    },
  },
  dollarIcon: {
    width: 38,
    height: 38,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
    position: 'absolute',
    top: 1,
    left: 1,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  invoiceDueAmount: {
    fontSize: 14,
  },
  formCard: {
    overflow: 'hidden',
  },
  vehicleCard: {
    display: 'grid',
    gridTemplateColumns: '116px 1fr',
    gridGap: 12,
    padding: [[16, 14]],

    [breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: [[3, 0]],
    fontSize: 13,

    '& strong': {
      textAlign: 'right',
    },

    '&:not(:first-child)': {
      borderTop: '1px solid #E5D9BD',
    },
  },
  vehicleCardImage: {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  submitWrap: {
    padding: [[20, 0, 8]],
    display: 'flex',
    justifyContent: 'center',

    '& button': {
      minWidth: 240,
    },
  },
  dropArea: {
    height: 200,
    padding: '14px !important',
    overflow: 'auto',
    alignItems: 'center !important',
    flexDirection: 'row !important',
    flexWrap: 'wrap',
    justifyContent: 'center',

    '& .selected-files': {
      maxWidth: 420,
    },
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
