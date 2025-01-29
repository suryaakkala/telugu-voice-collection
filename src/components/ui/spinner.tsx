import { cn } from '@/lib/utils';
import {
  LoaderCircleIcon,
  LoaderIcon,
  LoaderPinwheelIcon,
  type LucideProps,
} from 'lucide-react';

type SpinnerVariantProps = Omit<SpinnerProps, 'variant'>;

const Default = ({ className, ...props }: SpinnerVariantProps) => (
  <LoaderIcon className={cn('spin', className)} width={50} height={50} {...props} />
);

const Circle = ({ className, ...props }: SpinnerVariantProps) => (
  <LoaderCircleIcon className={cn('spin', className)} width={50} height={50} {...props} />
);

const Pinwheel = ({ className, ...props }: SpinnerVariantProps) => (
  <LoaderPinwheelIcon className={cn('spin', className)} width={50} height={50} {...props} />
);

export type SpinnerProps = LucideProps & {
  variant?: 'default' | 'circle' | 'pinwheel';
};

export const Spinner = ({ variant, ...props }: SpinnerProps) => {
  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1.1s linear infinite;
        }
      `}</style>

      {variant === 'circle' ? (
        <Circle {...props} />
      ) : variant === 'pinwheel' ? (
        <Pinwheel {...props} />
      ) : (
        <Default {...props} />
      )}
    </>
  );
};
