'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import { Icons } from '@/components/icons';

import AnimatedCheckbox from '@/registry/core/ui/animated-checkbox';

export const seeds = [
  'Buy groceries',
  'Call mom',
  'Clean the kitchen',
  'Email colleague',
  'Write report',
  'Organize clothes',
  'Schedule meeting',
  'Research project plan',
  'Update budget',
  'Prepare presentation',
];

const ANIMATION_DURATION = 0.3;

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

export default function AnimatedList() {
  const [id, setId] = useState(seeds.length + 1);
  const [todos, setTodos] = useState<Todo[]>(
    seeds.slice(0, 10).map((text, index) => ({
      id: index + 1,
      text,
      checked: false,
    })),
  );

  const addTodo = () => {
    setTodos((prevTodos) => [
      { id, text: seeds[id % seeds.length], checked: false },
      ...prevTodos,
    ]);
    setId((prevId) => prevId + 1);
  };
  const archiveTodo = (todoToArchive: Todo) => {
    setTimeout(() => {
      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== todoToArchive.id),
      );
    }, ANIMATION_DURATION * 1000);
  };

  return (
    <div className='w-full items-center justify-center overscroll-y-contain py-8 '>
      <div className='relative flex flex-col max-h-[300px] w-full max-w-lg mx-auto my-8 bg-white dark:bg-[#1e1e1e] rounded-xl border border-zinc-200 shadow-md dark:border-none dark:shadow-none'>
        <div className='flex justify-between border-b border-zinc-200 dark:border-zinc-800 p-4'>
          <button
            onClick={addTodo}
            className='text-zinc-400 dark:text-zinc-700 transition-colors duration-600 ease-in hover:text-zinc-800 dark:hover:text-zinc-300 active:text-zinc-900 dark:active:text-zinc-200'
          >
            <Icons.Plus className='h-6 w-6' />
          </button>
        </div>
        <div className='max-h-[300px] overflow-y-auto p-4'>
          <AnimatePresence initial={false}>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onArchive={archiveTodo} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

const TodoItem: React.FC<{
  todo: Todo;
  onArchive: (todo: Todo) => void;
}> = ({ todo, onArchive }) => {
  const [isChecked, setIsChecked] = useState(todo.checked);

  const handleToggle = () => {
    if (!isChecked) {
      setIsChecked(true);
      onArchive(todo);
    }
  };

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{
        height: 0,
        opacity: 0,
        transition: {
          height: { duration: ANIMATION_DURATION },
          opacity: { duration: ANIMATION_DURATION * 0.67 },
        },
      }}
      style={{ overflow: 'hidden' }}
      transition={{ ease: [0.32, 0.72, 0, 1] }}
      className='relative flex flex-col justify-end bg-white dark:bg-[#1e1e1e]'
    >
      <div className='flex items-center py-4 px-4 gap-4 hover:bg-zinc-100 dark:hover:bg-[#2e2e2e] rounded-lg'>
        <div className='flex cursor-pointer'>
          <button className='relative flex items-center'>
            <input
              type='checkbox'
              className='relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-zinc-300 dark:border-zinc-700 transition-all duration-500 checked:border-blue-500 checked:bg-blue-500'
              checked={isChecked}
              onChange={handleToggle}
            />
            <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white'>
              <AnimatedCheckbox isChecked={isChecked} className='h-3.5 w-3.5' />
            </div>
          </button>
        </div>
        <p className='truncate text-sm text-zinc-800 dark:text-white'>
          {todo.text}
        </p>
      </div>
    </motion.div>
  );
};
