import type { Component } from 'solid-js';
import Editor from './components/editor';
import Output from './components/output';

const App: Component = () => {
  return (
    <>
      <main>
        <Editor />
        <Output />
      </main>
    </>
  );
};

export default App;
