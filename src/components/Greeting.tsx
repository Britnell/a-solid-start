import { mergeProps } from "solid-js";

function Greeting(props) {
  const merged = mergeProps({ greeting: "Hello", name: "Tommy" }, props);
  return (
    <h3>
      {merged.greeting} {merged.name}!
    </h3>
  );
}

export default function Greetings() {
  return (
    <div>
      <h2>Greetings!</h2>
      <Greeting />
      <Greeting name="john" />
      <Greeting greeting="Salut" />
    </div>
  );
}
