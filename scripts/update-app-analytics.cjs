const fs = require('fs');
const path = require('path');

const appFiles = [
  path.resolve(__dirname, '../fuji-japanese-institute/App.tsx'),
  path.resolve(__dirname, '../fuji-japanese-in/App.tsx'),
];

appFiles.forEach((file) => {
  if (!fs.existsSync(file)) {
    console.error(`Not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('AnalyticsTracker')) {
    console.log(`AnalyticsTracker already present in ${path.basename(path.dirname(file))}/App.tsx`);
    return;
  }

  // Add import
  const importTarget = "import ErrorBoundary from './components/ErrorBoundary';";
  const importReplacement = "import ErrorBoundary from './components/ErrorBoundary';\nimport { initGlobalClickTracking, trackPageView } from './src/lib/analytics';";

  if (!content.includes(importTarget)) {
    console.error(`Import target not found in ${file}`);
    return;
  }
  content = content.replace(importTarget, importReplacement);

  // Add AnalyticsTracker component definition before App
  const trackerComponent = `
const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const cleanup = initGlobalClickTracking();
    return cleanup;
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search]);

  return null;
};
`;

  const appTarget = 'const App: React.FC = () => {';
  if (!content.includes(appTarget)) {
    console.error(`App target not found in ${file}`);
    return;
  }
  content = content.replace(appTarget, `${trackerComponent}\n${appTarget}`);

  // Place <AnalyticsTracker /> inside <BrowserRouter>
  const browserTarget = '<BrowserRouter>\n      <ScrollToTop />';
  const browserTargetCRLF = '<BrowserRouter>\r\n      <ScrollToTop />';

  if (content.includes(browserTargetCRLF)) {
    content = content.replace(browserTargetCRLF, '<BrowserRouter>\r\n      <ScrollToTop />\r\n      <AnalyticsTracker />');
  } else if (content.includes(browserTarget)) {
    content = content.replace(browserTarget, '<BrowserRouter>\n      <ScrollToTop />\n      <AnalyticsTracker />');
  } else {
    content = content.replace('<ScrollToTop />', '<ScrollToTop />\n      <AnalyticsTracker />');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully added AnalyticsTracker to ${path.basename(path.dirname(file))}/App.tsx`);
});
