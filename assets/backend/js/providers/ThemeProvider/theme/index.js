import { createTheme } from '@material-ui/core/styles';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import mixins from './mixins';

const theme = createTheme({
  isRtl: ViewportService.isRtl(),
  direction: ViewportService.getDir(),
  breakpoints: {
    values: {
      xl: 1200,
      lg: 992,
      md: 768,
      sm: 480,
      xs: 0,
    },
  },
  typography: {
    fontFamily: ['"Segoe UI"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#017DD6',
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: '#017DD6',

        '&:hover': {
          backgroundColor: '#017DD6',
        },
      },
      current: {
        color: '#017DD6',
      },
    },
    MuiPickersYear: {
      yearSelected: {
        color: '#017DD6',
      },
    },
    MuiAlert: {
      standardError: {
        color: '#FFFFFF',
        backgroundColor: '#6F130B',
      },
    },
  },
  mixins,
});

export default theme;
