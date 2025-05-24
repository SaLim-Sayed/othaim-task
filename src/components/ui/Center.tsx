import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default function Center({ children }: Props) {
  return <div className='container mx-auto px-7 md:px-2 '>{children}</div>;
}
