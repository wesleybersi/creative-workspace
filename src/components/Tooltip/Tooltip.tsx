import useMousePosition from "../../hooks/useMousePosition";
import useStore from "../../store/store";
import "./tooltip.scss";

const Tooltip = () => {
  const { x, y } = useMousePosition();
  const { toolTip } = useStore();

  if (!toolTip) return <></>;

  return (
    <div
      className="tooltip"
      style={{ position: "fixed", left: x + 18, top: y + 4 }}
    >
      {toolTip}
    </div>
  );
};

export default Tooltip;
