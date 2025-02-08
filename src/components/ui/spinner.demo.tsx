// src/components/ui/spinner.demo.tsx
import { Spinner } from '@/components/ui/spinner';

const variants = ['default', 'circle', 'pinwheel'];

const Demo = () => (
  <div className="grid grid-cols-3 gap-8">
    {variants.map((variant) => (
      <div key={variant} className="flex flex-col items-center gap-4">
        <Spinner key={variant} variant={variant as 'default' | 'circle' | 'pinwheel'} />
        <span className="text-xs font-mono text-gray-500">{variant}</span>
      </div>
    ))}
  </div>
);

export default Demo;
