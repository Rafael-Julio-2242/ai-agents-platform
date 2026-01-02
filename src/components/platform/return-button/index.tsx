'use client';
import {
  RippleButton,
  RippleButtonRipples,
} from '@/components/animate-ui/components/buttons/ripple';
import { cn } from '@/lib/utils';
import { ArrowBigLeftDash } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function ReturnButton({ href, className } : { href?: string, className?: string }) {

  const { theme } = useTheme();

  const color = useMemo(() => {
    if (theme === 'dark') {
      return 'black'
    }

    return 'white'
  }, [theme]);

  const router = useRouter();

  const onClick = () => {
    if (href) {
      router.replace(href);
      return;
    }

    router.back();
  }

 return (
  <RippleButton className={cn('w-12 h-12', className)} onClick={onClick}>
    <RippleButtonRipples color={color} />
    <ArrowBigLeftDash className='scale-150' />
  </RippleButton>
 )

}

