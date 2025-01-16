import "./styles.css";
import { setTheme } from "./setTheme";

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.className = theme;
}

document.querySelector('.theme-toggle').addEventListener('click', setTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const theme = e.matches ? 'dark' : 'light';
    document.documentElement.className = theme;
});

initializeTheme();

class TodoApp {
    constructor() {
        this.subjects = [];
        this.currentSubject = null;
        this.initializeDOM();
        this.bindEvents();
        this.loadSampleData();
    }

    initializeDOM() {
        this.subjectAddBtn = document.querySelector(".subject-add");
        this.subjectAddDialog = document.querySelector(".subject-add-dialog");
        this.subjectSubmitBtn = document.querySelector(".subject-submit");
        this.todoAddBtn = document.querySelector(".todo-add");
        this.todoAddDialog = document.querySelector(".todo-add-dialog");
        this.todoSubmitBtn = document.querySelector(".todo-submit");
        this.todoSubjectList = document.querySelector(".todo-subject-list");
        this.todoDisplay = document.querySelector(".todo-subject-heading");
        this.todoList = document.querySelector(".todo-list");
    }

    bindEvents() {
        this.subjectAddBtn.onclick = () => this.showSubjectDialog();
        this.subjectSubmitBtn.onclick = () => this.handleSubjectSubmit();
        this.todoAddBtn.onclick = () => this.showTodoDialog();
        this.todoSubmitBtn.onclick = () => this.handleTodoSubmit();
    }

    loadSampleData() {
        const project = {
            subject_title: "project",
            todo_aray: [
                {
                    title: "project1",
                    description: "project1 description",
                    duedate: "2021-12-31",
                    priority: "High"
                },
                {
                    title: "project2",
                    description: "project2 description",
                    duedate: "2021-12-31",
                    priority: "High"
                }
            ]
        }
        const home = {
            subject_title: "home",
            todo_aray: [
                {
                    title: "home1",
                    description: "home1 description",
                    duedate: "2021-12-31",
                    priority: "High"
                },
                {
                    title: "home2",
                    description: "home2 description",
                    duedate: "2021-12-31",
                    priority: "High"
                }
            ]
        }

        this.subjects = [project, home];
        this.displaySubjectList();
        this.displaySubject(this.subjects[0]);
    }

    showSubjectDialog() {
        this.subjectAddDialog.showModal();
    }

    handleSubjectSubmit() {
        const subject_name = document.querySelector(".subject-name").value;
        const subject = {
            subject_title: subject_name,
            todo_aray: []
        }
        this.subjects.push(subject);
        const subject_div = document.createElement("div");
        subject_div.classList.add("subject");

        const subject_title = document.createElement("h2");
        subject_title.textContent = ` ${subject_name}`;

        subject_div.appendChild(subject_title);
        subject_div.onclick = () => {
            this.displaySubject(subject);
        }
        this.todoSubjectList.appendChild(subject_div);

        this.subjectAddDialog.close();
    }

    showTodoDialog() {
        this.todoAddDialog.showModal();
    }

    handleTodoSubmit() {
        const todo_title = document.querySelector(".todo-title").value;
        const todo_description = document.querySelector(".todo-description").value;
        const todo_duedate = document.querySelector(".todo-duedate").value;
        const todo_priority = document.querySelector(".todo-priority").value;
        const subject_title = this.todoDisplay.textContent;
        const subject = this.subjects.find((subject) => subject.subject_title === subject_title);
        const todo = {
            title: todo_title,
            description: todo_description,
            duedate: todo_duedate,
            priority: todo_priority
        }
        subject.todo_aray.push(todo);
        this.displaySubject(subject);
        this.todoAddDialog.close();
    }

    displaySubject(subject) {
        this.todoList.innerHTML = "";
        this.todoDisplay.textContent = subject.subject_title;
        subject.todo_aray.forEach((todo, index) => {
            const todo_div = document.createElement("div");
            todo_div.classList.add("todo");

            const todo_title = document.createElement("h3");
            todo_title.textContent = `${index + 1}. ${todo.title}`;

            const todo_description = document.createElement("p");
            todo_description.textContent = `Description: ${todo.description}`;

            const todo_duedate = document.createElement("p");
            todo_duedate.textContent = `Due Date: ${todo.duedate}`;

            const todo_priority = document.createElement("p");
            todo_priority.textContent = `Priority: ${todo.priority}`;

            todo_div.appendChild(todo_title);
            todo_div.appendChild(todo_description);
            todo_div.appendChild(todo_duedate);
            todo_div.appendChild(todo_priority);
            this.todoList.appendChild(todo_div);
        });
    }

    displaySubjectList() {
        this.subjects.forEach((subject, index) => {
            const subject_div = document.createElement("div");
            subject_div.classList.add("subject");

            const subject_title = document.createElement("h3");
            subject_title.textContent = ` ${subject.subject_title}`;

            subject_div.appendChild(subject_title);
            subject_div.onclick = () => {
                this.displaySubject(subject);
            }
            this.todoSubjectList.appendChild(subject_div);
        });
    }
}

// Initialize app
const app = new TodoApp();
