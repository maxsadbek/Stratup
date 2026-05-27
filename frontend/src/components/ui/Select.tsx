import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  className?: string;
}

export function Select({ value, onChange, options, placeholder, label, className }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex w-full min-w-[200px] items-center justify-between gap-2 rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition',
          'border-slate-200 bg-white text-slate-900 hover:border-amber-400',
          'dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:border-amber-500',
          open && 'border-amber-500 ring-2 ring-amber-500/20',
        )}
      >
        <span className={!selected ? 'text-slate-400' : ''}>
          {selected?.label ?? placeholder ?? 'Tanlang'}
        </span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-slate-400 transition', open && 'rotate-180')}
        />
      </button>

      {open && (
        <ul
          className={cn(
            'absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-xl border py-1 shadow-lg',
            'border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800',
          )}
        >
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition',
                  opt.value === value
                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700',
                )}
              >
                {opt.label}
                {opt.value === value && <Check className="h-4 w-4 shrink-0" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
