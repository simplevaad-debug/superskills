type EventParams = Record<string, string | number | boolean>;

export function pushEvent(event: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export const analytics = {
  purchaseClick: () => pushEvent("purchase_click", { value: 50, currency: "USD" }),
  purchaseComplete: () => pushEvent("purchase_complete", { value: 50, currency: "USD" }),
  downloadClick: () => pushEvent("download_click"),
  languageChange: (locale: string) => pushEvent("language_change", { locale }),
  skillSearch: (query: string) => pushEvent("skill_search", { search_term: query }),
  faqExpand: (question: string) => pushEvent("faq_expand", { question }),
};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
