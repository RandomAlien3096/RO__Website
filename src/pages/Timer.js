import * as React from "https://cdn.skypack.dev/react@18.2.0";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@18.2.0";

const App = () => (
  <div className="app">
    <div className="container">
      <h1 className="header">Happy New Year in</h1>
      <Timer deadline="December, 31, 2022" />
    </div>
  </div>
);

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;[]

const Timer = ({ deadline = new Date().toString() }) => {
  const parsedDeadline = React.useMemo(() => Date.parse(deadline), [deadline]);
  const [time, setTime] = React.useState(parsedDeadline - Date.now());

  React.useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000
    );

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  return (
    <div className="timer">
      {Object.entries({
        Days: time / DAY,
        Hours: (time / HOUR) % 24,
        Minutes: (time / MINUTE) % 60,
        Seconds: (time / SECOND) % 60
      }).map(([label, value]) => (
        <div key={label} className="col-4">
          <div className="box">
            <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
            <span className="text">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));