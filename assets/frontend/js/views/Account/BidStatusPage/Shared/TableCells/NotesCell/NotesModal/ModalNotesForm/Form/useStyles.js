import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    overflow: 'hidden',
  },
  textarea: {
    minHeight: 64,
    cursor: 'text',
    '& textarea': {
      minHeight: 40,
      maxHeight: 134,
      [breakpoints.down('sm')]: {
        maxHeight: 'calc(100vh - 256px)', // 42px (header) + 120px (min body height) + 46px (files) + 48px (buttons)
      },
    },
    '&.is-drag-active': {
      borderColor: 'transparent!important',
      '&:after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'rgba(33,88,245,.15)',
        top: '0',
        left: '0',
        border: '2px dashed #2158F5',
        borderRadius: '4px',
      },
    },
  },
  message: {
    marginBottom: 11,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: '-8px',
    padding: '4px',
  },
  cta: {
    minWidth: '149px',
    margin: '4px',
    [breakpoints.down('xs')]: {
      flexGrow: 1,
    },
  },
  ctaLabel: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateColumns: 'max-content auto',
    gridGap: '5px',
  },
  ctaSendIcon: {
    marginLeft: '-4px',
  },
}));
