import type { Config } from "tailwindcss";
import { colors } from "./theme/colors";
import { typography } from "./theme/typography";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: colors.brand.purple,
          deep: colors.brand.deepPurple,
          blue: colors.brand.blue,
          green: colors.brand.green,
        },
        semantic: {
          success: colors.semantic.success,
          warning: colors.semantic.warning,
          streak: colors.semantic.streak,
          error: colors.semantic.error,
          info: colors.semantic.info,
        },
        neutral: {
          primary: colors.neutral.primary,
          secondary: colors.neutral.secondary,
          border: colors.neutral.border,
          surface: colors.neutral.surface,
          background: colors.neutral.background,
        },
      },
      fontFamily: {
        poppins: typography.fontFamily.poppins,
      },
      fontSize: typography.fontSize,
      boxShadow: {
        card: "0px 10px 30px rgba(13, 19, 43, 0.08)",
      },
    },
  },
};

export default config;
