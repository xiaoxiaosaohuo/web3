## note

1. init project

```
truffle init
```

2. npm install / yarn

```
3. compile

truffle compile
```

4. redeploy

```
truffle migrate --reset
```

5. console

```
> truffle console
> todoList = await TodoList.deployed()
<!-- check address -->
todoList.address



```

6. add todo

```
enter console
then type:

> todoList = await TodoList.deployed()
> task = await todoList.createTask('we are going to watch a movie')
```
