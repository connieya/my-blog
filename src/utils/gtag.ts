export const GA_TRACKING_ID = 'G-JXZM30V5RY';

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
