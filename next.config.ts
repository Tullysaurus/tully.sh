import type { NextConfig } from "next";



// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();


const nextConfig: NextConfig = {
	/* config options here */
	devIndicators: false,
	serverExternalPackages: ["@prisma/client", ".prisma/client"]
};

export default nextConfig;
