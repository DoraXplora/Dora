'use client';

import { CheckCircle, Copy, XCircle } from 'lucide-react';
import { ReactNode, useState } from 'react';

type CopyState = 'copy' | 'copied' | 'errored';

export function Copyable({
  text,
  children,
  replaceText,
}: {
  text: string;
  children: ReactNode;
  replaceText?: boolean;
}) {
  const [state, setState] = useState<CopyState>('copy');

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch (err) {
      setState('errored');
    }
    setTimeout(() => setState('copy'), 1000);
  };

  function CopyIcon() {
    if (state === 'copy') {
      return (
        <Copy className="cursor-pointer" onClick={handleClick} size={13} />
      );
    } else if (state === 'copied') {
      return <CheckCircle size={13} />;
    } else if (state === 'errored') {
      return (
        <span title="Please check your browser's copy permissions.">
          <XCircle size={13} />
        </span>
      );
    }
    return null;
  }

  let message: string | undefined;
  let textColor = '';
  if (state === 'copied') {
    message = 'Copied';
    textColor = 'text-info';
  } else if (state === 'errored') {
    message = 'Copy Failed';
    textColor = 'text-danger';
  }

  function AppendCopyIcon() {
    return (
      <span className="flex items-center gap-1">
        {children}
        <span className="text-xs me-2">
          <span className={textColor}>
            {message !== undefined && <span className="me-2">{message}</span>}
            <CopyIcon />
          </span>
        </span>
      </span>
    );
  }

  function ReplaceWithMessage() {
    return (
      <span className="flex flex-nowrap">
        <span className="text-xs">
          <span className={textColor}>
            <CopyIcon />
            <span className="ms-2">{message}</span>
          </span>
        </span>
        <span className="sr-only">{children}</span>
      </span>
    );
  }

  if (state === 'copy') {
    return <AppendCopyIcon />;
  } else if (replaceText) {
    return <ReplaceWithMessage />;
  }

  return (
    <>
      <ReplaceWithMessage />
      <AppendCopyIcon />
    </>
  );
}
