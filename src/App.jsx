import { useState, useEffect, useRef } from 'react';

function App() {
  const [input, setInput] = useState('help');
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      let output = '';
      switch (command) {
        case 'help':
          output =
            'Available commands: whoami, skills, contact, help, clear';
          break;
        case 'whoami':
          output =
            'LORENZO PASQUALINI is a front-end software engineer, with a focus on accessibility and web performance.';
          break;
        case 'skills':
          output =
            'His technical skills include JAVASCRIPT / HTML / CSS / REACT / AEM. For more information write CONTACT in the terminal';
          break;
        case 'contact':
          output =
            'You can reach him directly by writing an e-mail to LORENZOPASQUALINI@ICLOUD.COM';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          output = `command not found: ${input}`;
      }

      setHistory([...history, { command: input, output }]);
      setInput('');
    }
  };

  return (
    <main className="terminal" onClick={() => inputRef.current.focus()}>
      {history.map((entry, index) => (
        <div key={index}>
          <div>&gt; {entry.command}</div>
          <div>{entry.output}</div>
        </div>
      ))}
      <div className="terminal-input">
        <aside>&gt; </aside>
        <input
          name='Console input'
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </main>
  );
}

export default App;