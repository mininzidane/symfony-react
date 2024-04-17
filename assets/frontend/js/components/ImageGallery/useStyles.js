import { makeStyles } from '@material-ui/core/styles';
import reactImageGalleryPluginStyles from './reactImageGalleryPluginStyles';

export default makeStyles(() => ({
  ...reactImageGalleryPluginStyles,

  root: {
    position: 'relative',
  },
}));
