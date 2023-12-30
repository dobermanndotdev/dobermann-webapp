import styled from "styled-components";

interface Props {
  label: string;
  avatarUrl?: string;
}

const Base = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: outline 0.25s;
  outline: 2px solid transparent;
  background-color: var(--color-zinc-100);

  &:hover {
    outline: 2px solid var(--color-zinc-500);
  }
`;

export function Avatar({ label, avatarUrl }: Props) {
  return <Base>{avatarUrl ? <img src="" alt="" /> : <span>{label}</span>}</Base>;
}
