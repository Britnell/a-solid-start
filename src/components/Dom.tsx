import { createEffect, createSignal, onCleanup } from "solid-js";
import styles from "./Style.module.css";

export default function Dom() {
  return (
    <div>
      <h3>DOM stuff</h3>
      <Cleanup />
      <Move />
      <Classes />
    </div>
  );
}

const Classes = () => {
  const [on, setOn] = createSignal(false);
  return (
    <div>
      <h3>Classes</h3>
      <button
        classList={{ selected: on(), [styles.button]: on() }}
        onclick={() => setOn(!on())}
      >
        {on() ? "ON" : "off"}
      </button>
    </div>
  );
};

const Move = () => {
  const [pos, setPos] = createSignal({ x: 0, y: 0 });

  let ref;
  const mover = (ev) => setPos({ x: ev.x, y: ev.y });

  createEffect(() => {
    ref.setAttribute("mx", pos().x);
    ref.setAttribute("my", pos().y);
  });

  return (
    <div
      ref={ref}
      onmousemove={mover}
      style={{ "min-height": "100px", border: "1px solid black" }}
    >
      [ {pos().x} , {pos().y} ]
    </div>
  );
};

function Cleanup() {
  const [count, setCount] = createSignal(0);

  createEffect(() => {
    count();
    const t = setInterval(() => setCount(count() + 1), 1000);
    onCleanup(() => {
      console.log(" CLeaning up ");
      clearInterval(t);
    });
    // cleanup on effect level
  });

  /*    cleanup on component level
        onCleanup(()=>clearInterval(t))    */

  return (
    <div>
      <h2>Cleanup</h2>
      <p>count : {count()}</p>
    </div>
  );
}
