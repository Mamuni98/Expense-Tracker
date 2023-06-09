import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { darkModeActions } from "../store/dark-mode";
import FileSaver from "file-saver";
const Switch = () => {
  const theme = useSelector((state) => state.darkMode.theme);
  const expenseList = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const setAppThemeHandler = () => {
    theme === "dark-mode"
      ? dispatch(darkModeActions.setAppTheme("light-mode"))
      : dispatch(darkModeActions.setAppTheme("dark-mode"));
  };
  //console.log(expenseList);

  const downloadDataHandler = () => {
    const data =
      "- Catagory - Description - Amount -\n" +
      expenseList
        .map(
          ({ amount, catagory, description }) =>
            `-> ${catagory} - ${description} - ${amount}`
        )
        .join("\n");
    const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
    FileSaver.saveAs(blob, "expense.csv");
  };
  return (
    <>
      <div style={{ position: "fixed", left: "0.5rem" }}>
        {theme === "dark-mode" ? (
          <Button variant="light" onClick={setAppThemeHandler}>
            Light Mode
          </Button>
        ) : (
          <Button variant="dark" onClick={setAppThemeHandler}>
            Dark Mode
          </Button>
        )}
      </div>
      <div style={{ position: "fixed", right: "1rem" }}>
        <FaDownload
          color="aqua"
          size="30px"
          title="Download"
          onClick={downloadDataHandler}
        />
      </div>
    </>
  );
};
export default Switch;
