import {
  createEffect,
  createMemo,
  createSignal,
  Match,
  Show,
  Switch,
} from "solid-js";

export const Time = () => <span>{Date.now()}</span>;

export default function Counter() {
  const [count, setCount] = createSignal(0);

  createEffect(() => console.log(" [effect]   count is ", count()));

  // derived signal - just wrap a signal in a funct,
  // it is automatically updated too
  // BUT a derived func is run evertime it is accessed
  const double = () => {
    console.log(" calculating ... ");
    return count() * 2;
  };

  // For expensive computation wrap in createMemo
  // this only runs once after its signals change
  const computed = createMemo(() => {
    console.log(" expensive calculation");
    return count() * 100000;
  });

  return (
    <>
      <div>
        <div>Count = {count()}</div>
        <button class="increment" onClick={() => setCount(count() + 1)}>
          +
        </button>
        <p>
          Math : {count()} x 2 = {double()}
        </p>
        <p>
          double is {double()}, {double()}, {double()}
        </p>
        <p>
          Expensive computational forecast is {computed()}, {computed()},{" "}
          {computed()}
        </p>
        <div>
          <Show when={count() % 2 === 0}>
            <p>divisble by 2</p>
          </Show>
          <Show when={count() % 3 === 0}>
            <p>divisble by 3</p>
          </Show>
          {count() > 5 && (
            <p>
              {">5"} <Time />
            </p>
          )}
          <Show when={count() > 5}>
            {/* Show only rerenders when the outcome changes, no on every change in count */}
            <p>
              Greater than 5 <Time />
            </p>
          </Show>
        </div>
        <div style={{ border: "1px solid black" }}>
          <Switch>
            <Match when={count() < 5}>
              <p>[Mag 5]</p>
            </Match>
            <Match when={count() < 10}>
              <p>[Mag 10]</p>
            </Match>
            <Match when={count() < 15}>
              <p>[Mag 15]</p>
            </Match>
          </Switch>
        </div>
      </div>
    </>
  );
}
