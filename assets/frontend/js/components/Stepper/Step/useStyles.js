import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  active: {
    '& > $dot': {
      background: '#2158F5',
      fontWeight: 'bold',

      '&:before': {
        content: "''",
        display: 'block',
        background: '#2158F5',
        opacity: 0.2,
        width: 36,
        height: 36,
        borderRadius: '50%',
        zIndex: -1,
        ...mixins.centered(),
      },
    },

    '& > $label': {
      fontWeight: 'bold',
    },

    '& > $connector': {
      background: '#2158F5',
    },
  },
  completed: {
    '& > $dot': {
      background: '#2158F5',
      fontWeight: 'bold',
    },

    '& > $connector': {
      background: '#2158F5',
    },
  },
  dot: {
    display: 'inline-block',
    position: 'relative',
    zIndex: 1,
    background: '#BDBDBD',
    color: '#fff',
    width: 18,
    height: 18,
    borderRadius: '50%',
    textAlign: 'center',
    ...mixins.font(12, 18),
  },
  label: {
    marginTop: 12,
    color: '#333333',
    ...mixins.font(12, 16),
    overflowWrap: 'anywhere',
  },
  connector: ({ total, index }) => {
    const width = 100 / (total - 1);
    const left = width * (index - 1);

    return {
      height: 1,
      background: '#BDBDBD',
      position: 'absolute',
      width: `${width}%`,
      left: `${left}%`,
      top: 9,
    };
  },
}));
