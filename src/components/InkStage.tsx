import { useEffect, useRef } from "react";

/** Coupled spring surface, integrated at a fixed 120 Hz. No image assets. */
export function InkStage({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const disturb = useRef<(x: number) => void>(() => {});
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const count = 90;
    const height = new Float32Array(count);
    const speed = new Float32Array(count);
    const next = new Float32Array(count);
    const drops: { x: number; y: number; vx: number; vy: number }[] = [];
    let w = 400, h = 500, frame = 0, last = 0, accumulator = 0;
    let visible = true;
    const splash = (ratio: number) => {
      if (!enabled) return;
      const index = Math.round(Math.max(.04, Math.min(.96, ratio)) * (count - 1));
      for (let d = -3; d <= 3; d++) speed[index + d] += 2.5 * (1 - Math.abs(d) / 4);
      for (let i = 0; i < 9 && drops.length < 90; i++) {
        drops.push({ x: ratio * w, y: h * .65, vx: (Math.random() - .5) * 150, vy: -100 - Math.random() * 140 });
      }
    };
    disturb.current = splash;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#faf8f1"; ctx.fillRect(0, 0, w, h);
      // Printed screentone, radiating ink lines, and editorial lettering.
      ctx.fillStyle = "#d5cfc4";
      for (let x = 5; x < w; x += 9) for (let y = 5; y < h; y += 9) {
        ctx.beginPath(); ctx.arc(x, y, .65, 0, Math.PI * 2); ctx.fill();
      }
      ctx.strokeStyle = "#292724";
      for (let i = 0; i < 40; i++) {
        const a = i / 40 * Math.PI * 2;
        ctx.lineWidth = i % 3 ? .6 : 1.5;
        ctx.beginPath();
        ctx.moveTo(w * .5 + Math.cos(a) * w * .48, h * .32 + Math.sin(a) * h * .26);
        ctx.lineTo(w * .5 + Math.cos(a) * w, h * .32 + Math.sin(a) * h);
        ctx.stroke();
      }
      ctx.save(); ctx.translate(w * .5, h * .32); ctx.rotate(-.08);
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = `900 ${w * .235}px sans-serif`;
      ctx.lineWidth = 10; ctx.strokeStyle = "#faf8f1";
      ctx.strokeText("MAKE", 0, -w * .10); ctx.strokeText("WAVES.", 0, w * .12);
      ctx.fillStyle = "#292724"; ctx.fillText("MAKE", 0, -w * .10); ctx.fillText("WAVES.", 0, w * .12);
      ctx.restore();
      // Surface displacement is shared by the ink fill, outline, and floating page.
      const surface = (i: number) => h * .65 + height[i];
      ctx.beginPath(); ctx.moveTo(0, h);
      for (let i = 0; i < count; i++) ctx.lineTo(i / (count - 1) * w, surface(i));
      ctx.lineTo(w, h); ctx.closePath(); ctx.fillStyle = "#242321"; ctx.fill();
      ctx.beginPath();
      for (let i = 0; i < count; i++) ctx.lineTo(i / (count - 1) * w, surface(i) + 8);
      ctx.strokeStyle = "#d68b9c"; ctx.lineWidth = 3; ctx.stroke();
      const center = Math.floor(count * .6);
      ctx.save(); ctx.translate(w * .6, surface(center) - 10);
      ctx.rotate(Math.atan2(height[center + 2] - height[center - 2], w * 4 / count) * .6);
      ctx.beginPath(); ctx.moveTo(-42, -5); ctx.lineTo(42, -5); ctx.lineTo(22, 12); ctx.lineTo(-22, 12); ctx.closePath();
      ctx.fillStyle = "#faf8f1"; ctx.fill(); ctx.strokeStyle = "#242321"; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-30, -5); ctx.lineTo(0, -37); ctx.lineTo(25, -5); ctx.closePath(); ctx.fillStyle = "#d68b9c"; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -37); ctx.lineTo(0, -5); ctx.stroke(); ctx.restore();
      ctx.fillStyle = "#242321";
      for (const p of drops) { ctx.beginPath(); ctx.ellipse(p.x, p.y, 2, 3.5, 0, 0, Math.PI * 2); ctx.fill(); }
      ctx.fillStyle = "#faf8f1"; ctx.textAlign = "left"; ctx.font = "12px monospace";
      ctx.fillText("01 / IDEAS IN MOTION", 22, h - 78);
    };
    const tick = (time: number) => {
      frame = 0;
      if (!enabled || !visible || document.hidden) return;
      accumulator += Math.min((time - (last || time)) / 1000, .05); last = time;
      while (accumulator >= 1 / 120) {
        for (let i = 0; i < count; i++) {
          const left = height[Math.max(0, i - 1)], right = height[Math.min(count - 1, i + 1)];
          next[i] = (speed[i] + (left + right - height[i] * 2) * .20 - height[i] * .003) * .988;
        }
        for (let i = 0; i < count; i++) { speed[i] = next[i]; height[i] = Math.max(-65, Math.min(65, height[i] + speed[i])); }
        for (let i = drops.length - 1; i >= 0; i--) {
          const p = drops[i]; p.x += p.vx / 120; p.y += p.vy / 120; p.vy += 400 / 120;
          if (p.y > h * .65 + 16) drops.splice(i, 1);
        }
        accumulator -= 1 / 120;
      }
      draw(); frame = requestAnimationFrame(tick);
    };
    const resume = () => {
      cancelAnimationFrame(frame); frame = 0; last = 0;
      if (enabled && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect(); w = bounds.width; h = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    };
    const pointer = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect(); splash((event.clientX - box.left) / box.width);
    };
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    intersection.observe(canvas);
    canvas.addEventListener("pointerdown", pointer);
    document.addEventListener("visibilitychange", resume);
    resize(); splash(.35); resume();
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); intersection.disconnect();
      canvas.removeEventListener("pointerdown", pointer); document.removeEventListener("visibilitychange", resume);
      disturb.current = () => {};
    };
  }, [enabled]);
  return <div className="ink-stage">
    <canvas ref={ref} aria-label="Panel manga dengan perahu kertas dan permukaan tinta interaktif" role="img" />
    <button className="art-caption" disabled={!enabled} onClick={() => disturb.current(.45)}>
      {enabled ? "SENTUH TINTANYA ↗" : "MODE TENANG"}
    </button>
  </div>;
}
