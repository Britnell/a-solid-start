import { createSignal, For, Index } from "solid-js";
import { Time } from "./Counter";

export default function Flow() {
  const [list, setList] = createSignal("abcdefghijlkmnop".split(""));

  return (
    <div>
      <h2>FLOW</h2>
      <div>
        <button
          onclick={() => {
            const _list = [...list()];
            const a = _list.shift();
            _list.push(a);
            setList(_list);
          }}
        >
          Shuffle
        </button>
        <button
          onclick={() => {
            const _list = [...list()];
            const r = Math.floor(Math.random() * _list.length);
            _list[r] = `${Math.random() % 10}`;
            setList(_list);
          }}
        >
          Ran
        </button>
      </div>
      <ul style={{ display: "flex", gap: "2rem", "flex-flow": "wrap" }}>
        {/* a keyed for list - index is signal - items do not rerun, only first time.
         if list changes changes order the index is updated, but the function 
         is not re-run */}
        <For each={list()}>
          {(li, i) => (
            <li data-id={li}>
              {console.log(" FOR list render : ", li)}
              {i()} - {li}
              {/* on shuffle - Li does not re-render - only index is reactively updated */}
              {/* On random - only updated list re-renders */}
            </li>
          )}
        </For>
      </ul>
      <ul style={{ display: "flex", gap: "2rem", "flex-flow": "wrap" }}>
        <Index each={list()}>
          {(li, i) => (
            <li data-id={i}>
              {console.log(" INDEX list render : ", i)}
              {i} - {li()}
              {/* on shuffle - Li does not re-render - text is reactively updated */}
              {/* On random - it does not re-render as the text is reactively up */}
            </li>
          )}
        </Index>
      </ul>
    </div>
  );
}
