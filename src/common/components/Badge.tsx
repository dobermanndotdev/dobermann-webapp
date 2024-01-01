import styled from "@emotion/styled";

interface Props {
  color: "info" | "warning" | "danger" | "success";
}

const colors: Record<string, string> = {
  success: "rgba(25, 135, 84, 0.3)",
};

export const Badge = styled.span<Props>`
  font-weight: 500;
  border-radius: 3px;
  display: inline-block;
  padding: 2px ${(p) => p.theme.space.sm};
  background-color: ${(p) => colors[p.color]};
`;
