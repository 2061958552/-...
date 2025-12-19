globalThis.process ??= {}; globalThis.process.env ??= {};
import { D as decodeKey } from './chunks/astro/server_fmyx3i6w.mjs';
import './chunks/astro-designed-error-pages_DaT9R5Tl.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_9qUH6NpQ.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///workspaces/astro-blog-starter-template/","cacheDir":"file:///workspaces/astro-blog-starter-template/node_modules/.astro/","outDir":"file:///workspaces/astro-blog-starter-template/dist/","srcDir":"file:///workspaces/astro-blog-starter-template/src/","publicDir":"file:///workspaces/astro-blog-starter-template/public/","buildClientDir":"file:///workspaces/astro-blog-starter-template/dist/","buildServerDir":"file:///workspaces/astro-blog-starter-template/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://example.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/workspaces/astro-blog-starter-template/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["/workspaces/astro-blog-starter-template/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/workspaces/astro-blog-starter-template/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/workspaces/astro-blog-starter-template/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/astro-blog-starter-template/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BK0eY_X3.mjs","/workspaces/astro-blog-starter-template/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/workspaces/astro-blog-starter-template/.astro/content-assets.mjs":"chunks/content-assets_XqCgPAV2.mjs","/workspaces/astro-blog-starter-template/.astro/content-modules.mjs":"chunks/content-modules_Bn-OFW-d.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BhzKwQBH.mjs","/workspaces/astro-blog-starter-template/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DdMqSMS-.mjs","/workspaces/astro-blog-starter-template/src/content/blog/using-mdx.mdx?astroPropagatedAssets":"chunks/using-mdx_CQ8LCVb_.mjs","/workspaces/astro-blog-starter-template/src/content/blog/using-mdx.mdx":"chunks/using-mdx_B-Fi7Auh.mjs","/workspaces/astro-blog-starter-template/src/layouts/BlogPost.astro?astro&type=script&index=0&lang.ts":"_astro/BlogPost.astro_astro_type_script_index_0_lang.B6Hlsaa8.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/workspaces/astro-blog-starter-template/src/layouts/BlogPost.astro?astro&type=script&index=0&lang.ts","(function(){if(typeof window>\"u\")return;const t=document.querySelectorAll(\".carousel\");if(!t||t.length===0)return;const o=()=>{if(document.querySelector(\"script[data-carousel-loaded]\"))return;const e=document.createElement(\"script\");e.type=\"module\",e.src=\"/js/carousel.js\",e.setAttribute(\"data-carousel-loaded\",\"1\"),document.body.appendChild(e)};if(\"IntersectionObserver\"in window){const e=new IntersectionObserver((r,n)=>{r.forEach(s=>{s.isIntersecting&&(o(),n.disconnect())})},{rootMargin:\"300px\"});t.forEach(r=>e.observe(r))}else window.requestIdleCallback?window.requestIdleCallback(o):window.addEventListener(\"load\",o)})();"]],"assets":["/_astro/about.DZ073S2t.css","/_astro/about.BcvE-Fdh.css","/blog-placeholder-1.jpg","/blog-placeholder-2.jpg","/blog-placeholder-3.jpg","/blog-placeholder-4.jpg","/blog-placeholder-5.jpg","/blog-placeholder-about.jpg","/favicon.svg","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/index.js","/_worker.js/noop-entrypoint.mjs","/_worker.js/renderers.mjs","/fonts/atkinson-bold.woff","/fonts/atkinson-regular.woff","/js/carousel.js","/_worker.js/_astro/about.BcvE-Fdh.css","/_worker.js/_astro/about.DZ073S2t.css","/_worker.js/chunks/BlogPost_DnfbN9q7.mjs","/_worker.js/chunks/Footer_FChxFHGt.mjs","/_worker.js/chunks/FormattedDate_DeAl7wQ8.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_D1gKp26i.mjs","/_worker.js/chunks/_astro_assets_D7z-0fMz.mjs","/_worker.js/chunks/_astro_content_CH_G6H8m.mjs","/_worker.js/chunks/_astro_data-layer-content_BhzKwQBH.mjs","/_worker.js/chunks/astro-designed-error-pages_DaT9R5Tl.mjs","/_worker.js/chunks/astro_BC-PeHwK.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/consts_RuuxQety.mjs","/_worker.js/chunks/content-assets_XqCgPAV2.mjs","/_worker.js/chunks/content-modules_Bn-OFW-d.mjs","/_worker.js/chunks/index_CYqRjjbM.mjs","/_worker.js/chunks/noop-middleware_9qUH6NpQ.mjs","/_worker.js/chunks/parse_CegSp81i.mjs","/_worker.js/chunks/path_BgNISshD.mjs","/_worker.js/chunks/remote_CrdlObHx.mjs","/_worker.js/chunks/sharp_DdMqSMS-.mjs","/_worker.js/chunks/using-mdx_B-Fi7Auh.mjs","/_worker.js/chunks/using-mdx_CQ8LCVb_.mjs","/_worker.js/pages/about.astro.mjs","/_worker.js/pages/blog.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/rss.xml.astro.mjs","/_worker.js/chunks/astro/server_fmyx3i6w.mjs","/_worker.js/pages/blog/_---slug_.astro.mjs","/about/index.html","/blog/index.html","/rss.xml","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"TPKBg/yFfe1BZ8NtvCECC4BA1nVRRBtkK36xmydxZEg=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
