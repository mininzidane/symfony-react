import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: ({ isHighlighted, isDark, isExternalOverlay }) => {
    let backgroundColor = '#E0E0E0';
    let afterBackgroundColor = '#F8F8F8';

    if (isHighlighted) {
      backgroundColor = '#E9E3B5';
      afterBackgroundColor = '#f7f3d9';
    }

    if (isDark) {
      backgroundColor = '#c6c6c6';
      afterBackgroundColor = '#dcdcdc';
    }

    return {
      height: 18,
      backgroundColor,
      borderRadius: 4,
      position: 'relative',
      overflow: 'hidden',

      '&::after': !isExternalOverlay
        ? {
            content: "''",
            position: 'absolute',
            top: '50%',
            marginTop: -25,
            width: 150,
            height: 150,
            animation: 'loadingContent 1.5s infinite linear',
            backgroundColor: afterBackgroundColor,
            filter: 'blur(50px)',
          }
        : null,
    };
  },
}));
