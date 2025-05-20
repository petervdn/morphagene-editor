import { jsxDEV as _jsxDEV } from "/node_modules/.vite/deps/@emotion_react_jsx-dev-runtime.js?v=782f288c";
import PlatformApiSdk from "/node_modules/.vite/deps/@monksflow_platform-api-sdk.js?v=782f288c";
import * as Sentry from "/node_modules/.vite/deps/@sentry_react.js?v=782f288c";
import { createRouter, RouterProvider } from "/node_modules/.vite/deps/@tanstack_react-router.js?v=782f288c";
import { SnackbarProvider } from "/node_modules/.vite/deps/notistack.js?v=782f288c";
import __vite__cjsImport5_react from "/node_modules/.vite/deps/react.js?v=782f288c"; const React = __vite__cjsImport5_react.__esModule ? __vite__cjsImport5_react.default : __vite__cjsImport5_react;
import __vite__cjsImport6_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=782f288c"; const ReactDOM = __vite__cjsImport6_reactDom_client.__esModule ? __vite__cjsImport6_reactDom_client.default : __vite__cjsImport6_reactDom_client;
import { GridApiProvider } from "/src/components/organisms/AssetItemsGrid/context/GridApiProvider.tsx";
import { globalThisConfiguration } from "/src/constants/configuration.ts";
import { routeTree } from "/src/routeTree.gen.ts?t=1747735910724";
import { Themed } from "/src/theme.tsx";
Sentry.init({
  dsn: "https://52cec8ac11636e36de6613829121e4ad@o4507532570525696.ingest.de.sentry.io/4507538886492240",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  tracesSampleRate: 1,
  tracePropagationTargets: [
    "localhost"
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  enabled: false,
  environment: globalThisConfiguration.environment
});
PlatformApiSdk.init({
  platformAppUrl: globalThisConfiguration.platformUrl,
  platformApiUrl: globalThisConfiguration.platformApiUrl,
  withAuthInterceptor: false
});
const router = createRouter({
  routeTree
});
const rootElement = document.querySelector("#root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(/* @__PURE__ */ _jsxDEV(React.StrictMode, {
    children: /* @__PURE__ */ _jsxDEV(Themed, {
      children: /* @__PURE__ */ _jsxDEV(GridApiProvider, {
        children: /* @__PURE__ */ _jsxDEV(SnackbarProvider, {
          children: /* @__PURE__ */ _jsxDEV(RouterProvider, {
            router
          }, void 0, false, {
            fileName: "/Users/petervandernoord/projects/monksflow-content-engine-toolkit-240137853-cetool/packages/frontend/src/main.tsx",
            lineNumber: 47,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: "/Users/petervandernoord/projects/monksflow-content-engine-toolkit-240137853-cetool/packages/frontend/src/main.tsx",
          lineNumber: 46,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: "/Users/petervandernoord/projects/monksflow-content-engine-toolkit-240137853-cetool/packages/frontend/src/main.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: "/Users/petervandernoord/projects/monksflow-content-engine-toolkit-240137853-cetool/packages/frontend/src/main.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: "/Users/petervandernoord/projects/monksflow-content-engine-toolkit-240137853-cetool/packages/frontend/src/main.tsx",
    lineNumber: 43,
    columnNumber: 5
  }, this));
} else {
  console.error("No root element found");
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU9BLG9CQUFvQjtBQUMzQixZQUFZQyxZQUFZO0FBQ3hCLFNBQVNDLGNBQWNDLHNCQUFzQjtBQUM3QyxTQUFTQyx3QkFBd0I7QUFDakMsT0FBT0MsV0FBVztBQUNsQixPQUFPQyxjQUFjO0FBQ3JCLFNBQVNDLHVCQUF1QjtBQUNoQyxTQUFTQywrQkFBK0I7QUFDeEMsU0FBU0MsaUJBQWlCO0FBQzFCLFNBQVNDLGNBQWM7QUFFdkJULE9BQU9VLEtBQUs7QUFBQSxFQUNWQyxLQUFLO0FBQUEsRUFDTEMsY0FBYztBQUFBLElBQUNaLE9BQU9hLDBCQUF5QjtBQUFBLElBQUliLE9BQU9jLGtCQUFpQjtBQUFBO0VBQzNFQyxrQkFBa0I7QUFBQSxFQUNsQkMseUJBQXlCO0FBQUEsSUFBQztBQUFBO0VBQzFCQywwQkFBMEI7QUFBQSxFQUMxQkMsMEJBQTBCO0FBQUEsRUFDMUJDLFNBQVNDO0FBQUFBLEVBQ1RDLGFBQWFkLHdCQUF3QmM7QUFDdkM7QUFFQXRCLGVBQWVXLEtBQUs7QUFBQSxFQUNsQlksZ0JBQWdCZix3QkFBd0JnQjtBQUFBQSxFQUN4Q0MsZ0JBQWdCakIsd0JBQXdCaUI7QUFBQUEsRUFDeENDLHFCQUFxQjtBQUN2QjtBQUdBLE1BQU1DLFNBQVN6QixhQUFhO0FBQUEsRUFBRU87QUFBVTtBQVN4QyxNQUFNbUIsY0FBY0MsU0FBU0MsY0FBYztBQUUzQyxJQUFJRixhQUFhO0FBQ2Z0QixXQUFTeUIsV0FBV0gsYUFBYUksT0FDL0Isd0JBQUMzQixNQUFNNEIsWUFBVTtBQUFBLGNBQ2Ysd0JBQUN2QjtBQUFBQSxnQkFDQyx3QkFBQ0g7QUFBQUEsa0JBQ0Msd0JBQUNIO0FBQUFBLG9CQUNDLHdCQUFDRDtBQUFBQSxZQUFld0I7QUFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNNUIsT0FBTztBQUVMTyxVQUFRQyxNQUFNO0FBQ2hCIiwibmFtZXMiOlsiUGxhdGZvcm1BcGlTZGsiLCJTZW50cnkiLCJjcmVhdGVSb3V0ZXIiLCJSb3V0ZXJQcm92aWRlciIsIlNuYWNrYmFyUHJvdmlkZXIiLCJSZWFjdCIsIlJlYWN0RE9NIiwiR3JpZEFwaVByb3ZpZGVyIiwiZ2xvYmFsVGhpc0NvbmZpZ3VyYXRpb24iLCJyb3V0ZVRyZWUiLCJUaGVtZWQiLCJpbml0IiwiZHNuIiwiaW50ZWdyYXRpb25zIiwiYnJvd3NlclRyYWNpbmdJbnRlZ3JhdGlvbiIsInJlcGxheUludGVncmF0aW9uIiwidHJhY2VzU2FtcGxlUmF0ZSIsInRyYWNlUHJvcGFnYXRpb25UYXJnZXRzIiwicmVwbGF5c1Nlc3Npb25TYW1wbGVSYXRlIiwicmVwbGF5c09uRXJyb3JTYW1wbGVSYXRlIiwiZW5hYmxlZCIsInByb2Nlc3MiLCJlbnZpcm9ubWVudCIsInBsYXRmb3JtQXBwVXJsIiwicGxhdGZvcm1VcmwiLCJwbGF0Zm9ybUFwaVVybCIsIndpdGhBdXRoSW50ZXJjZXB0b3IiLCJyb3V0ZXIiLCJyb290RWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZVJvb3QiLCJyZW5kZXIiLCJTdHJpY3RNb2RlIiwiY29uc29sZSIsImVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIm1haW4udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0Zm9ybUFwaVNkayBmcm9tICdAbW9ua3NmbG93L3BsYXRmb3JtLWFwaS1zZGsnO1xuaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvcmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlUm91dGVyLCBSb3V0ZXJQcm92aWRlciB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgU25hY2tiYXJQcm92aWRlciB9IGZyb20gJ25vdGlzdGFjayc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbS9jbGllbnQnO1xuaW1wb3J0IHsgR3JpZEFwaVByb3ZpZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL29yZ2FuaXNtcy9Bc3NldEl0ZW1zR3JpZC9jb250ZXh0L0dyaWRBcGlQcm92aWRlci50c3gnO1xuaW1wb3J0IHsgZ2xvYmFsVGhpc0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2NvbnN0YW50cy9jb25maWd1cmF0aW9uLnRzJztcbmltcG9ydCB7IHJvdXRlVHJlZSB9IGZyb20gJy4vcm91dGVUcmVlLmdlbi50cyc7XG5pbXBvcnQgeyBUaGVtZWQgfSBmcm9tICcuL3RoZW1lLnRzeCc7XG5cblNlbnRyeS5pbml0KHtcbiAgZHNuOiAnaHR0cHM6Ly81MmNlYzhhYzExNjM2ZTM2ZGU2NjEzODI5MTIxZTRhZEBvNDUwNzUzMjU3MDUyNTY5Ni5pbmdlc3QuZGUuc2VudHJ5LmlvLzQ1MDc1Mzg4ODY0OTIyNDAnLFxuICBpbnRlZ3JhdGlvbnM6IFtTZW50cnkuYnJvd3NlclRyYWNpbmdJbnRlZ3JhdGlvbigpLCBTZW50cnkucmVwbGF5SW50ZWdyYXRpb24oKV0sXG4gIHRyYWNlc1NhbXBsZVJhdGU6IDEsXG4gIHRyYWNlUHJvcGFnYXRpb25UYXJnZXRzOiBbJ2xvY2FsaG9zdCddLFxuICByZXBsYXlzU2Vzc2lvblNhbXBsZVJhdGU6IDAuMSxcbiAgcmVwbGF5c09uRXJyb3JTYW1wbGVSYXRlOiAxLFxuICBlbmFibGVkOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxuICBlbnZpcm9ubWVudDogZ2xvYmFsVGhpc0NvbmZpZ3VyYXRpb24uZW52aXJvbm1lbnQsXG59KTtcblxuUGxhdGZvcm1BcGlTZGsuaW5pdCh7XG4gIHBsYXRmb3JtQXBwVXJsOiBnbG9iYWxUaGlzQ29uZmlndXJhdGlvbi5wbGF0Zm9ybVVybCxcbiAgcGxhdGZvcm1BcGlVcmw6IGdsb2JhbFRoaXNDb25maWd1cmF0aW9uLnBsYXRmb3JtQXBpVXJsLFxuICB3aXRoQXV0aEludGVyY2VwdG9yOiBmYWxzZSxcbn0pO1xuXG4vLyBoYXMgdG8gYmUgYWZ0ZXIgcGxhdGZvcm0gaW5pdCwgb3RoZXJ3aXNlIGl0IHN0YXJ0cyBjYWxsaW5nIHRoZSByb3V0ZSBsb2FkZXJzIHRvbyBzb29uXG5jb25zdCByb3V0ZXIgPSBjcmVhdGVSb3V0ZXIoeyByb3V0ZVRyZWUgfSk7XG5cbi8vIFJlZ2lzdGVyIHRoZSByb3V0ZXIgaW5zdGFuY2UgZm9yIHR5cGUgc2FmZXR5XG5kZWNsYXJlIG1vZHVsZSAnQHRhbnN0YWNrL3JlYWN0LXJvdXRlcicge1xuICBpbnRlcmZhY2UgUmVnaXN0ZXIge1xuICAgIHJvdXRlcjogdHlwZW9mIHJvdXRlcjtcbiAgfVxufVxuXG5jb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb290Jyk7XG5cbmlmIChyb290RWxlbWVudCkge1xuICBSZWFjdERPTS5jcmVhdGVSb290KHJvb3RFbGVtZW50KS5yZW5kZXIoXG4gICAgPFJlYWN0LlN0cmljdE1vZGU+XG4gICAgICA8VGhlbWVkPlxuICAgICAgICA8R3JpZEFwaVByb3ZpZGVyPlxuICAgICAgICAgIDxTbmFja2JhclByb3ZpZGVyPlxuICAgICAgICAgICAgPFJvdXRlclByb3ZpZGVyIHJvdXRlcj17cm91dGVyfSAvPlxuICAgICAgICAgIDwvU25hY2tiYXJQcm92aWRlcj5cbiAgICAgICAgPC9HcmlkQXBpUHJvdmlkZXI+XG4gICAgICA8L1RoZW1lZD5cbiAgICA8L1JlYWN0LlN0cmljdE1vZGU+LFxuICApO1xufSBlbHNlIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgY29uc29sZS5lcnJvcignTm8gcm9vdCBlbGVtZW50IGZvdW5kJyk7XG59XG4iXSwiZmlsZSI6Ii9Vc2Vycy9wZXRlcnZhbmRlcm5vb3JkL3Byb2plY3RzL21vbmtzZmxvdy1jb250ZW50LWVuZ2luZS10b29sa2l0LTI0MDEzNzg1My1jZXRvb2wvcGFja2FnZXMvZnJvbnRlbmQvc3JjL21haW4udHN4In0=