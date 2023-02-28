import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

import { IColumn } from '../../types/column.interface';
import { ICard } from '../../types/card.interface';
import { APP_KEYS } from '../consts';

const BASE_URL = 'http://localhost:4200/api';

interface Input {
  title: string;
}

interface ITodoInput {
  title: string;
  columnTitle: string;
}

export function useColumns() {
  const userString = localStorage.getItem(APP_KEYS.STORAGE_KEYS.ACCOUNT);
  const userName = JSON.parse(userString!).name;

  const { data: columns, refetch } = useQuery<IColumn[], Error>('columns', async () => {
    const response = await fetch(`${BASE_URL}/columns/${userName}`, {
      headers: {
        'content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Response error');
    }
    const data = await response.json();
    console.log('data', data);
    return data.todoList;
  });

  const { mutate } = useMutation(
    ({ title }: Input) =>
      fetch(`${BASE_URL}/columns/${userName}`, {
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ userName, title })
      }),
    {
      onSuccess: () => refetch()
    }
  );

  const createColumn = ({ title }: Input) => {
    mutate({ title });
  };

  const removeColumn = useMutation((id: string) => axios.delete(`${BASE_URL}/columns/${id}`), {
    onSuccess: () => refetch()
  });

  return {
    columns: columns ?? [],
    createColumn,
    removeColumn,
    refetch
  };
}

export function useCards(refetch) {
  // const userString = localStorage.getItem(APP_KEYS.STORAGE_KEYS.ACCOUNT);
  // const userName = JSON.parse(userString!).name;
  // const queryKey = columnTitle ? ['todos', columnTitle] : 'todos';

  // const { data: cards, refetch } = useQuery<ICard[], Error>(queryKey, async () => {
  //   const url = columnTitle ? `${BASE_URL}/todos/${userName}` : `${BASE_URL}/todos/${userName}`;
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error('Response error');
  //   }
  //   const data = await response.json();
  //   return data.data;
  // });

  // const createCard = useMutation(
  //   (card: Input) => axios.post(`${BASE_URL}/todos/${userName}`, card),
  //   {
  //     onSuccess: () => refetch()
  //   }
  // );

  // const removeCard = useMutation(
  //   (id: string) => axios.delete(`${BASE_URL}/todos/${userName}/${id}`),
  //   {
  //     onSuccess: () => refetch()
  //   }
  // );

  // return {
  //   cards: cards ?? [],
  //   createCard,
  //   removeCard
  // };
  const userString = localStorage.getItem(APP_KEYS.STORAGE_KEYS.ACCOUNT);
  const userName = JSON.parse(userString!).name;

  const { mutate } = useMutation(
    ({ title, columnTitle }: ITodoInput) =>
      fetch(`${BASE_URL}/todos/${userName}`, {
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ title, columnTitle })
      }),
    {
      onSuccess: () => refetch()
    }
  );

  const createTodo = ({ title, columnTitle }: ITodoInput) => {
    mutate({ title, columnTitle });
  };

  const removeTodo = useMutation((id: string) => axios.delete(`${BASE_URL}/todos/${id}`), {
    onSuccess: () => refetch()
  });

  return {
    createTodo,
    removeTodo
  };
}
