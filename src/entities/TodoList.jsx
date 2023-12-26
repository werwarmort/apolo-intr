import {VStack} from '@chakra-ui/react';
import {Spinner} from '@chakra-ui/react';
import {useMutation, useQuery} from "@apollo/client"; // позволяет получать данные с сервера

import TodoItem from './TodoItem';
import TotalCount from './TotalCount';
import {ALL_TODO, DELETE_TODO, UPDATE_TODO} from "../shared/apollo/todos";

const TodoList = () => {

    const {loading, error, data} = useQuery(ALL_TODO)
    const [toggleTodo, {error: updateError}] = useMutation(UPDATE_TODO);
    const [removeTodo, {error: removeTodoError}] = useMutation(DELETE_TODO, {
        update(cache, {data: removeTodo}) {
            cache.modify({
                fields: {
                    allTodos(currentTodos = []) { // обращаться надо не к алиасу а именно к серверному методу allTodos (по дефолту - пустой массив)
                        return currentTodos.filter(todo => todo.__ref !== `Todo:${removeTodo.id}`)
                    }
                }
            })
        }
    });

    if (loading) {
        return <Spinner/>
    }
    if (error || updateError || removeTodoError) {
        return <h2>Error...</h2>
    }

    return (
        <>
            <VStack spacing={2} mt={4}>
                {data.todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        onToggle={toggleTodo}
                        onDelete={removeTodo}
                        {...todo}
                    />
                ))}
            </VStack>
            <TotalCount/>
        </>
    );
};

export default TodoList;
