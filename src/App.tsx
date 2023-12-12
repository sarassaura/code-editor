import type { Component } from 'solid-js';
import Editor from './components/editor';
import Output from './components/output';

const App: Component = () => {
  return (
    <>
      <header class='bg-slate-700'>
        <nav class='flex justify-between'>
          <p class='p-4'>Code Editor</p>
        </nav>
      </header>
      <main>
        <Editor />
        <Output />
      </main>
      <footer class='bg-slate-700 flex justify-center'>
        <p class='p-4'>©sarassaura, 2023. All rights reserved.</p>
      </footer>
    </>
  );
};

export default App;
