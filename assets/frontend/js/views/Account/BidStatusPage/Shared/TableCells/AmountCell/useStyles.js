import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    paddingLeft: ({ hasPaddingLeft }) => (hasPaddingLeft ? 14 : null),

    '& strong': {
      fontWeight: ({ isFontWeightNormal }) => (isFontWeightNormal ? '400 !important' : null),
    },
  },
}));
