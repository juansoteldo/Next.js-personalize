import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  AnimateLayoutFeature,
  AnimationFeature,
  ExitFeature,
  MotionConfig,
} from 'framer-motion';

import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';
import { ScreenSize } from '@/enums/screenSize';

import { FormElementProps, SubmitHandler } from './FormElementSM';

import YHeading from '@/components/YHeading';
import YText from '@/components/YText';
import YImage from '@/components/YImage';
import YButton from '@/components/YButton';

import useBreakpoint from '@/hooks/useBreakpoint';

interface ContactInfo {
  icon: string;
  info: string;
}

interface Props extends FormElementProps {
  title: string;
  description: string;
  buttonText: string;
  contactInfo: ContactInfo[];
  backgroundImage?: {
    filename: string;
    alt?: string;
  };
}

const ContactSection: React.FC<Props> = ({
  title,
  description,
  buttonText,
  contactInfo,
  backgroundImage,
  ...props
}) => {
  useEffect(() => {
    console.log('botton text', buttonText);
  }, []);

  const { screenSize, screenReady } = useBreakpoint();

  const [openForm, setOpenForm] = useState(false);

  const FormElement = useMemo(
    () =>
      dynamic(
        () =>
          screenSize == ScreenSize.SM
            ? import('./FormElementSM')
            : import('./FormElementLG'),
        { ssr: false }
      ) as React.FC<
        FormElementProps & {
          openForm?: boolean;
          setOpenForm?: (open: boolean) => void;
          onFormSubmit: SubmitHandler;
        }
      >,
    [screenSize]
  );

  const infoSection = (
    <>
      {' '}
      <YHeading
        fontSize={FontSize['XXL']}
        lineHeight={FontLineHeight.Relaxed}
        className="text-white mb-1 lg:mb-2 lg:leading-22 lg:text-4xl"
        as="h1"
      >
        {title}
      </YHeading>
      <YText
        fontSize={FontSize.SM}
        lineHeight={FontLineHeight.Loose}
        className="text-gray-300 mb-6 lg:mb-15 lg:text-lg lg:leading-12"
        as="p"
      >
        {description}
      </YText>
      {contactInfo.map(({ icon, info }, index) => {
        const Icon = dynamic(() => import(`@/assets/icons/${icon}.svg`));

        return (
          <div
            key={index}
            className="flex items-center h-10.5 mb-5 lg:h-13 lg:mb-8"
          >
            <div className="flex rounded-lg p-2 items-center justify-center fill-current text-white text-opacity-60 bg-white bg-opacity-15 w-10.5 h-full mr-4 lg:w-13 lg:mr-5">
              <Icon />
            </div>
            <div>
              <YText
                fontSize={FontSize.SM}
                fontWeight={FontWeight.SemiBold}
                className="text-white lg:text-base lg:leading-9"
                as="p"
              >
                {info}
              </YText>
            </div>
          </div>
        );
      })}
      <YButton
        className="mt-3 lg:hidden"
        shadow
        onPress={() => setOpenForm(true)}
      >
        {buttonText}
      </YButton>
    </>
  );

  const handleSubmit: SubmitHandler = (values) => {
    /**@TODO connect to segment */
    console.log(values);
  };

  return (
    <MotionConfig
      features={[AnimationFeature, ExitFeature, AnimateLayoutFeature]}
    >
      <section className="relative pt-30.5 pb-15 lg:pt-53.5 lg:pb-42 lg:px-23.5">
        <YImage
          className="absolute top-0 right-0 opacity-50"
          {...backgroundImage}
          width={1680}
          height={1000}
        />
        <div style={{ height: 660 }} className="relative container">
          <div className="relative w-full lg:w-109.5 lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2 z-10">
            {infoSection}
          </div>
          {screenReady && (
            <FormElement
              {...props}
              className="relative max-w-lg mx-auto lg:max-w-none lg:mx-0 lg:w-110 lg:ml-auto z-10"
              openForm={openForm}
              setOpenForm={setOpenForm}
              onFormSubmit={handleSubmit}
            />
          )}
        </div>
      </section>
    </MotionConfig>
  );
};

export default ContactSection;
