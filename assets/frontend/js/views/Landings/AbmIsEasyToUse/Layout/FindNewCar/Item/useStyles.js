import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    position: 'relative',

    [breakpoints.down('md')]: {
      left: 'initial !important',
      right: 'initial !important',

      '&:not(:last-child)': {
        marginBottom: 42,
      },
    },
  },
  title: {
    padding: [[9, 12]],
    fontWeight: 700,
    backgroundColor: '#fff',
  },
  table: {
    position: 'relative',
    margin: [[0, 'auto']],
    maxWidth: 290,
    border: '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    bottom: -8,

    [breakpoints.down('md')]: {
      left: 'initial !important',
      right: 'initial !important',
      width: 300,
    },

    '&::after, &::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      margin: 'auto',
      right: 0,
      left: 0,
    },
    '&::after': {
      width: 36,
      height: 36,
      top: -40,
      borderRadius: '50%',
      background:
        "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjIiIGN5PSIxOCIgcj0iMTgiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4zIiBmaWx0ZXI9InVybCgjZmlsdGVyMF9kKSIvPjxjaXJjbGUgY3g9IjIyIiBjeT0iMTciIHI9IjEzIiBmaWxsPSIjZmZmIiBmaWx0ZXI9InVybCgjZmlsdGVyMV9kKSIvPjxjaXJjbGUgY3g9IjIyIiBjeT0iMTciIHI9IjQiIGZpbGw9IiNGQjg1MDQiIGZpbHRlcj0idXJsKCNmaWx0ZXIyX2QpIi8+PGRlZnM+PGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPjxmZU9mZnNldCBkeT0iNCIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPjxmZUJsZW5kIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPjwvZmlsdGVyPjxmaWx0ZXIgaWQ9ImZpbHRlcjFfZCIgeD0iNSIgeT0iNCIgd2lkdGg9IjM0IiBoZWlnaHQ9IjM0IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz48ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz48ZmVPZmZzZXQgZHk9IjQiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDAiLz48ZmVCbGVuZCBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSJmaWx0ZXIyX2QiIHg9IjE2IiB5PSIxMiIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz48ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz48ZmVPZmZzZXQgZHk9IjEiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAuMDQ3MDU4OCAwIDAgMCAwIDAuMzY0NzA2IDAgMCAwIDAgMC43NDExNzYgMCAwIDAgMC4yNSAwIi8+PGZlQmxlbmQgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+PGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPg==') center / cover no-repeat",
    },
    '&::before': {
      borderRight: '1px dotted #FB8504',
      height: 30,
      width: 1,
      top: -30,
    },
  },
  prices: {
    padding: [[18, 12]],
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFCA52',
    borderRadius: [[0, 0, 4, 4]],
    textAlign: 'start',

    [breakpoints.down('md')]: {
      paddingLeft: 70,
    },

    '& li': {
      '&:not(:last-child)': {
        marginBottom: 9,
      },
      fontSize: '12px',
    },
  },
  priceNew: {
    paddingLeft: 4,
  },
  priceUsed: {
    paddingLeft: 4,
  },
  priceAbm: {
    paddingLeft: 6,
    fontSize: '15px',
  },
}));
