import { useTheme } from "./theme";
import { GlobalStyle } from "./components/GlobalStyle";
import { HeaderSection } from "./components/Header";
import { AboutSection } from "./components/About/About";
import { TeamSection } from "./components/Team/Team";
import { ServicesMachine } from "./components/Services/Services";
import { LogoSwarm } from "./components/LogoSwarm/LogoSwarm";
import { LaptopSection } from "./components/Laptop/Laptop";
import { Products } from "./components/Products/Products";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function OctagramPage() {
  const { theme, toggle, c } = useTheme();
  return (
    <>
      <GlobalStyle c={c} />
      <div className="scanlines" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999 }} />
      <HeaderSection c={c} theme={theme} toggle={toggle} />
      <AboutSection c={c} />
      <TeamSection c={c} />
      <main style={{ position: "relative", zIndex: 1, boxShadow: theme === "dark" ? "inset 0 100px 40px #000000ff" : "inset 0 100px 40px -40px #ffffffff" }}>
        <ServicesMachine c={c} />
        <LogoSwarm c={c} />
        <ErrorBoundary>
          <LaptopSection c={c} />
        </ErrorBoundary>
        <Products c={c} />
        <Contact c={c} />
      </main>
      <Footer c={c} />
    </>
  );
}