import { goldenAce, kdLux } from "./case-studies";
import type { CaseStudy, Decision, FlowStep } from "./types";

const decision = (
  title: string,
  problem: string,
  resolution: string,
): Decision => ({ title, problem, resolution });
const step = (
  title: string,
  description: string,
  systems: string[],
): FlowStep => ({ title, description, systems });

export const englishKdLux: CaseStudy = {
  overview:
    "An end-to-end jewelry store built with the Next.js App Router, TypeScript, and PostgreSQL. It includes a product catalog with variants, customer accounts, a cart, Mercado Pago and Melhor Envio checkout, an admin dashboard, payment and tracking webhooks, and transactional emails.",
  architecture: {
    ...kdLux.architecture,
    caption: "Store components and integrations",
    description:
      "The browser connects to Next.js, which uses PostgreSQL through Prisma and Redis for the cart, checkout, rate limits, and token caching. It integrates Mercado Pago, Melhor Envio, ViaCEP, Resend, and Cloudinary. Mercado Pago and Melhor Envio send webhooks back to Route Handlers.",
    nodes: kdLux.architecture.nodes.map((node, index) => ({
      ...node,
      ...[
        { title: "Browser", details: ["Catalog and checkout"] },
        { details: ["Server Components", "Server Actions", "Route Handlers"] },
        {},
        { details: ["Cart · cache · limits"] },
        { title: "External services" },
      ][index],
    })),
  },
  flow: [
    step(
      "Cart",
      "An HTTP-only cookie identifies the visitor and a Redis hash stores the items. At sign-in, the guest cart is merged into the account cart.",
      ["Redis"],
    ),
    step(
      "Shipping",
      "The app looks up the postal code and quotes shipping. Rates are cached for an hour per postal code.",
      ["ViaCEP", "Melhor Envio", "Redis"],
    ),
    step(
      "Discount",
      "Fixed and percentage coupons are checked for validity, minimum order value, discount caps, and usage limits per coupon and per customer.",
      ["PostgreSQL"],
    ),
    step(
      "Payment",
      "Mercado Pago Payment Brick handles Pix, tokenized cards, and boleto. A Server Action receives the payment data.",
      ["Mercado Pago"],
    ),
    step(
      "Server-side confirmation",
      "The server validates items, prices, and inventory and recalculates the discount and shipping total before requesting payment. It records the order, payment, coupon use, and stock deduction in one transaction.",
      ["PostgreSQL", "Prisma"],
    ),
    step(
      "Payment webhook",
      "The server verifies the HMAC signature and checks the provider’s status before updating the order. Cancellation, rejection, or refund restores inventory and reverses coupon use.",
      ["Mercado Pago"],
    ),
    step(
      "Fulfillment",
      "The system creates, pays for, generates, and prints shipping labels. A tracking webhook updates the order.",
      ["Melhor Envio", "Redis"],
    ),
    step(
      "Communication",
      "Transactional emails cover order confirmation with Pix or boleto instructions, admin notifications, labels, and dispatch.",
      ["Resend", "React Email"],
    ),
  ],
  decisions: [
    decision(
      "SKU-based variants",
      "Each product option combination needs its own price and inventory.",
      "Model products, options, values, and SKUs separately. SKUs are unique per product, and the admin form generates the combinations.",
    ),
    decision(
      "Order and inventory consistency",
      "Concurrent requests and partial failures can cause negative stock or consume a coupon without an order.",
      "Use a Prisma transaction to create the order and check stock. Restore inventory and reverse coupon usage in the cancellation webhook.",
    ),
    decision(
      "Server-side validation",
      "Client values and external notifications need verification.",
      "Recalculate prices and totals on the server. Verify webhook signatures and confirm status with the provider. Check roles in routing and Server Actions. Use sliding-window rate limits in Redis.",
    ),
    decision(
      "Reads and caching",
      "Product listings and details are read often and updated occasionally.",
      "Group Next.js cache tags by domain (products, cart, checkout, and orders). Invalidate them on mutations and keep search, sorting, and pagination in the URL.",
    ),
  ],
  features: [
    {
      title: "Catalog",
      description:
        "Collections and categories, debounced search, galleries, reviews with transactionally updated averages, and related products.",
    },
    {
      title: "Account",
      description:
        "Registration with verification code, credential and Google sign-in, password recovery, addresses, and order history.",
    },
    {
      title: "Admin dashboard",
      description:
        "Products, options, SKUs, categories, collections, coupons, and orders, including filters, cancellations, refunds, and labels. Media uploads go to Cloudinary.",
    },
    {
      title: "Development environment",
      description:
        "PostgreSQL in Docker Compose. GitHub Actions runs lint and formatting checks on pull requests.",
    },
  ],
};

export const englishGoldenAce: CaseStudy = {
  overview:
    "A retro arcade in the browser with a 3D cabinet, in-cabinet menus, customizable controls, and an integrated Snake game. A custom API serves the online leaderboard. Built end to end with React, Three.js, and Node.js.",
  architecture: {
    ...goldenAce.architecture,
    caption: "3D scene, Unity integration, and leaderboard API",
    description:
      "The browser runs React, React Three Fiber, Redux Toolkit, and the Web Audio API. The scene exchanges messages with a Unity WebGL build in an iframe. The client calls an Express API backed by PostgreSQL through Prisma. The client and API are hosted separately on Vercel.",
    nodes: goldenAce.architecture.nodes.map((node, index) => ({
      ...node,
      ...[
        { title: "Browser" },
        {},
        { title: "Express API", details: ["Routes · controllers · services"] },
        {},
      ][index],
    })),
  },
  decisions: [
    decision(
      "Interface within the 3D scene",
      "Menus and gameplay need to appear on the cabinet screen.",
      "Project HTML onto the 3D surface with Drei and keep the menus and game as React components.",
    ),
    decision(
      "Communicating with Unity",
      "The game runs inside an isolated iframe.",
      "Send key bindings and volume through SendMessage, replay keyboard events in the iframe, and listen for messages sent back by the game.",
    ),
    decision(
      "Hosting the WebGL build",
      "Unity assets require specific headers.",
      "Configure Brotli Content-Encoding and the correct MIME types for JavaScript, WebAssembly, and data files.",
    ),
    decision(
      "Leaderboard",
      "The ranking has a fixed size and accepts scores from the client.",
      "Keep ten scores in descending order and replace the lowest when a higher score arrives. Validate submissions with a SHA-256 hash.",
    ),
  ],
  features: [
    {
      title: "Controls",
      description:
        "Pointer and keyboard joystick with customizable key bindings.",
    },
    {
      title: "Settings",
      description: "Brightness and volume saved in localStorage.",
    },
    {
      title: "Audio",
      description: "Load and decode sounds using the Web Audio API.",
    },
    {
      title: "Leaderboard",
      description: "Read and submit scores through two HTTP operations.",
    },
  ],
};
