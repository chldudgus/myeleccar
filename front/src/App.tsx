import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./Pages/LoginPage"));
const Find = lazy(() => import("./Pages/FindPage"));
const FindEmail = lazy(() => import("./Pages/FindEmailPage"));
const FindPwd = lazy(() => import("./Pages/FindPwdPage"));
const CarMbti = lazy(() => import("./Pages/CarMbtiPage"));
// const TestContents = lazy(() => import("./components/CarMbti/TestContents"));
const Loading = lazy(() => import("./components/CarMbti/Loading"));
// const Result = lazy(() => import("./components/CarMbti/Result"));
const CalcEfficency = lazy(() => import("./Pages/CalcEfficiencyPage"));
const CarRegister = lazy(() => import("./Pages/CarRegisterPage"));

import Main from "./Pages/MainPage";
import SignUp from "./Pages/SignUpPage";
import Community from "./Pages/Community";

function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find" element={<Find />} />
          <Route path="/find/email" element={<FindEmail />} />
          <Route path="/find/pwd" element={<FindPwd />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/community" element={<Community />} />
          <Route path="/carmbti" element={<CarMbti />} />
          <Route path="/carregister" element={<CarRegister />} />
          {/* <Route path="/test" element={<TestContents />} /> */}
          <Route path="/loading" element={<Loading />} />
          {/* <Route path="/result/:car" element={<Result />} /> */}
          <Route path="/calcefficency" element={<CalcEfficency />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
