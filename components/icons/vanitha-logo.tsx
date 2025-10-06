import Image from 'next/image';

interface VanithaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon' | 'text';
}

export function VanithaLogo({ 
  className = '', 
  size = 'md', 
  variant = 'full' 
}: VanithaLogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  if (variant === 'icon') {
    return (
      <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
        <Image
          src="/vanitha-logo.jpg"
          alt="Vanitha Fashion Jewelry"
          width={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
          height={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <span className={`font-display font-bold text-primary ${textSizeClasses[size]} ${className}`}>
        Vanitha
      </span>
    );
  }

  // Full logo (icon + text)
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <VanithaLogo variant="icon" size={size} />
      <VanithaLogo variant="text" size={size} />
    </div>
  );
}
