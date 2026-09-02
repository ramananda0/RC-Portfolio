import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AmbientBackground, CustomCursor, MouseLight } from "@/components/fx/Ambient";
import { Preloader } from "@/components/fx/Preloader";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Toaster } from "@/components/ui/sonner";

const TITLE = "Ramananda Chakraborty — CS Engineer & React Developer";
const DESC =
  "Futuristic portfolio of Ramananda Chakraborty, Computer Science Engineer building modern web experiences with React, and exploring AI and data-driven technologies.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <Preloader onDone={() => setBooted(true)} />
      <AmbientBackground />
      <MouseLight />
      {booted && <CustomCursor />}
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
