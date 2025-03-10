import { Route, Routes } from "react-router";
import Homepage from "~/views/homepage";

export const RootRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
};
