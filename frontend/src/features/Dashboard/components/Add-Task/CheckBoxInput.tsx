import style from "./style.module.css";
const CheckBoxInput = ({
  priority,
  selected,
  onChange,
}: {
  priority: string;
  selected: boolean;
  onChange: (newState: boolean) => void;
}) => {
  const onCheckToggle = (event: React.ChangeEvent) => {
    onChange((event.target as HTMLInputElement).checked);
  };
  const getPriorityColor = () => {
    switch (priority) {
      case "Extreme":
        return "var(--color-chart-red)";

      case "Moderate":
        return "var(--color-chart-blue)";

      default:
        return "var(--color-chart-green)";
    }
  };
  return (
    <div
      className={style.priority_item}
      style={{ "--priority-color": getPriorityColor() } as React.CSSProperties}
    >
      <div className={style.circle}>&nbsp;</div>
      <label htmlFor="priority">{priority}</label>
      <input type="checkbox" checked={selected} onChange={onCheckToggle} />
    </div>
  );
};

export default CheckBoxInput;
