import { Icon, IconProps } from "@chakra-ui/react";

export function DarkModeIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-10.45-10.45 1 1 0 0 0-1.28-1.28 10 10 0 1 0 12.92 12.92 1 1 0 0 0-.14-1.05Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        d="M6.7 9.29a1 1 0 0 1 1.41 0L12 13.17l3.89-3.88a1 1 0 1 1 1.41 1.41l-4.6 4.6a1 1 0 0 1-1.41 0l-4.6-4.6a1 1 0 0 1 0-1.41Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.24 7.76-5.34 5.34a1 1 0 0 1-1.41 0l-1.73-1.73a1 1 0 0 1 1.41-1.41l1.02 1.02 4.63-4.63a1 1 0 1 1 1.41 1.41Z"
        fill="currentColor"
      />
    </Icon>
  );
}
