import { useState } from 'react';

function useInput(initialValue = '') {
  const [val, setVal] = useState(initialValue);

  const handleChange = (e) => {
    setVal(e.target.value);
  };

  const reset = () => {
    setVal('');
  };

  return [val, handleChange, reset];
}

export default useInput;
