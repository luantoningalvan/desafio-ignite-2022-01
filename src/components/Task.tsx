import { Checkbox } from "./Checkbox";
import styles from "./Task.module.css";
import { Trash } from "phosphor-react";

interface TaskProps {
  task: {
    title: string;
    done: boolean;
  };
  onDelete: () => void;
  onDone: () => void;
}

export function Task({ task, onDelete, onDone }: TaskProps) {
  const { title, done } = task;

  return (
    <div className={styles.task}>
      <Checkbox checked={done} onChange={onDone} />
      <p className={done ? styles.titleChecked : styles.title}>{title}</p>
      <button className={styles.iconButton} onClick={onDelete}>
        <Trash size={24} />
      </button>
    </div>
  );
}
