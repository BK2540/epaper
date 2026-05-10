import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";

const Home = lazy(() => import("@/pages/Home"));
const Payment = lazy(() => import("@/pages/Payment"));
const Receipt = lazy(() => import("@/pages/Receipt"));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface-cream flex justify-center items-center w-screen">
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/receipt" element={<Receipt />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
