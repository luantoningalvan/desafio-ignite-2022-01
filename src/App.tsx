import logo from "./assets/logo.svg";
import styles from "./App.module.css";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { FormEvent, useState } from "react";
import clipboardIcon from "./assets/clipboard.png";
import { Task } from "./components/Task";
import { PlusCircle } from "phosphor-react";

interface Task {
  id: string;
  title: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState("");

  function handleAddTask(e: FormEvent) {
    e.preventDefault();

    if (inputText === "") return;

    const generateId = String(Math.floor(Math.random() * 1000));

    setTasks((curr) => [
      ...curr,
      {
        id: generateId,
        title: inputText,
        done: false,
      },
    ]);

    setInputText("");
  }

  function handleDelete(deletedId: string) {
    setTasks((curr) => curr.filter(({ id }) => id !== deletedId));
  }

  function handleDone(doneId: string) {
    setTasks((curr) =>
      curr.map((task) =>
        task.id === doneId ? { ...task, done: !task.done } : task
      )
    );
  }

  const doneTasks = tasks.filter(({ done }) => done).length;

  return (
    <>
      <header className={styles.header}>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className={styles.container}>
        <form onSubmit={handleAddTask} className={styles.form}>
          <Input
            required
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Adicione uma tarefa"
          />
          <Button>
            Criar
            <PlusCircle size={18} />
          </Button>
        </form>

        <div className={styles.listTop}>
          <div className={styles.createdCount}>
            <h4>Tarefas criadas</h4>
            <span className={styles.chip}>{tasks.length}</span>
          </div>
          <div className={styles.finishedCount}>
            <h4>Concluídas</h4>
            <span className={styles.chip}>
              {tasks.length > 0 ? `${doneTasks} de ${tasks.length}` : 0}
            </span>
          </div>
        </div>

        {tasks.length > 0 ? (
          <div>
            {tasks.map((task) => (
              <Task
                task={task}
                onDelete={() => handleDelete(task.id)}
                onDone={() => handleDone(task.id)}
                key={task.id}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <img src={clipboardIcon} alt="" />
            <h5>Você ainda não tem tarefas cadastradas</h5>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
