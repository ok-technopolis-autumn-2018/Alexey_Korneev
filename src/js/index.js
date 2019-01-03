import '../styles/default.scss';
import {ToDoCreatorComponent} from "./UI/ToDoCreatorComponent";
import {ToDoListComponent} from "./UI/ToDoListComponent";
import {ToDoToolBarComponent} from "./UI/ToDoToolBarComponent";

var todoCreator = document.querySelector('.todo-creator');
var todoList = document.querySelector('.todo-list');
var todoToolBar = document.querySelector('.todo-toolbar');
const todoCreatorComponent = new ToDoCreatorComponent(todoCreator);
const todoListComponent = new ToDoListComponent(todoList);
const todoToolBarComponent = new ToDoToolBarComponent(todoToolBar, todoList);

todoCreatorComponent.on('addItem', text => todoListComponent.addItem(text));
todoCreatorComponent.on('addItem', () => todoToolBarComponent.countWatcher());

todoListComponent.on('removeItem', (item) => todoListComponent.removeItem(item));
todoListComponent.on('removeItem', () => todoToolBarComponent.countWatcher());

todoListComponent.on('checkBoxAction', (item) => ToDoListComponent.checkBoxAction(item));
todoListComponent.on('checkBoxAction', () => todoToolBarComponent.countWatcher());