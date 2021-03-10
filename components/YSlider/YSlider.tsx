import React, { useState, useRef } from 'react';
import { AnimatePresence, m as motion, MotionProps } from 'framer-motion';

import { ArrowType } from '@/enums/components';

import filterPosition from '@/libs/utils/filterPosition';

import YAnimateItem from '@/components/AnimateComponents/YAnimateItem';
import YArrowButton from '@/components/YArrowButton';

interface ScrollProps {
  className?: string;
  showMoreLabel?: string;
}

export const YSlider: React.FC<ScrollProps> = ({
  className,
  children,
  showMoreLabel,
}) => {
  const [position, setPosition] = useState<'left' | 'right'>('left');

  const sliderContainer = useRef<HTMLDivElement>(null);
  const diff =
    sliderContainer.current?.scrollWidth - sliderContainer.current?.clientWidth;

  const motionProps = {
    animate: position,
    variants: {
      left: {
        x: 0,
      },
      right: {
        x: -diff || 0,
      },
    },
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  } as MotionProps;

  const arrowClasses = ['absolute', 'transform', 'top-1/2', '-translate-y-1/2'];

  return (
    <AnimatePresence>
      <YAnimateItem className={filterPosition([], className)}>
        <motion.div {...motionProps} ref={sliderContainer}>
          {children}
        </motion.div>
        <AnimatePresence exitBeforeEnter>
          {position == 'left' ? (
            <YArrowButton
              key="arrow-right"
              onClick={() => setPosition('right')}
              className={[...arrowClasses, 'right-12.5'].join(' ')}
              showMore={showMoreLabel}
            />
          ) : (
            <YArrowButton
              key="arrow-left"
              type={ArrowType.Left}
              onClick={() => setPosition('left')}
              className={[...arrowClasses, 'left-12.5'].join(' ')}
            />
          )}
        </AnimatePresence>
      </YAnimateItem>
    </AnimatePresence>
  );
};

export default YSlider;
