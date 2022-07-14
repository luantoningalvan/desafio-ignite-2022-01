import { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox(props: CheckboxProps) {
  return <input className={styles.checkbox} type="checkbox" {...props} />;
}
