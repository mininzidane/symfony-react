import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isMobileView, isLegacyView }) => ({
  root: () =>
    isLegacyView
      ? {
          borderBottom: '1px solid #D6D4BD',
          marginBottom: '10px',
          paddingBottom: '6px',
          paddingTop: '4px',
        }
      : {},
  row: () =>
    isLegacyView
      ? {
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: [[2, 0, 10]],
          fontSize: '18px',

          '& label': {
            fontSize: 18,
            lineHeight: '20px',
            [breakpoints.down('sm')]: {
              fontSize: 14,
            },
          },
          [breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            fontSize: '14px',
          },
        }
      : {
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          fontSize: 14,
          lineHeight: '20px',
          paddingBottom: 6,
          paddingTop: 6,
          borderTop: '1px solid #E0DDC4',
          [breakpoints.down('sm')]: {
            flexWrap: 'wrap',
          },
        },
  toggle: {
    display: 'flex',
  },
  tooltipWrap: {
    whiteSpace: 'nowrap',
  },
  tooltipTrigger: {
    position: 'relative',
    top: -1,
  },
  label: {
    display: 'flex',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    color: '#333',
    [breakpoints.down('sm')]: {
      maxWidth: '70%',
    },
  },
  tickbox: {
    '& label': {
      fontSize: 14,
      lineHeight: '20px',
      color: '#333',
    },
  },
  radioButton: {
    '& label': {
      fontSize: 14,
      lineHeight: '20px',
      color: '#333',
    },
  },
  input: {
    maxWidth: '125px',
    marginTop: '-10px',
    marginBottom: '-12px',
    [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
      maxWidth: '100%',
      width: '100%',
      marginTop: '8px',
      marginBottom: '0px',
    },
  },
  value: {
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
    paddingLeft: '15px',
    color: '#333',
    ...(isLegacyView ? { marginTop: '-2px', marginBottom: '-2px' } : {}),
  },
}));
