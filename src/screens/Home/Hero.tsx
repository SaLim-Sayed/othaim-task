import React from 'react';
import Center from '@/src/components/ui/Center';
import Title from '@/src/components/ui/Title';

export default function Hero() {
  return (
    <Center>
      <Title
        title='Welcome to our Market'
        subTitle='Shop the latest fashion trends & styles'
        exSt='text-blue-800 text-[80px]'
        exStTitle='text-blue-800 text-[40px]'
      />
    </Center>
  );
}
