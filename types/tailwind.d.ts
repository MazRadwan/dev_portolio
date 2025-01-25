// types/tailwind.d.ts
declare module "@tailwindcss/typography";
declare module "@tailwindcss/forms";

// If you need to add custom utility classes
declare module "tailwindcss/types/generated/index" {
  interface CustomUtilities {
    "custom-class": string;
    // Add more custom utilities here
  }
}
