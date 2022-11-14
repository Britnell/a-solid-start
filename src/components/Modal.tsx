import { createSignal, onCleanup, Show } from "solid-js";
import { Portal } from "solid-js/web";
import styles from "./Style.module.css";

const clickOutside = (el, accessor) => {
  const onClick = (e) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener("click", onClick);
  onCleanup(() => document.body.removeEventListener("click", onClick));
};

export default function Modal() {
  const [open, setopen] = createSignal(false);

  return (
    <div>
      <h3>Modal ex</h3>
      <button onclick={() => setopen(true)}>OPen modal</button>
      <Show when={open()}>
        <Portal>
          <div class={styles.modal} use:clickOutside={() => setopen(false)}>
            <h3>MODAL</h3>
            <button onclick={() => setopen(false)}>x</button>
          </div>
        </Portal>
      </Show>
    </div>
  );
}
