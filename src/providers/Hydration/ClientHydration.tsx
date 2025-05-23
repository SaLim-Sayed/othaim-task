'use client';
import ProductSkeleton from '@/src/components/ui/Skeleton/ProductSkeleton';
import { ReactNode, useEffect, useState } from 'react';

const ClientHydration = ({
  children,
  LoaderComponent=<ProductSkeleton />,
}: {
  children: ReactNode;
  LoaderComponent?: ReactNode;
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

   useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? children : LoaderComponent}</>;
};

export default ClientHydration;
