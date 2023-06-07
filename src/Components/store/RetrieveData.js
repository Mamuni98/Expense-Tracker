import axios from "axios";
import { useDispatch } from "react-redux";
import { expenseActions } from "./expense";

const RetrieveData = async () => {
  try {
    const dispatch = useDispatch();
    const email = localStorage.getItem("email");
    if (email) {
      const userName = email.replace("@", "").replace(".", "");
      const response = await axios.get(
        `https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/${userName}.json`
      );
      let listArr = [];
      for (let key in response.data) {
        listArr.push({
          name: key,
          ...response.data[key],
        });
      }
      console.log(listArr);
      let price = 0;
      listArr.forEach((list) => {
        price = Number(price) + list.amount;
      });
      dispatch(
        expenseActions.savedFinalList({ list: listArr, totalPrice: price })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

//export default RetrieveData;
