import { Title } from "solid-start";
import Dom from "~/components/Dom";
import Colors from "~/components/Colors";
import Counter from "~/components/Counter";
import Flow from "~/components/Flow";
import Greetings from "~/components/Greeting";
import Modal from "~/components/Modal";

// https://start.solidjs.com/getting-started/what-is-solidstart

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <Flow />
      <Greetings />
      <Colors />
      <Dom />
      <Modal />
    </main>
  );
}
