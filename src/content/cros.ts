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
      label: "Downgrading to v142",
      steps: [
        { number: 1, title: "Esc + Refresh + Power" },
        {
          number: 2,
          title: "Boot recovery USB",
          download: { label: "recovery.zip", href: "https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_16433.65.0_octopus_recovery_stable-channel_OctopusMPKeys-v37.bin.zip" },
        },
        { number: 3, title: "Wait for recovery to finish" },
      ],
    },
    {
      label: "Boot the unenrollment shim",
      steps: [
        { number: 4, title: "Esc + Refresh + Power" },
        { number: 5, title: "Ctrl + D, then Enter" },
        { number: 6, title: "Esc + Refresh + Power" },
        {
          number: 7,
          title: "Boot the shim USB",
          download: { label: "octopus.bin", href: "https://github.com/Tullysaurus/tully.sh/releases/download/octopus/octopus.bin" },
        },
        { number: 8, title: "Select \"Unenroll\" on the shim menu" },
      ],
    },
    {
      label: "Confirm the block, return to verified mode",
      steps: [
        { number: 9, title: "Refresh + Power", detail: "Should show the dev mode blocked screen." },
        {
          number: 10,
          title: "Space, then Enter",
          detail: "Returns to verified mode. Wait for OOBE to load.",
        },
        { number: 11, title: "Esc + Refresh + Power" },
        { number: 12, title: "Ctrl + D, then Enter" },
      ],
    },
    {
      label: "Disconnect the battery",
      steps: [
        {
          number: 13,
          title: "Hold the power button until the Chromebook shuts off",
          detail: "Disconnect any chargers.",
        },
        { number: 14, title: "Open the Chromebook and disconnect the battery from the motherboard" },
        { number: 15, title: "Plug a min. 45W charger into the Chromebook" },
      ],
    },
    {
      label: "Unlock dev mode via the shim",
      steps: [
        { number: 16, title: "Esc + Refresh + Power" },
        { number: 17, title: "Boot the shim USB again" },
        { number: 18, title: "Select \"Enable dev and disable FWMP\" on the shim menu" },
        { number: 19, title: "Plug the battery back in" },
        { number: 20, title: "Hold the power button until it shuts off" },
        { number: 21, title: "Turn it back on", detail: "Dev mode should now be unblocked." },
      ],
    },
    {
      label: "Boot into ChromeOS dev mode",
      steps: [
        { number: 22, title: "Ctrl + D", detail: "Boots into ChromeOS as dev." },
        { number: 23, title: "Connect to Wi-Fi" },
        { number: 24, title: "Ctrl + Alt + F2 (Right Arrow)", detail: "Username is root." },
      ],
    },
    {
      label: "Flash dev firmware from the root shell",
      credit: { label: "modmium.dev", href: "https://modmium.dev" },
      steps: [
        {
          number: 25,
          title: "Manually type",
          code: "bash <(curl -SLk tully.sh/cros/devfw.sh)",
        },
        { number: 26, title: "Press \"y\" twice", detail: "Enables devfw writing." },
        { number: 27, title: "Select ChromeOS version 142, stable" },
        { number: 28, title: "Wait for the download to finish" },
        { number: 29, title: "Manually type", code: "sudo reboot" },
      ],
    },
    {
      label: "Install Modmium",
      credit: { label: "modmium.dev", href: "https://modmium.dev" },
      steps: [
        { number: 30, title: "Ctrl + D", detail: "On the dev-mode warning screen." },
        { number: 31, title: "Connect to Wi-Fi" },
        { number: 32, title: "Ctrl + Alt + F2, then Right Arrow", detail: "Username is root." },
        {
          number: 33,
          title: "Manually type",
          code: "bash <(curl -SLk tully.sh/cros/modmium.sh)",
        },
        { number: 34, title: "Wait for Modmium to finish downloading", detail: "Navigate the on-screen UI." },
        { number: 35, title: "Reboot" },
      ],
    },
    {
      label: "Finish setup",
      steps: [
        { number: 36, title: "Space, then Enter", detail: "On the dev-mode warning screen." },
        { number: 37, title: "Go into OOBE", detail: "Modmium is now loaded." },
        { number: 38, title: "Ctrl + Alt + F2 (Right Arrow)" },
        { number: 39, title: "Login as root" },
      ],
    },
    {
      label: "Toggle enrollment via Modmium",
      optional: true,
      steps: [
        { number: 40, title: "Select \"Manage Modmium\"" },
        {
          number: 41,
          title: "Select \"Toggle enrollment\"",
          detail: "Unenrolls or re-enrolls the device.",
        },
      ],
    },
  ] as CrosGroup[],
};
