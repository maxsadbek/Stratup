import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', {
  variants: {
    variant: {
      success: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30',
      warning: 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30',
      pending: 'bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30',
      default: 'bg-white/10 text-slate-300',
    },
  },
  defaultVariants: { variant: 'default' },
});

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
