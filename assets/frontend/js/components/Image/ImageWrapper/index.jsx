import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useLazyImage from '../useLazyImage';
import useStyles from './useStyles';

function Image({
  src,
  srcset,
  alt,
  ratio,
  className,
  imgClassName,
  containerClassName,
  lazy,
  fallback,
  placeholder,
  height,
  isBlurred,
  isObserverDisabled,
}) {
  const classes = useStyles({ isBlurred });
  const ref = useRef();
  const source = src ?? '';
  const isLazy = lazy && Boolean(src);
  const gapHeight = ratio ? `${ratio}%` : height;
  const isWithoutGap = !ratio && !height;

  useLazyImage({ ref, src, srcset, isLazy, isObserverDisabled });

  useEffect(() => {
    const el = ref.current;
    if (fallback) {
      el.onerror = () => {
        el.parentElement.classList.add(classes.fallback);
      };
    }
  }, [src, srcset]);

  return (
    <div
      className={classnames(classes.root, className, {
        [classes.staticBlock]: isWithoutGap,
      })}
      style={{ paddingBottom: gapHeight }}
    >
      <div
        className={classnames(
          classes.container,
          placeholder && classes.placeholder,
          {
            [classes.staticBlock]: isWithoutGap,
          },
          containerClassName,
        )}
      >
        <img
          className={classnames(classes.img, imgClassName)}
          data-src={isLazy ? source : undefined}
          data-srcset={isLazy ? srcset : undefined}
          src={!isLazy ? source : undefined}
          srcSet={!isLazy ? srcset : undefined}
          alt={alt}
          ref={ref}
          style={{ height }}
        />
      </div>
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string,
  srcset: PropTypes.string,
  ratio: PropTypes.number,
  alt: PropTypes.string,
  className: PropTypes.string,
  imgClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  lazy: PropTypes.bool,
  fallback: PropTypes.bool,
  isBlurred: PropTypes.bool,
  placeholder: PropTypes.bool,
  isObserverDisabled: PropTypes.bool,
  height: PropTypes.string,
};

Image.defaultProps = {
  src: '',
  srcset: '',
  alt: '',
  className: '',
  imgClassName: '',
  containerClassName: '',
  lazy: false,
  fallback: false,
  isBlurred: false,
  placeholder: false,
  isObserverDisabled: false,
  height: undefined,
  ratio: undefined,
};

export default Image;
