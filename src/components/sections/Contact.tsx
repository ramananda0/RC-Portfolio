import { Facebook, Github, Instagram, Linkedin, Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PROFILE } from "@/data/portfolio";
import { Reveal, Section, TiltCard } from "@/components/fx/primitives";

const ICONS = { github: Github, linkedin: Linkedin, facebook: Facebook, instagram: Instagram };

const FIELDS = [
  { name: "name", label: "NAME", placeholder: "Enter your name", type: "text" },
  { name: "email", label: "EMAIL", placeholder: "Enter your email", type: "email" },
] as const;

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("TRANSMISSION QUEUED", {
        description: "Connect a mail service to deliver messages to a real inbox.",
      });
      e.currentTarget?.reset?.();
    }, 900);
  };

  return (
    <Section
      id="contact"
      label="Module 06 // Establish Connection"
      title={
        <>
          <span className="font-mono">«</span>ESTABLISH_
          <span className="text-gradient">CONNECTION</span>()
          <span className="font-mono">»</span>
        </>
      }
      subtitle="Open a channel — collaboration, opportunities, or a simple hello."
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <TiltCard className="p-0" intensity={3}>
            <div className="flex items-center gap-2 border-b border-border px-5 py-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyan/70" />
              <span className="ml-3">rc@core:~/contact</span>
            </div>
            <form onSubmit={onSubmit} className="space-y-5 p-6 sm:p-8">
              {FIELDS.map((f) => (
                <div key={f.name}>
                  <label
                    htmlFor={f.name}
                    className="font-mono text-[10px] tracking-[0.25em] text-cyan"
                  >
                    {f.label}:
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    className="mt-2 w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-cyan focus:shadow-[var(--glow-cyan)]"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="font-mono text-[10px] tracking-[0.25em] text-cyan">
                  MESSAGE:
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Enter your message"
                  className="mt-2 w-full resize-none rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-cyan focus:shadow-[var(--glow-cyan)]"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground shadow-[var(--glow-neon)] transition-all duration-300 hover:shadow-[0_0_45px_var(--neon)] disabled:opacity-60"
              >
                <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                {sending ? "Transmitting..." : "Send Transmission"}
              </button>
            </form>
          </TiltCard>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.08}>
            <TiltCard className="p-6" intensity={4}>
              <p className="label-hud">System Channel</p>
              <div className="mt-4 space-y-3 font-mono text-xs">
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">CONNECTION STATUS</span>
                  <span className="text-cyan">● READY</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">MESSAGE CHANNEL</span>
                  <span className="text-cyan">● ONLINE</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">LOCATION</span>
                  <span className="text-foreground/80">DHAKA, BD</span>
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.16}>
            <TiltCard className="p-6" intensity={4}>
              <p className="label-hud">Direct Links</p>
              <a
                href={`mailto:${PROFILE.email}`}
                className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm transition-all hover:border-cyan hover:text-cyan"
              >
                <Mail className="h-4 w-4 text-cyan" />
                {PROFILE.email}
              </a>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {PROFILE.socials.map((s) => {
                  const Icon = ICONS[s.key as keyof typeof ICONS];
                  return (
                    <a
                      key={s.key}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-border bg-surface/40 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-plasma hover:text-plasma"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {s.label}
                    </a>
                  );
                })}
              </div>
              <p className="mt-4 font-mono text-[10px] text-muted-foreground/60">
                // placeholder links & email — replace with real values
              </p>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
