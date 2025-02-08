const Label = ({ htmlFor, children, className }: { htmlFor: string; children: React.ReactNode; className?: string }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-white ${className}`}>
      {children}
    </label>
  );
  
  export default Label;
  