import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exchangeToken } from "./state/actionCreators/authAC";
import { apiGetRecentDataSet } from "./api/dataSet";
import Home from "./components/Home";
import { setDataSetAC } from "./state/actionCreators/dataSetAC";
import Flow from "./components/Board";
import { ReactFlowProvider } from "react-flow-renderer";
import SideBar from "./components/SideBar";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(exchangeToken());
  }, []);

  useEffect(() => {
    getRecentDataSet();
  }, [auth]);

  const getRecentDataSet = async () => {
    if (auth.recentDataSet) {
      const response = await apiGetRecentDataSet();
      dispatch(setDataSetAC(response.data.id));
    }
  };
  return (
    <div>
      <div className="app">
        <ReactFlowProvider>
          <SideBar />
          <Flow />
          {/* {auth.id ? <Flow /> : <Home />} */}
        </ReactFlowProvider>
      </div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </div>
  );
}

export default App;
