import { forwardRef } from "react";
import { SkillMark } from "./Bits";
import s from "./keycap.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  skill: string;
  size?: "s" | "m" | "l";
  pressed?: boolean;
  decorative?: boolean;
  caption?: string;
}

/** A chunky keyboard key carrying a logo. The visual atom shared by the hero and the skills keyboard. */
const Keycap = forwardRef<HTMLButtonElement, Props>(function Keycap(
  { skill, size = "m", pressed, decorative, caption, className = "", ...rest },
  ref,
) {
  const inner = (
    <>
      <span className={s.top}>
        <SkillMark id={skill} className={s.logo} />
      </span>
      {caption && <span className={s.caption}>{caption}</span>}
    </>
  );
  if (decorative)
    return (
      <span className={`${s.key} ${s[size]} ${className}`} aria-hidden="true">
        {inner}
      </span>
    );
  return (
    <button ref={ref} type="button" className={`${s.key} ${s[size]} ${className}`} aria-pressed={pressed} {...rest}>
      {inner}
    </button>
  );
});

export default Keycap;
