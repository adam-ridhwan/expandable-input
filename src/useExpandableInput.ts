import { ChangeEvent, RefObject, useRef, useState } from 'react';
import { useClickOutside } from './useClickOutside.ts';
import { useKeyCollapse } from './useKeyCollapse.ts';

type UseExpandableInputReturn = {
  state: {
    query: string;
    isExpanded: boolean;
  };
  refs: {
    wrapperRef: RefObject<HTMLDivElement>;
    inputRef: RefObject<HTMLInputElement>;
  };
  actions: {
    handleExpand: () => void;
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
    handleClear: () => void;
  };
};

export const useExpandableInput = (): UseExpandableInputReturn => {
  const [query, setQuery] = useState('');

  const [isExpanded, setIsExpanded] = useState(false);

  const wrapperRef = useClickOutside<HTMLDivElement>(() => {
    setIsExpanded(false);
    setQuery('');
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useKeyCollapse(() => {
    if (!isExpanded) return;
    setIsExpanded(false);
    setQuery('');
  });

  const handleExpand = () => {
    setIsExpanded(!isExpanded);

    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      inputRef.current?.blur();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return {
    state: {
      query,
      isExpanded,
    },
    refs: {
      wrapperRef,
      inputRef,
    },
    actions: {
      handleExpand,
      handleInput,
      handleClear,
    },
  };
};
