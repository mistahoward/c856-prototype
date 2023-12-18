"use strict";(self.webpackChunkc856_prototype=self.webpackChunkc856_prototype||[]).push([[991],{2899:function(e,t,n){n.d(t,{Z:function(){return O}});var a=n(7294),r=n(4051),i=n(1555),o=n(5005);const s=1;const l=(0,a.createContext)(null),c=l.Provider;function u(){const e=(0,a.useContext)(l);if(null==e)throw new Error("No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>");return e}var f=n(5243);function d(){return d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},d.apply(this,arguments)}function p({bounds:e,boundsOptions:t,center:n,children:r,className:i,id:o,placeholder:l,style:u,whenReady:p,zoom:m,...h},g){const[v]=(0,a.useState)({className:i,id:o,style:u}),[y,b]=(0,a.useState)(null);(0,a.useImperativeHandle)(g,(()=>y?.map??null),[y]);const w=(0,a.useCallback)((a=>{if(null!==a&&null===y){const r=new f.Map(a,h);null!=n&&null!=m?r.setView(n,m):null!=e&&r.fitBounds(e,t),null!=p&&r.whenReady(p),b(function(e){return Object.freeze({__version:s,map:e})}(r))}}),[]);(0,a.useEffect)((()=>()=>{y?.map.remove()}),[y]);const E=y?a.createElement(c,{value:y},r):l??null;return a.createElement("div",d({},v,{ref:w}),E)}const m=(0,a.forwardRef)(p);var h=n(3935);function g(e,t,n){return Object.freeze({instance:e,context:t,container:n})}function v(e,t){return null==t?function(t,n){const r=(0,a.useRef)();return r.current||(r.current=e(t,n)),r}:function(n,r){const i=(0,a.useRef)();i.current||(i.current=e(n,r));const o=(0,a.useRef)(n),{instance:s}=i.current;return(0,a.useEffect)((function(){o.current!==n&&(t(s,n,o.current),o.current=n)}),[s,n,r]),i}}function y(e,t){const n=(0,a.useRef)(t);(0,a.useEffect)((function(){t!==n.current&&null!=e.attributionControl&&(null!=n.current&&e.attributionControl.removeAttribution(n.current),null!=t&&e.attributionControl.addAttribution(t)),n.current=t}),[e,t])}function b(e,t){const n=(0,a.useRef)();(0,a.useEffect)((function(){return null!=t&&e.instance.on(t),n.current=t,function(){null!=n.current&&e.instance.off(n.current),n.current=null}}),[e,t])}function w(e,t){const n=e.pane??t.pane;return n?{...e,pane:n}:e}function E(e){return function(t){const n=u(),r=e(w(t,n),n);return y(n.map,t.attribution),b(r.current,t.eventHandlers),function(e,t){(0,a.useEffect)((function(){return(t.layerContainer??t.map).addLayer(e.instance),function(){t.layerContainer?.removeLayer(e.instance),t.map.removeLayer(e.instance)}}),[t,e])}(r.current,n),r}}const k=function(e){function t(t,n){const{instance:r}=e(t).current;return(0,a.useImperativeHandle)(n,(()=>r)),null}return(0,a.forwardRef)(t)}(E(v((function({url:e,...t},n){return g(new f.TileLayer(e,w(t,n)),n)}),(function(e,t,n){!function(e,t,n){const{opacity:a,zIndex:r}=t;null!=a&&a!==n.opacity&&e.setOpacity(a),null!=r&&r!==n.zIndex&&e.setZIndex(r)}(e,t,n);const{url:a}=t;null!=a&&a!==n.url&&e.setUrl(a)}))));const C=function(e,t){return function(e){function t(t,n){const{instance:r,context:i}=e(t).current;return(0,a.useImperativeHandle)(n,(()=>r)),null==t.children?null:a.createElement(c,{value:i},t.children)}return(0,a.forwardRef)(t)}(E(v(e,t)))}((function({position:e,...t},n){const a=new f.Marker(e,t);return g(a,(r=n,i={overlayContainer:a},Object.freeze({...r,...i})));var r,i}),(function(e,t,n){t.position!==n.position&&e.setLatLng(t.position),null!=t.icon&&t.icon!==n.icon&&e.setIcon(t.icon),null!=t.zIndexOffset&&t.zIndexOffset!==n.zIndexOffset&&e.setZIndexOffset(t.zIndexOffset),null!=t.opacity&&t.opacity!==n.opacity&&e.setOpacity(t.opacity),null!=e.dragging&&t.draggable!==n.draggable&&(!0===t.draggable?e.dragging.enable():e.dragging.disable())})),Z=function(e,t){const n=function(e,t){return function(n,a){const r=u(),i=e(w(n,r),r);return y(r.map,n.attribution),b(i.current,n.eventHandlers),t(i.current,r,n,a),i}}(v(e),t);return function(e){function t(t,n){const[r,i]=(0,a.useState)(!1),{instance:o}=e(t,i).current;(0,a.useImperativeHandle)(n,(()=>o)),(0,a.useEffect)((function(){r&&o.update()}),[o,r,t.children]);const s=o._contentNode;return s?(0,h.createPortal)(t.children,s):null}return(0,a.forwardRef)(t)}(n)}((function(e,t){return g(new f.Popup(e,t.overlayContainer),t)}),(function(e,t,{position:n},r){(0,a.useEffect)((function(){const{instance:a}=e;function i(e){e.popup===a&&(a.update(),r(!0))}function o(e){e.popup===a&&r(!1)}return t.map.on({popupopen:i,popupclose:o}),null==t.overlayContainer?(null!=n&&a.setLatLng(n),a.openOn(t.map)):t.overlayContainer.bindPopup(a),function(){t.map.off({popupopen:i,popupclose:o}),t.overlayContainer?.unbindPopup(),t.map.removeLayer(a)}}),[e,t,r,n])}));var x=n(4160),T=n(3025);var I=e=>{let{locations:t,title:n="Markers",map:i,openPopup:o}=e;return a.createElement("div",{className:"markers-sidebar"},a.createElement("h3",null,n),t.map(((e,t)=>a.createElement(r.Z,{key:`${e.id}-row`,className:"mb-2 location-card",onClick:()=>{i.setView(e.coordinates,13),o(t)}},a.createElement(T.Z,null,a.createElement(T.Z.Img,{variant:"top",width:300,height:225,src:e.image}),a.createElement(T.Z.Body,null,a.createElement(T.Z.Title,null,e.title),a.createElement(T.Z.Text,null,e.description)))))))};var O=e=>{let{locations:t,type:n}=e;const s=[-16.5004,-151.7415],{0:l,1:c}=(0,a.useState)(null),u=(0,a.useRef)([]),f=(0,a.useMemo)((()=>a.createElement(m,{center:s,zoom:13,scrollWheelZoom:!1,ref:c},a.createElement(k,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),t.map(((e,t)=>a.createElement(C,{key:e.id,position:e.coordinates,ref:e=>{u.current[t]=e}},a.createElement(Z,null,a.createElement(r.Z,{className:"mb-1"},a.createElement(i.Z,null,a.createElement("img",{src:e.image,width:"100%",alt:e.title}))),a.createElement(r.Z,{className:"mb-1"},a.createElement(i.Z,null,a.createElement("h4",null,e.title))),a.createElement(r.Z,null,a.createElement(i.Z,null,a.createElement(o.Z,{className:"w-100",variant:"primary",onClick:()=>{(0,x.c4)((0,x.dq)(`/${n}/?${e.id}`))}},"See More"))))))))),[]);return a.createElement("div",{className:"map-container"},a.createElement(I,{openPopup:e=>{u.current[e]&&u.current[e].openPopup()},map:l,title:"Accommodations",locations:t}),f)}},6640:function(e,t){t.Z=[{id:1,title:"Matira Beach",detailed_description:"Matira Beach, known as Taniti's public gem, is famous for its pristine white sands and the crystal-clear turquoise waters of the lagoon. This beach stretches gracefully over a mile and is framed by lush tropical foliage. The beach is a haven for locals and tourists alike, offering a glimpse into the laid-back island lifestyle. Its shallow waters and gentle waves make it perfect for swimming and snorkeling, revealing a rich underwater world. The beach has historical significance as well, once being a key lookout point during World War II. Today, it stands as a serene escape, where the sunsets paint the sky in vibrant hues, creating a mesmerizing spectacle each evening.",description:"Matira Beach offers a mile of white sands and clear waters, ideal for swimming, snorkeling, and experiencing Taniti's beauty.",coordinates:{lat:-16.5436,lng:-151.7385},image:"/images/matira_beach.jpg"},{id:2,title:"Mount Otemanu",detailed_description:"Mount Otemanu, the highest point on Taniti, rises majestically to a height of 2,385 feet and is an ancient, extinct volcano. Its rugged, green-clad peaks are shrouded in mystery and local legends, often covered in clouds that add to its mystical allure. Hiking trails lead adventurers through dense tropical forests, offering breathtaking panoramic views of the island and surrounding ocean. The mountain is not just a natural wonder but also a cultural treasure. According to local lore, it is the home of the gods and holds a special place in the hearts of the islanders. The flora and fauna here are as diverse as the tales that surround it, making it a must-visit for those seeking to connect with the island's rich heritage and natural beauty.",description:"Mount Otemanu, a mystical extinct volcano, offers hiking trails and panoramic views, rich in natural and cultural significance.",coordinates:{lat:-16.5142,lng:-151.7731},image:"/images/mount_otemanu.jpg"},{id:3,title:"Coral Gardens",detailed_description:"Nestled between the islets of Motu Piti Uu'uta and Motu Piti Aau on Taniti's barrier reef, the Coral Gardens are an underwater spectacle. This shallow reef is a sanctuary for an astonishing variety of marine life, making it a top spot for snorkeling enthusiasts. The gardens boast a vibrant collection of coral formations, teeming with colorful fish, rays, and occasionally even harmless reef sharks. The area’s history is as colorful as its marine inhabitants, with local stories of ancient mariners navigating these waters. The Coral Gardens are not only a place of natural beauty but also a testament to the island's commitment to preserving its delicate underwater ecosystems. It's a surreal, tranquil world, offering an unforgettable experience that allows a rare glimpse into the thriving aquatic life of the South Pacific.",description:"The Coral Gardens, a snorkeling paradise, feature a rich marine life amidst vibrant coral formations in Taniti's barrier reef.",coordinates:{lat:-16.532,lng:-151.73},image:"/images/coral_gardens.jpg"}]},9581:function(e,t,n){n.r(t),n.d(t,{Head:function(){return l}});var a=n(7294),r=n(682),i=n(3527),o=n(2899),s=n(6640);t.default=()=>a.createElement(r.Z,{fluid:!0,id:"root"},a.createElement(i.Z,null,a.createElement(o.Z,{type:"destination",locations:s.Z})));const l=()=>a.createElement("title",null,"Destination Page")},5005:function(e,t,n){var a=n(4184),r=n.n(a),i=n(7294),o=n(861),s=n(6792),l=n(5893);const c=i.forwardRef((({as:e,bsPrefix:t,variant:n="primary",size:a,active:i=!1,disabled:c=!1,className:u,...f},d)=>{const p=(0,s.vE)(t,"btn"),[m,{tagName:h}]=(0,o.FT)({tagName:e,disabled:c,...f}),g=h;return(0,l.jsx)(g,{...m,...f,ref:d,disabled:c,className:r()(u,p,i&&"active",n&&`${p}-${n}`,a&&`${p}-${a}`,f.href&&c&&"disabled")})}));c.displayName="Button",t.Z=c}}]);
//# sourceMappingURL=component---src-pages-destinations-tsx-6909ff9e3555b5be53e1.js.map