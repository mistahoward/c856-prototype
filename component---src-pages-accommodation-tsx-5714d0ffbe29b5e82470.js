(self.webpackChunkc856_prototype=self.webpackChunkc856_prototype||[]).push([[189],{6740:function(e){e.exports=function(){function e(r,s){if(!(this instanceof e))return new e(r,s);s=Object.assign({},n,s);var o=Math.pow(10,s.precision);this.intValue=r=t(r,s),this.value=r/o,s.increment=s.increment||1/o,s.groups=s.useVedic?i:a,this.s=s,this.p=o}function t(t,n){var a=!(2<arguments.length&&void 0!==arguments[2])||arguments[2],i=n.decimal,r=n.errorOnInvalid,s=n.fromCents,o=Math.pow(10,n.precision),c=t instanceof e;if(c&&s)return t.intValue;if("number"==typeof t||c)i=c?t.value:t;else if("string"==typeof t)r=new RegExp("[^-\\d"+i+"]","g"),i=new RegExp("\\"+i,"g"),i=(i=t.replace(/\((.*)\)/,"-$1").replace(r,"").replace(i,"."))||0;else{if(r)throw Error("Invalid Input");i=0}return s||(i=(i*o).toFixed(4)),a?Math.round(i):i}var n={symbol:"$",separator:",",decimal:".",errorOnInvalid:!1,precision:2,pattern:"!#",negativePattern:"-!#",format:function(e,t){var n=t.pattern,a=t.negativePattern,i=t.symbol,r=t.separator,s=t.decimal;t=t.groups;var o=(""+e).replace(/^-/,"").split("."),c=o[0];return o=o[1],(0<=e.value?n:a).replace("!",i).replace("#",c.replace(t,"$1"+r)+(o?s+o:""))},fromCents:!1},a=/(\d)(?=(\d{3})+\b)/g,i=/(\d)(?=(\d\d)+\d\b)/g;return e.prototype={add:function(n){var a=this.s,i=this.p;return e((this.intValue+t(n,a))/(a.fromCents?1:i),a)},subtract:function(n){var a=this.s,i=this.p;return e((this.intValue-t(n,a))/(a.fromCents?1:i),a)},multiply:function(t){var n=this.s;return e(this.intValue*t/(n.fromCents?1:Math.pow(10,n.precision)),n)},divide:function(n){var a=this.s;return e(this.intValue/t(n,a,!1),a)},distribute:function(t){var n=this.intValue,a=this.p,i=this.s,r=[],s=Math[0<=n?"floor":"ceil"](n/t),o=Math.abs(n-s*t);for(a=i.fromCents?1:a;0!==t;t--){var c=e(s/a,i);0<o--&&(c=c[0<=n?"add":"subtract"](1/a)),r.push(c)}return r},dollars:function(){return~~this.value},cents:function(){return~~(this.intValue%this.p)},format:function(e){var t=this.s;return"function"==typeof e?e(this,t):t.format(this,Object.assign({},t,e))},toString:function(){var e=this.s,t=e.increment;return(Math.round(this.intValue/this.p/t)*t).toFixed(e.precision)},toJSON:function(){return this.value}},e}()},5200:function(e,t){"use strict";t.Z=[{id:1,title:"Lagoon Paradise Resort",description:"A luxurious resort offering overwater bungalows with stunning views of the lagoon.",coordinates:{lat:-16.499,lng:-151.737},packages:{expensive:{price:1500,info:"Includes a private villa, gourmet dining, spa treatments, and a personal tour guide."},moderate:{price:950,info:"Features an overwater bungalow, access to all resort amenities, and a complimentary dinner."},cheapest:{price:600,info:"Offers a cozy beachside room with beautiful views and access to recreational activities."}},image:"/c856-prototype/images/lagoon_paradise.jpg"},{id:2,title:"Blue Lagoon Inn",description:"A charming inn located near Matira Beach, known for its friendly service and local cuisine.",coordinates:{lat:-16.5415,lng:-151.7381},packages:{expensive:{price:1200,info:"A spacious suite with ocean views, private dining, and an exclusive island tour."},moderate:{price:750,info:"Comfortable accommodation with beach access, breakfast included, and a snorkeling trip."},cheapest:{price:500,info:"A standard room with essential amenities, perfect for budget-conscious travelers."}},image:"/c856-prototype/images/blue_lagoon.jpg"},{id:3,title:"Sunset Beach Bungalows",description:"Beachfront bungalows offering a unique blend of traditional design and modern comfort.",coordinates:{lat:-16.5055,lng:-151.753},packages:{expensive:{price:1300,info:"An exclusive bungalow with a private beach area, all meals included, and a sunset cruise."},moderate:{price:800,info:"A deluxe bungalow with sea views, complimentary breakfast, and a guided lagoon tour."},cheapest:{price:550,info:"A comfortable bungalow with easy beach access and free kayak rentals."}},image:"/c856-prototype/images/sunset_beach.jpg"}]},1425:function(e,t,n){"use strict";n.r(t),n.d(t,{Head:function(){return m}});var a=n(8029),i=n.n(a),r=n(7294),s=n(1555),o=n(3025),c=n(682),l=n(4051),u=n(6740),p=n.n(u),d=n(5200),f=n(3527);t.default=e=>{let{location:t}=e;const n=t.search.replace("?",""),a=d.Z.find((e=>e.id.toString()===n));if(!!!a)return null;const u=Object.keys(a.packages),m=Object.values(a.packages).map(((e,t)=>r.createElement(s.Z,{xs:12,className:"justify-content-center mt-2"},r.createElement(o.Z,null,r.createElement(o.Z.Body,null,r.createElement(o.Z.Title,null,i()(u[t])," Package"),r.createElement(o.Z.Text,null,e.info),r.createElement(o.Z.Text,{className:"text-muted"},p()(e.price).format()))))));return r.createElement(c.Z,{fluid:!0,id:"root"},r.createElement(f.Z,null,r.createElement(l.Z,null,r.createElement(s.Z,{xs:4},r.createElement(l.Z,{className:"ms-2"},m)),r.createElement(s.Z,{xs:8},r.createElement("img",{className:"img-fluid",src:a.image,alt:a.title})))))};const m=()=>r.createElement("title",null,"Accommodation Page")}}]);
//# sourceMappingURL=component---src-pages-accommodation-tsx-5714d0ffbe29b5e82470.js.map