"use strict";(self.webpackChunkc856_prototype=self.webpackChunkc856_prototype||[]).push([[799],{2899:function(e,n,t){t.d(n,{Z:function(){return N}});var r=t(7294),a=t(4051),o=t(1555),i=t(5005);const c=1;const l=(0,r.createContext)(null),u=l.Provider;function s(){const e=(0,r.useContext)(l);if(null==e)throw new Error("No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>");return e}var p=t(5243);function f(){return f=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},f.apply(this,arguments)}function d({bounds:e,boundsOptions:n,center:t,children:a,className:o,id:i,placeholder:l,style:s,whenReady:d,zoom:m,...g},v){const[b]=(0,r.useState)({className:o,id:i,style:s}),[y,h]=(0,r.useState)(null);(0,r.useImperativeHandle)(v,(()=>y?.map??null),[y]);const w=(0,r.useCallback)((r=>{if(null!==r&&null===y){const a=new p.Map(r,g);null!=t&&null!=m?a.setView(t,m):null!=e&&a.fitBounds(e,n),null!=d&&a.whenReady(d),h(function(e){return Object.freeze({__version:c,map:e})}(a))}}),[]);(0,r.useEffect)((()=>()=>{y?.map.remove()}),[y]);const E=y?r.createElement(u,{value:y},a):l??null;return r.createElement("div",f({},b,{ref:w}),E)}const m=(0,r.forwardRef)(d);var g=t(3935);function v(e,n,t){return Object.freeze({instance:e,context:n,container:t})}function b(e,n){return null==n?function(n,t){const a=(0,r.useRef)();return a.current||(a.current=e(n,t)),a}:function(t,a){const o=(0,r.useRef)();o.current||(o.current=e(t,a));const i=(0,r.useRef)(t),{instance:c}=o.current;return(0,r.useEffect)((function(){i.current!==t&&(n(c,t,i.current),i.current=t)}),[c,t,a]),o}}function y(e,n){const t=(0,r.useRef)(n);(0,r.useEffect)((function(){n!==t.current&&null!=e.attributionControl&&(null!=t.current&&e.attributionControl.removeAttribution(t.current),null!=n&&e.attributionControl.addAttribution(n)),t.current=n}),[e,n])}function h(e,n){const t=(0,r.useRef)();(0,r.useEffect)((function(){return null!=n&&e.instance.on(n),t.current=n,function(){null!=t.current&&e.instance.off(t.current),t.current=null}}),[e,n])}function w(e,n){const t=e.pane??n.pane;return t?{...e,pane:t}:e}function E(e){return function(n){const t=s(),a=e(w(n,t),t);return y(t.map,n.attribution),h(a.current,n.eventHandlers),function(e,n){(0,r.useEffect)((function(){return(n.layerContainer??n.map).addLayer(e.instance),function(){n.layerContainer?.removeLayer(e.instance),n.map.removeLayer(e.instance)}}),[n,e])}(a.current,t),a}}const x=function(e){function n(n,t){const{instance:a}=e(n).current;return(0,r.useImperativeHandle)(t,(()=>a)),null}return(0,r.forwardRef)(n)}(E(b((function({url:e,...n},t){return v(new p.TileLayer(e,w(n,t)),t)}),(function(e,n,t){!function(e,n,t){const{opacity:r,zIndex:a}=n;null!=r&&r!==t.opacity&&e.setOpacity(r),null!=a&&a!==t.zIndex&&e.setZIndex(a)}(e,n,t);const{url:r}=n;null!=r&&r!==t.url&&e.setUrl(r)}))));const Z=function(e,n){return function(e){function n(n,t){const{instance:a,context:o}=e(n).current;return(0,r.useImperativeHandle)(t,(()=>a)),null==n.children?null:r.createElement(u,{value:o},n.children)}return(0,r.forwardRef)(n)}(E(b(e,n)))}((function({position:e,...n},t){const r=new p.Marker(e,n);return v(r,(a=t,o={overlayContainer:r},Object.freeze({...a,...o})));var a,o}),(function(e,n,t){n.position!==t.position&&e.setLatLng(n.position),null!=n.icon&&n.icon!==t.icon&&e.setIcon(n.icon),null!=n.zIndexOffset&&n.zIndexOffset!==t.zIndexOffset&&e.setZIndexOffset(n.zIndexOffset),null!=n.opacity&&n.opacity!==t.opacity&&e.setOpacity(n.opacity),null!=e.dragging&&n.draggable!==t.draggable&&(!0===n.draggable?e.dragging.enable():e.dragging.disable())})),k=function(e,n){const t=function(e,n){return function(t,r){const a=s(),o=e(w(t,a),a);return y(a.map,t.attribution),h(o.current,t.eventHandlers),n(o.current,a,t,r),o}}(b(e),n);return function(e){function n(n,t){const[a,o]=(0,r.useState)(!1),{instance:i}=e(n,o).current;(0,r.useImperativeHandle)(t,(()=>i)),(0,r.useEffect)((function(){a&&i.update()}),[i,a,n.children]);const c=i._contentNode;return c?(0,g.createPortal)(n.children,c):null}return(0,r.forwardRef)(n)}(t)}((function(e,n){return v(new p.Popup(e,n.overlayContainer),n)}),(function(e,n,{position:t},a){(0,r.useEffect)((function(){const{instance:r}=e;function o(e){e.popup===r&&(r.update(),a(!0))}function i(e){e.popup===r&&a(!1)}return n.map.on({popupopen:o,popupclose:i}),null==n.overlayContainer?(null!=t&&r.setLatLng(t),r.openOn(n.map)):n.overlayContainer.bindPopup(r),function(){n.map.off({popupopen:o,popupclose:i}),n.overlayContainer?.unbindPopup(),n.map.removeLayer(r)}}),[e,n,a,t])}));var C=t(4160),O=t(3025);var I=e=>{let{locations:n,title:t="Markers",map:o,openPopup:i}=e;return r.createElement("div",{className:"markers-sidebar"},r.createElement("h3",null,t),n.map(((e,n)=>r.createElement(a.Z,{key:`${e.id}-row`,className:"mb-2 location-card",onClick:()=>{o.setView(e.coordinates,13),i(n)}},r.createElement(O.Z,null,r.createElement(O.Z.Img,{variant:"top",width:300,height:225,src:e.image}),r.createElement(O.Z.Body,null,r.createElement(O.Z.Title,null,e.title),r.createElement(O.Z.Text,null,e.description)))))))};var N=e=>{let{locations:n,type:t}=e;const c=[-16.5004,-151.7415],{0:l,1:u}=(0,r.useState)(null),s=(0,r.useRef)([]),p=(0,r.useMemo)((()=>r.createElement(m,{center:c,zoom:13,scrollWheelZoom:!1,ref:u},r.createElement(x,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),n.map(((e,n)=>r.createElement(Z,{key:e.id,position:e.coordinates,ref:e=>{s.current[n]=e}},r.createElement(k,null,r.createElement(a.Z,{className:"mb-1"},r.createElement(o.Z,null,r.createElement("img",{src:e.image,width:"100%",alt:e.title}))),r.createElement(a.Z,{className:"mb-1"},r.createElement(o.Z,null,r.createElement("h4",null,e.title))),r.createElement(a.Z,null,r.createElement(o.Z,null,r.createElement(i.Z,{className:"w-100",variant:"primary",onClick:()=>{(0,C.c4)(`/c856-prototype/${t}/?${e.id}`)}},"See More"))))))))),[]);return r.createElement("div",{className:"map-container"},r.createElement(I,{openPopup:e=>{s.current[e]&&s.current[e].openPopup()},map:l,title:"Accommodations",locations:n}),p)}},5200:function(e,n){n.Z=[{id:1,title:"Lagoon Paradise Resort",description:"A luxurious resort offering overwater bungalows with stunning views of the lagoon.",coordinates:{lat:-16.499,lng:-151.737},packages:{expensive:{price:1500,info:"Includes a private villa, gourmet dining, spa treatments, and a personal tour guide."},moderate:{price:950,info:"Features an overwater bungalow, access to all resort amenities, and a complimentary dinner."},cheapest:{price:600,info:"Offers a cozy beachside room with beautiful views and access to recreational activities."}},image:"/c856-prototype/public/static/pictures/lagoon_paradise.jpg"},{id:2,title:"Blue Lagoon Inn",description:"A charming inn located near Matira Beach, known for its friendly service and local cuisine.",coordinates:{lat:-16.5415,lng:-151.7381},packages:{expensive:{price:1200,info:"A spacious suite with ocean views, private dining, and an exclusive island tour."},moderate:{price:750,info:"Comfortable accommodation with beach access, breakfast included, and a snorkeling trip."},cheapest:{price:500,info:"A standard room with essential amenities, perfect for budget-conscious travelers."}},image:"/c856-prototype/images/blue_lagoon.jpg"},{id:3,title:"Sunset Beach Bungalows",description:"Beachfront bungalows offering a unique blend of traditional design and modern comfort.",coordinates:{lat:-16.5055,lng:-151.753},packages:{expensive:{price:1300,info:"An exclusive bungalow with a private beach area, all meals included, and a sunset cruise."},moderate:{price:800,info:"A deluxe bungalow with sea views, complimentary breakfast, and a guided lagoon tour."},cheapest:{price:550,info:"A comfortable bungalow with easy beach access and free kayak rentals."}},image:"/c856-prototype/images/sunset_beach.jpg"}]},5177:function(e,n,t){t.r(n),t.d(n,{Head:function(){return l}});var r=t(7294),a=t(682),o=t(3527),i=t(5200),c=t(2899);n.default=()=>r.createElement(a.Z,{fluid:!0,id:"root"},r.createElement(o.Z,null,r.createElement(c.Z,{type:"accommodation",locations:i.Z})));const l=()=>r.createElement("title",null,"Accommodations Page")},5005:function(e,n,t){var r=t(4184),a=t.n(r),o=t(7294),i=t(861),c=t(6792),l=t(5893);const u=o.forwardRef((({as:e,bsPrefix:n,variant:t="primary",size:r,active:o=!1,disabled:u=!1,className:s,...p},f)=>{const d=(0,c.vE)(n,"btn"),[m,{tagName:g}]=(0,i.FT)({tagName:e,disabled:u,...p}),v=g;return(0,l.jsx)(v,{...m,...p,ref:f,disabled:u,className:a()(s,d,o&&"active",t&&`${d}-${t}`,r&&`${d}-${r}`,p.href&&u&&"disabled")})}));u.displayName="Button",n.Z=u}}]);
//# sourceMappingURL=component---src-pages-accommodations-tsx-9fabf369aed0d14c80e6.js.map