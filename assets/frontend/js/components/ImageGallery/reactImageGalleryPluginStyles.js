/* eslint-disable no-dupe-keys */
export default {
  '@global': {
    '.image-gallery-using-mouse .image-gallery-icon:focus': {
      outline: 'none',
    },
    '.image-gallery': {
      userSelect: 'none',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
      position: 'relative',
    },
    '.image-gallery-content': {
      position: 'relative',
      lineHeight: '0',
      top: '0',
    },
    '.image-gallery-content .image-gallery-slide .image-gallery-image': {
      maxHeight: 'calc(100vh - 80px)',
    },
    '.image-gallery-content.left .image-gallery-slide .image-gallery-image, .image-gallery-content.right .image-gallery-slide .image-gallery-image':
      {
        maxHeight: '100vh',
      },
    '.image-gallery-slide-wrapper': {
      position: 'relative',
    },
    '.image-gallery-slide-wrapper.left, .image-gallery-slide-wrapper.right': {
      display: 'inline-block',
      width: 'calc(100% - 110px)',
    },
    '.image-gallery-slide-wrapper.image-gallery-rtl': {
      direction: 'rtl',
    },
    '.image-gallery-slides': {
      lineHeight: '0',
      overflow: 'hidden',
      position: 'relative',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
    '.image-gallery-slide': {
      left: '0',
      position: 'absolute',
      top: '0',
      width: '100%',
      outline: 'none',
    },
    '.image-gallery-slide.center': {
      position: 'relative',
    },
    '.image-gallery-slide .image-gallery-image': {
      width: '100%',
      objectFit: 'contain',
    },
    '.image-gallery-thumbnails-wrapper': {
      position: 'relative',
    },
    '.image-gallery-thumbnails-wrapper.thumbnails-wrapper-rtl': {
      direction: 'rtl',
    },
    '.image-gallery-thumbnails-wrapper.left, .image-gallery-thumbnails-wrapper.right': {
      display: 'inline-block',
      verticalAlign: 'top',
      width: '100px',
    },
    '.image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails, .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails':
      {
        height: '100%',
        width: '100%',
        left: '0',
        padding: '0',
        position: 'absolute',
        top: '0',
      },
    '.image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails .image-gallery-thumbnail, .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails .image-gallery-thumbnail':
      {
        display: 'block',
        marginRight: '0',
        padding: '0',
      },
    '.image-gallery-thumbnails-wrapper.left, .image-gallery-thumbnails-wrapper.right': {
      margin: '0 5px',
    },
    '.image-gallery-thumbnails': {
      overflow: 'hidden',
      paddingTop: '8px',
    },
    '.image-gallery-thumbnails .image-gallery-thumbnails-container': {
      display: 'grid',
      gridAutoFlow: 'column',
      gridGap: '8px',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'transform 0.45s ease-out',
      whiteSpace: 'nowrap',
    },
    '.image-gallery-thumbnail': {
      display: 'inline-block',
      transition: 'border 0.3s ease-out, opacity 0.15s ease',
      width: '85px',
      background: 'transparent',
      padding: '0',
      position: 'relative',
    },
    '.image-gallery-thumbnail .image-gallery-thumbnail-inner': {
      position: 'relative',
    },
    '.image-gallery-thumbnail .image-gallery-thumbnail-image': {
      verticalAlign: 'middle',
      width: '100%',
      lineHeight: '0',
    },
    '.image-gallery-thumbnail:hover': {
      opacity: '0.85',
    },
    '.image-gallery-thumbnail.active::after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      border: '3px solid #2158F5',
      pointerEvents: 'none',
      zIndex: '3',
    },
  },
};
