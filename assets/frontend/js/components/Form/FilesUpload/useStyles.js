import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  error: {
    ...mixins.font(12, 18, 400),
    color: '#8C0C0C',
    marginTop: '3px',
    textAlign: 'left',
  },
  dropArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '28px 18px 14px 18px',
    borderWidth: '1px',
    borderRadius: '4px',
    borderColor: '#2158F5',
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#333333',
    textAlign: 'center',
    [breakpoints.down('md')]: {
      paddingTop: '24px',
      paddingBottom: '16px',
    },

    '&.is-error': {
      border: '1px solid #8C0C0C',
    },
  },
  filesContainer: {
    ...mixins.scrollbar('sm'),
    overflow: 'auto',
    marginRight: '-9px',
    paddingRight: '5px',
    maxHeight: '160px',
    marginBottom: '-14px',
    marginTop: '26px',
    [breakpoints.down('sm')]: {
      maxHeight: '215px',
    },
    '& $thumb': {
      height: '22px',
      width: '30px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& $img': {
      border: 'none',
    },
    '& $fileWrap': {
      borderBottom: '1px solid #E0E0E0',
      paddingBottom: '8px',
      paddingTop: '9px',
      margin: 0,
      '&:last-child': {
        borderBottom: 'none',
      },
    },
    '& $fileName': {
      marginLeft: 9,
    },
    '& $deleteCta': {
      color: '#EB5757',
      borderBottomStyle: 'none',
    },
  },
  fileWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  thumb: {
    width: 'auto',
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 18,
  },
  img: {
    width: 'auto',
    height: '100%',
    display: 'block',
    border: '1px solid #828282',
    borderRadius: '4px',
    '&.is-pdf': {
      border: 'none',
      borderRadius: 0,
    },
  },
  fileName: {
    ...mixins.font(14, 20, 700),
    color: '#333333',
    textAlign: 'center',
    margin: '0 auto',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '260px',
  },
  deleteFile: {
    display: 'flex',
    justifyContent: 'center',
    lineHeight: '16px',
    marginBottom: '10px',
  },
  deleteCta: {
    fontSize: '12px',
    borderBottom: '1px dashed',
    '&:hover': {
      borderBottomColor: 'transparent',
    },
  },
  uploadedFiles: {
    paddingBottom: 21,
  },
  uploadedFile: {
    ...mixins.font(14, 18, 400),
    ...mixins.flex('start', 'start'),
    padding: [[4, 0]],
  },
  deleteButton: {
    ...mixins.extraHitbox(),
    padding: '0 !important',
    background: 'none !important',
    border: 'none !important',
    cursor: 'pointer !important',
    boxShadow: 'none !important',
    minHeight: 'auto !important',
    width: 'auto !important',
    marginLeft: 7,
    position: 'relative',
    top: 1,
    opacity: 0.3,

    '&:hover': {
      opacity: 1,
    },
  },
  error2: {
    ...mixins.font(14, 20, 400),
    color: '#A20000',
    marginTop: 12,
    padding: [[0, 0, 5]],
  },

  loadingPlaceholder: {
    ...mixins.flex('between', 'center'),
    color: '#FFFFFF',
    padding: [[0, 20]],
    height: 50,
    backgroundColor: '#73ADD6',
    borderRadius: 4,
  },
}));
