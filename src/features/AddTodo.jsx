import {useState} from 'react';
import {
    Button,
    FormControl,
    Input,
} from '@chakra-ui/react';
import {useMutation} from "@apollo/client";
import {ADD_TODO, ALL_TODO} from "../shared/apollo/todos";

const AddTodo = () => {
    const [text, setText] = useState('');
    const [addTodo, {error}] = useMutation(ADD_TODO, {
        refetchQueries: [
            {query: ALL_TODO}
        ],
        // задаем массив кверисов, которые надо принудительно перезагрузить
        // получается что заново получаем все тудушки. Это не всегда полезно, скорее это даже искоючение

        update(cache, {data: {newTodo}}) { // update педпологает что мы сами руками обновляем кеш (То, что печатается в приложении - это именно данные из кэша)

            // кеш пополняется запросами и приложене не знает когда именно нужно делать запросы для обновления кеша.
            // Аполо позволяет в некоторых ситуациях обновлять кеш самостоятельно (при добавлении и удалении данных)

            const {todos} = cache.readQuery({query: ALL_TODO}); // получаем все старые тудушки (кеш.прщчитайЗначения({Значения: ТУТ}))

            cache.writeQuery({
                query: ALL_TODO,
                data: {
                    todos: [newTodo, ...todos]
                }
            })
            // таким образом нам не нужно рефечить данные
        }
    });

    const handleAddTodo = () => {
        if (text.trim().length) {
            addTodo({
                variables: { // передаем объект переменных
                    title: text,
                    completed: false,
                    userId: 123,
                },
            });
            setText('');
        }
    }

    const handleKey = (event) => {
        if (event.key === "Enter") handleAddTodo();
    }

    if (error) {
        return <h2>Error add todo...</h2>
    }

    return (
        <FormControl display={'flex'} mt={6}>
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKey}
            />
            <Button onClick={handleAddTodo}>Add todo</Button>
        </FormControl>
    );
};

export default AddTodo;
