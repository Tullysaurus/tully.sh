import { paths } from "@/config/paths";

export interface CrosStep {
  number: number;
  title: string;
  detail?: string;
  code?: string;
  download?: { label: string; href: string };
}

export interface CrosGroup {
  label: string;
  optional?: boolean;
  credit?: { label: string; href: string };
  steps: CrosStep[];
}

export const crosPage = {
  path: paths.home,
  command: "cat cros/README.md",
  title: "ChromeOS Firmware Manual",
  updated: "Last updated: August 2026",
  intro:
    "Step-by-step instructions for unlocking dev mode, reflashing firmware, and installing Modmium on a managed Chromebook. Follow the steps in order — skipping ahead or running a script out of sequence can leave the device unbootable.",
  warning:
    "This process is destructive and will unenroll the device from management. Only run it on hardware you own or have explicit permission to modify.",
  groups: [
    {
      label: "Boot the recovery shim",
      steps: [
        { number: 1, title: "Esc + Refresh + Power" },
        { number: 2, title: "Ctrl + D" },
        { number: 3, title: "Esc + Refresh + Power" },
        {
          number: 4,
          title: "Boot the shim USB (octopus.bin)",
          detail: "Select \"Unenroll\" on the shim menu.",
          download: { label: "octopus.bin", href: "https://github.com/Tullysaurus/tully.sh/releases/download/octopus/octopus.bin" },
        },
      ],
    },
    {
      label: "Confirm the block, return to verified mode",
      steps: [
        { number: 5, title: "Refresh + Power", detail: "Should show the dev mode blocked screen." },
        {
          number: 6,
          title: "Space, then Enter",
          detail: "Returns to verified mode. Wait for OOBE to load.",
        },
        { number: 7, title: "Esc + Refresh + Power" },
        { number: 8, title: "Ctrl + D" },
      ],
    },
    {
      label: "Disconnect the battery",
      steps: [
        {
          number: 9,
          title: "Hold the power button until the Chromebook shuts off",
          detail: "Disconnect any chargers.",
        },
        { number: 10, title: "Open the Chromebook and disconnect the battery from the motherboard" },
        { number: 11, title: "Plug a min. 45W charger into the Chromebook" },
      ],
    },
    {
      label: "Unlock dev mode via the shim",
      steps: [
        { number: 12, title: "Esc + Refresh + Power" },
        {
          number: 13,
          title: "Boot the shim USB again",
          detail: "Select \"Enable dev and disable FWMP\" on the shim menu.",
        },
        { number: 14, title: "Plug the battery back in" },
        { number: 15, title: "Hold the power button until it shuts off" },
        { number: 16, title: "Turn it back on", detail: "Dev mode should now be unblocked." },
      ],
    },
    {
      label: "Boot into ChromeOS dev mode",
      steps: [
        { number: 17, title: "Ctrl + D", detail: "Boots into ChromeOS as dev." },
        { number: 18, title: "Connect to Wi-Fi" },
        { number: 19, title: "Ctrl + Alt + F2 (Right Arrow)", detail: "Username is root." },
      ],
    },
    {
      label: "Flash stock firmware from the root shell",
      credit: { label: "modmium.dev", href: "https://modmium.dev" },
      steps: [
        {
          number: 20,
          title: "Manually type",
          code: "bash <(curl -SLk tully.sh/cros/devfw.sh)",
        },
        { number: 21, title: "Press \"y\" twice", detail: "Enables devfw writing." },
        { number: 22, title: "Select ChromeOS version 142, stable" },
        { number: 23, title: "Wait for the download to finish" },
        { number: 24, title: "Manually type", code: "sudo reboot" },
      ],
    },
    {
      label: "Install Modmium",
      credit: { label: "modmium.dev", href: "https://modmium.dev" },
      steps: [
        { number: 25, title: "Ctrl + D", detail: "On the dev-mode warning screen." },
        { number: 26, title: "Connect to Wi-Fi" },
        { number: 27, title: "Ctrl + Alt + F2, then Right Arrow", detail: "Username is root." },
        {
          number: 28,
          title: "Manually type",
          code: "bash <(curl -SLk tully.sh/cros/modmuim.sh)",
        },
        { number: 29, title: "Wait for Modmium to finish downloading", detail: "Navigate the on-screen UI." },
        { number: 30, title: "Reboot" },
      ],
    },
    {
      label: "Finish setup",
      steps: [
        { number: 31, title: "Space, then Enter", detail: "On the dev-mode warning screen." },
        { number: 32, title: "Go into OOBE", detail: "Modmium is now loaded." },
        { number: 33, title: "Ctrl + Alt + F2 (Right Arrow)" },
        { number: 34, title: "Login as root" },
      ],
    },
    {
      label: "Toggle enrollment via Modmium",
      optional: true,
      steps: [
        { number: 35, title: "Select \"Manage Modmium\"" },
        {
          number: 36,
          title: "Select \"Toggle enrollment\"",
          detail: "Unenrolls or re-enrolls the device.",
        },
      ],
    },
  ] as CrosGroup[],
};
