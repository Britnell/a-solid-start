import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";

export default function Todo() {
  onMount(async () => {
    const stored = localStorage.getItem("todos");
    const json = JSON.parse(stored);
    setTodos(json);

    const count = parseInt(localStorage.getItem("count"));
    setId(count);
  });

  const [todos, setTodos] = createSignal([]);
  const [id, setId] = createSignal(0);
  const [filter, setFilter] = createSignal("all");

  const unCompleted = createMemo(
    () => todos().filter((todo) => !todo.completed).length
  );

  const submit = (ev) => {
    ev.preventDefault();
    const title = ev.target.title.value;
    ev.target.title.value = "";
    setTodos((todos) => [
      ...todos,
      {
        id: id(),
        title,
        completed: false,
      },
    ]);
    setId((id) => id + 1);
  };

  createEffect(() => {
    console.log(todos(), unCompleted());
  });

  createEffect(() => localStorage.setItem("todos", JSON.stringify(todos())));
  createEffect(() => localStorage.setItem("count", id().toString()));

  const toggle = (id) =>
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };
        return todo;
      })
    );

  const remove = (id) =>
    setTodos((todos) => todos.filter((todo) => todo.id !== id));

  const toggleAll = (ev) =>
    setTodos((todos) =>
      todos.map((todo) => ({
        ...todo,
        completed: ev.target.checked,
      }))
    );

  const removeCompleted = () =>
    setTodos((todos) => todos.filter((todo) => !todo.completed));

  onMount(() => {
    const filterCheck = () => {
      const h = window.location.hash.slice(1);
      setFilter(h);
    };
    window.addEventListener("hashchange", filterCheck);
    onCleanup(() => window.removeEventListener("hashchange", filterCheck));
  });

  const filteredTodos = createMemo(() => {
    if (filter() === "active") return todos().filter((todo) => !todo.completed);
    if (filter() === "completed")
      return todos().filter((todo) => todo.completed);
    return todos();
  });

  return (
    <div>
      <h1>TODO LIST</h1>
      <div>
        <form onsubmit={submit}>
          <label for="title">Create Todo</label>
          <input type="text" name="title" />
          <button type="submit">Add</button>
        </form>
      </div>
      <Show
        when={filteredTodos().length > 0}
        fallback={<p>You dont have any todos</p>}
      >
        <div>
          <label for="toggle-all">Toggle all : </label>
          <input
            id="toggle-all"
            type="checkbox"
            checked={unCompleted() === 0}
            onInput={toggleAll}
          />
        </div>
        <div>
          <button onclick={removeCompleted}> Remove completed </button>
        </div>
        <ul>
          <For each={filteredTodos()}>
            {(todo) => (
              <li
                classList={{ completed: todo.completed }}
                style={{
                  display: "flex",
                  gap: "2rem",
                  "max-width": "400px",
                }}
              >
                <input
                  oninput={() => toggle(todo.id)}
                  type="checkbox"
                  checked={todo.completed}
                />

                <span style={{ "flex-grow": 1 }}>{todo.title}</span>
                <button onclick={() => remove(todo.id)}>x</button>
              </li>
            )}
          </For>
        </ul>
        <div>
          {unCompleted()} {unCompleted() === 1 ? "item" : "items"} left
        </div>
        <div>
          <h3>Display filter</h3>
          <ul style={{ display: "flex", gap: "2rem" }}>
            <For each={["all", "active", "completed"]}>
              {(filt) => (
                <li>
                  <a
                    style={{
                      "text-decoration":
                        filter() === filt ? "underline" : "none",
                    }}
                    href={`#${filt}`}
                  >
                    {filt}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>
    </div>
  );
}
