(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},20:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),c=n.n(o),u=(n(20),n(14)),l=n(2),i=n(3),m=n.n(i),d="api/persons",f=function(){return m.a.get(d).then((function(e){return e.data}))},s=function(e){return m.a.post(d,e).then((function(e){return e.data}))},h=function(e,t){return m.a.put("".concat(d,"/").concat(e),t).then((function(e){return e.data}))},b=function(e){return m.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"".concat(t.type,"Message")},t.text)},E=function(e){var t=e.entry,n=t.name,a=t.number,o=t.id,c=e.deleteEntry;return r.a.createElement("p",null,n," ",a," ",r.a.createElement("button",{onClick:function(){return c(o)}},"delete"))},v=function(e){var t=e.name,n=e.number,a=e.handleNameChange,o=e.handleNumberChange,c=e.handleSubmit;return r.a.createElement("form",{onSubmit:c},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:a,value:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:o,value:n})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},g=function(e){var t=e.phonebook,n=e.filteredPhonebook,a=e.filterCriteria,o=e.deleteEntry,c=a.length>0?n:t;return r.a.createElement("div",null,c.map((function(e){return r.a.createElement(E,{key:e.name,entry:e,deleteEntry:o})})))},y=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),m=i[0],d=i[1],E=Object(a.useState)(""),y=Object(l.a)(E,2),j=y[0],O=y[1],w=Object(a.useState)([]),k=Object(l.a)(w,2),C=k[0],S=k[1],x=Object(a.useState)(""),N=Object(l.a)(x,2),T=N[0],P=N[1],D=Object(a.useState)(null),J=Object(l.a)(D,2),A=J[0],B=J[1];Object(a.useEffect)((function(){f().then((function(e){o(e),console.log(e)}))}),[]);var I=function(){d(""),O("")};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{message:A}),r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{onChange:function(e){var t,a=e.target.value;S((t=a,n.filter((function(e){return e.name.toLowerCase().includes(t)})))),P(a)},value:T})),r.a.createElement("h2",null,"add a new"),r.a.createElement(v,{name:m,number:j,handleNameChange:function(e){d(e.target.value)},handleNumberChange:function(e){O(e.target.value)},handleSubmit:function(e){e.preventDefault();var t=function(e){var t=-1;return n.forEach((function(n,a){e===n.name&&(t=a)})),t}(m);if(t<0)s({name:m,number:j}).then((function(e){console.log(e),o(n.concat(e)),B({text:"Added ".concat(e.name),type:"success"}),setTimeout((function(){B(null)}),5e3)})).catch((function(e){B({text:e.response.data.error,type:"error"}),setTimeout((function(){B(null)}),1e4)})),T.length>0&&console.log(T),I();else if(window.confirm("".concat(m," is already added to phonebook, replace the old number with a new one?"))){var a=n[t],r=Object(u.a)({},a,{number:j});h(a.id,r).then((function(e){o(n.map((function(t){return t.id!==a.id?t:e}))),T.length>0&&S(C.map((function(t){return t.id!==a.id?t:e}))),I(),B({text:"Updated ".concat(e.name),type:"success"}),setTimeout((function(){B(null)}),5e3)})).catch((function(e){B({text:e.response.data.error,type:"error"}),setTimeout((function(){B(null)}),1e4)}))}}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(g,{phonebook:n,filteredPhonebook:C,filterCriteria:T,deleteEntry:function(e){var t=n.find((function(t){return t.id===e}));window.confirm("Delete ".concat(t.name," ?"))&&b(t.id).then((function(){console.log("deleted"),B({text:"deleted person - '".concat(t.name,"' with number - '").concat(t.number,"'"),type:"success"}),setTimeout((function(){B(null)}),1e4),o(n.filter((function(e){return e.id!==t.id}))),T.length>0&&S(C.filter((function(e){return e.id!==t.id})))})).catch((function(e){B({text:"the person - ".concat(t.name," is already deleted from server"),type:"error"}),setTimeout((function(){B(null)}),1e4)})),console.log(t)}}))};c.a.render(r.a.createElement(y,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.992f631b.chunk.js.map