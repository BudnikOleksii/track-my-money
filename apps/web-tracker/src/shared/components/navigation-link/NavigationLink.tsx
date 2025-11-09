'use client';

import { ComponentProps, FC } from 'react';

import { Link, usePathname } from '@/src/navigation/navigation';

export type NavigationLinkProps = ComponentProps<typeof Link>;

export const NavigationLink: FC<NavigationLinkProps> = ({ href, ...rest }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link aria-current={isActive ? 'page' : undefined} href={href} {...rest} />
  );
};
