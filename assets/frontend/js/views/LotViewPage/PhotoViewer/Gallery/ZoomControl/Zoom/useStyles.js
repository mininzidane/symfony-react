import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '& $result': {
      opacity: 0,
    },

    '& $lens': {
      opacity: 0,
    },
  },
  visible: {
    '& $result': {
      opacity: 1,
    },

    '& $lens': {
      opacity: 1,
    },
  },
  result: {
    position: 'absolute',
    left: '100%',
    top: 0,
    opacity: 0,
    pointerEvents: 'none',
    marginLeft: 20,
    border: '2px solid #2158F5',
    overflow: 'hidden',
    zIndex: 99999,
    transition: 'opacity .4s ease',

    '& img': {
      maxWidth: 'none',
    },
  },
  lens: {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 1,
    backgroundImage:
      'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAABoAQMAAAAUxfquAAAABlBMVEUAAAAwi8zLqZNEAAAAAnRSTlMA4NaZL0AAAAAgSURBVHgBY8ACVqGDhsGgalTVqKpRVaOqRlWNqhpVBQAEqGUnupBbyQAAAABJRU5ErkJggg==)',
    backgroundSize: 'cover',
    transition: 'opacity .4s ease',
  },
}));
