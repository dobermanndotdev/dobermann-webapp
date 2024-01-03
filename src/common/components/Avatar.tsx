import styled from "@emotion/styled";

interface Props {
  label: string;
  avatarUrl?: string;
}

const Base = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  font-weight: bold;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transition: outline 0.25s;
  background-color: ${(p) => p.theme.colors.zinc700};
`;

export function Avatar({ label, avatarUrl }: Props) {
  return <Base>{avatarUrl ? <img src="" alt="" /> : <span>{label}</span>}</Base>;
}
