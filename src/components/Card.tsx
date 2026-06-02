import React from 'react';

type CardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  leading?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children, className = '', leading }) => {
  const content = (
    <>
      {title && <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>}
      {children}
    </>
  );

  return (
    <div className={`mx-4 my-4 rounded-xl bg-card border border-border overflow-hidden shadow-sm p-6 max-w-5xl text-foreground ${className}`}>
      {leading ? (
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">{leading}</div>
          <div className="min-w-0">{content}</div>
        </div>
      ) : (
        content
      )}
    </div>
  );
};

export default Card;
