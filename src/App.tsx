import React, { useState, useEffect, useRef} from "react";
import "./App.css";



/* Komponentenfunktion + State-Hooks
  React State Hook - Mechanismus zum separaten tracken der States aller Komponenten der App
  der State Componente wird bei jedem Aufruf der renderFunc neu gerendert = neu aufgebaut und auf Screen aktualisiert
  Es vergleicht den neuen mit dem alten DOM und aktualisiert nur die Unterschiede im Browser (das nennt sich Reconciliation)
  const [nameComp, renderFunc] = useState(initStateVal);
  */
const App: React.FC = () => {
  const [input, setInput] = useState(""); // Calculator Anzeige
  const [result, setResult] = useState("0"); // Ergebnis nach "="

  // Handler- & Hilfsfunktionen (const funcs)
  const handleButtonClick = (value: string) => {
    setInput((prev) => (prev === "0" ? value : prev + value));
  };

  const handleClear = () => {
    setInput("");
    setResult("0");
  };

  const handleEquals = () => {
    try {
      const result = eval(inputRef.current);
      setResult(result.toString());
    } catch {  
      setResult("Fehler");
    }
  };


  const inputRef = useRef(input);

  useEffect(() => {
  inputRef.current = input;
  }, [input]);

  /* Event-Handler
    useEffect - für Tastatur-Events:
    Der Eventlistener wird einmalig beim Start registriert
    Beim Verlassen aut. entfert -> sauberer Code
    */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (/^[0-9+\-*/.]$/.test(key)) {
        setInput((prev) => (prev === "0" ? key : prev + key));
      } else if ((key === "Enter" || key === "=") && inputRef.current.trim() !== "") {
        handleEquals();
      } else if (key.toLowerCase() === "c" || key === "Backspace")  {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); 

  

  //  Konstanten für Button-Listen (const items)
  const buttons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "="];

  /* JSX-Return
   div className = eine Klasse die CSS-Regeln zur Formatierung erhält
  */
  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>

      <div className="buttons">
        <div className="numpad">
          {buttons.map((char) => (
            <button
              key={char}
              className={char === "=" ? "equalsOperator" : ""}
              onClick={
                char === "=" ? handleEquals : () => handleButtonClick(char)
              }
            >
              {char}
            </button>
          ))}
        </div>

        <div className="operators">
          {["+", "-", "*", "/"].map((op) => (
            <button key={op} onClick={() => handleButtonClick(op)}>
              {op}
            </button>
          ))}
          <button onClick={handleClear}>C</button>
        </div>
      </div>
    </div>
  );
};

export default App;
