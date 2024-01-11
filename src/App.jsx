import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";
import Menu from "./components/Menu";
import { useEffect, useState } from "react";
import { Leva } from "leva";
import { ScrollManager } from "./components/ScrollManager";
import { Cursor } from "./components/Cursor";
import Sky from "./components/Sky";

function App() {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Sky />
          <Experience section={section} menuOpened={menuOpened} />

          <Scroll html>
            <Interface setSection={setSection} />
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Menu
        onSectionChange={setSection}
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
      />
      <Cursor />
      <Leva hidden />
    </>
  );
}

export default App;
