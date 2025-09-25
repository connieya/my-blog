'use client';

import { ReactNode, useState } from 'react';

export function Tooltip({ text, onClick, children }: { text: string; onClick?: () => void; children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  function handleMouseEnter() {
    setVisible(true);
  }

  function handleMouseLeave() {
    setVisible(false);
  }

  return (
    <div className='relative' onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {visible && (
        <div className='absolute bottom-[28px] left-1/2 -translate-x-1/2 transform rounded-md border border-gray-200 p-2 text-xs text-gray-400 dark:text-white'>
          {text}
        </div>
      )}
    </div>
  );
}
