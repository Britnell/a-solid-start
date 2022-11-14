import { For, children, createEffect, createSignal } from "solid-js";

const Colorize = (props) => {
  const c = children(() => props.children);
  createEffect(() => {
    console.log(" updating children ");
    c().forEach((item) => (item.style.color = item.textContent));
  });
  return <>{c()}</>;
};

export default function Colors() {
  const [cols, setCols] = createSignal(["red", "blue", "green"]);
  return (
    <div>
      <h2>Colors</h2>
      <ul style={{ display: "flex", gap: "2rem", "justify-content": "center" }}>
        <Colorize>
          <For each={cols()}>{(c) => <li>{c}</li>}</For>
        </Colorize>
      </ul>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          const txt = ev.target.color.value;
          setCols([...cols(), txt]);
        }}
      >
        <input type="text" name="color" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
