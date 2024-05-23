import { SearchIcon, X } from 'lucide-react';
import './App.css';
import { useExpandableInput } from './useExpandableInput.ts';

function App() {
  const {
    state: { query, isExpanded },
    refs: { wrapperRef, inputRef },
    actions: { handleExpand, handleInput, handleClear },
  } = useExpandableInput();

  return (
    <div ref={wrapperRef} className='wrapper'>
      <button type='button' className='search-button' onClick={handleExpand}>
        <SearchIcon className='search-icon' />
      </button>

      <div className={`container ${isExpanded ? 'expanded' : ''}`}>
        <input
          ref={inputRef}
          type='text'
          value={query}
          onChange={(e) => handleInput(e)}
          disabled={!isExpanded}
          className='query-input'
        />

        <button
          type='button'
          className={`clear-button ${query.length < 1 ? 'hidden' : ''}`}
          onClick={handleClear}
          disabled={!isExpanded}
        >
          <X className='clear-icon' />
        </button>
      </div>
    </div>
  );
}

export default App;
