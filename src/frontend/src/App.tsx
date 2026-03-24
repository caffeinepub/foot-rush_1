import { Benefits } from "@/components/Benefits";
import { CartDrawer } from "@/components/CartDrawer";
import { CategoryPromo } from "@/components/CategoryPromo";
import { Footer } from "@/components/Footer";
import { FreshDrops } from "@/components/FreshDrops";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Newsletter } from "@/components/Newsletter";
import { Toaster } from "@/components/ui/sonner";
import { ShopProvider } from "@/context/ShopContext";

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <Benefits />
          <CategoryPromo />
          <FreshDrops />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
      </div>
      <Toaster />
    </ShopProvider>
  );
}
