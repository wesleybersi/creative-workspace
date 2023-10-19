import styles from "./selector.module.scss";

const TypeSelector = () => {
  const types = [
    {
      name: "Note",
    },
    {
      name: "Image",
    },
    {
      name: "Color",
    },
    {
      name: "Canvas",
    },
    {
      name: "Todo",
    },
    {
      name: "Checklist",
    },
    {
      name: "Friend",
    },
    {
      name: "Quote",
    },
    {
      name: "Emoji",
    },
    {
      name: "Music",
    },
    {
      name: "Calendar",
    },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.grid}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default TypeSelector;
