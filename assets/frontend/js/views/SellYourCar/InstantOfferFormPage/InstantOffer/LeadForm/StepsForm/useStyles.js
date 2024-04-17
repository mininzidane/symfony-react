import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  grid: {
    display: 'grid',
    gap: '20px',
    [breakpoints.down('md')]: {
      gap: '14px',
    },
  },
  gridGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '14px',
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  radioButton: {
    borderTop: '1px solid #E0E0E0',
    padding: 0,
    marginBottom: '0!important',
    '& label': {
      padding: [[10, 0, 9, 30]],
    },
    '& .radio-button__svg-icon': {
      top: 10,
    },
    '&:hover:not(.is-checked)': {
      backgroundColor: 'rgba(241,241,248,0.7)',
    },
    '&:first-child': {
      borderTop: 0,
    },
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
  radioGroup: {},
  radioWrap: {
    display: 'flex',
  },
  radioToggle: {
    cursor: 'pointer',
    '& .radio-button label': {
      pointerEvents: 'none',
    },
  },
  moreDetail: {
    margin: [[-5, 0, 8, 30]],
    width: 'auto',
    borderColor: '#333',

    '& textarea': {
      minHeight: 38,
    },
  },
  inputDesc: {
    fontSize: '14px',
    fontWeight: '700',
    marginTop: '7px',
    marginBottom: '-2px',
  },
  separator: {
    backgroundColor: '#C4C4C4',
    height: 1,
    position: 'relative',
    '& span': {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#fff',
      fontSize: '10px',
      lineHeight: '13px',
      color: '#999999',
      paddingLeft: '11px',
      paddingRight: '11px',
      top: '-6px',
      textTransform: 'uppercase',
    },
  },
  dropArea: {
    height: 238,
    padding: '14px !important',
    overflow: 'auto',
    alignItems: 'center !important',
    justifyContent: 'center',
    flexDirection: 'row !important',
    flexWrap: 'wrap',
    marginBottom: '-24px',
    [breakpoints.down('sm')]: {
      height: 304,
    },
  },
  files: {
    display: 'flex',
  },
  filesUpload: {
    minHeight: 106,
    marginTop: 6,
    [breakpoints.down('sm')]: {
      marginTop: 0,
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
  btnMyLocation: {
    position: 'absolute',
    right: '0',
    top: '0',
    height: '40px',
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
  },
}));
