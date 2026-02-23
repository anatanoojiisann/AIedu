export type Locale = "en" | "zh";

export const dictionaries = {
  en: {
    nav: {
      home: "Home",
      business: "Business",
      integrations: "Integrations",
      pricing: "Pricing",
      security: "Security",
      resources: "Resources",
      login: "Login"
    },
    cta: {
      demo: "Book a demo",
      pilot: "Start a pilot",
      exploreIntegrations: "Explore integrations",
      viewSecurity: "View security"
    },
    form: {
      titleDemo: "Book a demo",
      titlePilot: "Start a pilot",
      success: "Request received. Our team will contact you in 1 business day.",
      error: "Submission failed. Please retry.",
      saved: "Saved locally"
    },
  },
  zh: {
    nav: {
      home: "首页",
      business: "商业价值",
      integrations: "集成",
      pricing: "定价",
      security: "安全",
      resources: "资源",
      login: "登录"
    },
    cta: {
      demo: "预约演示",
      pilot: "启动试点",
      exploreIntegrations: "查看集成",
      viewSecurity: "查看安全"
    },
    form: {
      titleDemo: "预约演示",
      titlePilot: "启动试点",
      success: "提交成功，我们将在1个工作日内联系您。",
      error: "提交失败，请重试。",
      saved: "已保存到本地"
    },
  }
} as const;
