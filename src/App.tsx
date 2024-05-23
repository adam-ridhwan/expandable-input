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
      <button
        type='button'
        className='button button--search'
        onClick={handleExpand}
      >
        <SearchIcon className='icon icon--search' />
      </button>

      <div className={`container ${isExpanded ? 'expanded' : ''}`}>
        <input
          ref={inputRef}
          type='text'
          value={query}
          placeholder='Search...'
          onChange={(e) => handleInput(e)}
          disabled={!isExpanded}
          className='input'
        />

        <button
          type='button'
          className={`button button--clear ${query.length < 1 ? 'hidden' : ''}`}
          onClick={handleClear}
          disabled={!isExpanded}
        >
          <X className='icon icon--clear' />
        </button>
      </div>
    </div>
  );
}

export default App;
