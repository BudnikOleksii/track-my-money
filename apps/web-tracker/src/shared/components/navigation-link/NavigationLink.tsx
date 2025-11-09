'use client';

import { ComponentProps, FC } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

import { Link } from '@/src/navigation/navigation';

export type NavigationLinkProps = ComponentProps<typeof Link>;

export const NavigationLink: FC<NavigationLinkProps> = ({ href, ...rest }) => {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <Link aria-current={isActive ? 'page' : undefined} href={href} {...rest} />
  );
};
