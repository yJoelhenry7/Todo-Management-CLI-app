Todo CLI App(Postgres as Database)

To Add a New Task we can run the following command in CLI 

-> node addTodo.js --title="Name of Task" --dueInDays=due in No of days

example:- node addTodo.js --title="hello there" --dueInDays=2

Here we are giving title and dueInDays as Arguments from command Line

To markAsCompleted a Task with the following command

-> node  completeTodo.js --id "Id of Task"

example:- node  completeTodo.js --id "23"

Here we are giving id as Argument from command Line

To View the Total list of Tasks in Database we can run the following Command

-> node listTodos.js
