(this["webpackJsonpto-do-app"]=this["webpackJsonpto-do-app"]||[]).push([[0],{26:function(t,e,n){},47:function(t,e,n){},48:function(t,e,n){},49:function(t,e,n){},50:function(t,e,n){},51:function(t,e,n){},52:function(t,e,n){"use strict";n.r(e);var a=n(1),r=n.n(a),c=n(18),s=n.n(c),o=(n(26),n(3)),i=n.n(o),u=n(5),l=n(6),d=n(21),b=n(2),p=n(19),j=n.n(p),f=function(){return j.a.create({baseURL:"https://todo-app-83232-default-rtdb.europe-west1.firebasedatabase.app"})},O=function(){var t=Object(u.a)(i.a.mark((function t(){var e,n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f().get("/Todo.json");case 3:return e=t.sent,n=e.data,t.abrupt("return",n);case 8:return t.prev=8,t.t0=t.catch(0),t.abrupt("return",console.log(t.t0));case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(){return t.apply(this,arguments)}}(),x=function(){var t=Object(u.a)(i.a.mark((function t(e){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f().post("/Todo.json",e);case 3:t.next=8;break;case 5:return t.prev=5,t.t0=t.catch(0),t.abrupt("return",console.log(t.t0));case 8:case"end":return t.stop()}}),t,null,[[0,5]])})));return function(e){return t.apply(this,arguments)}}(),h=function(){var t=Object(u.a)(i.a.mark((function t(e){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f().put("/Todo/".concat(e.id,".json"),e);case 3:t.next=8;break;case 5:return t.prev=5,t.t0=t.catch(0),t.abrupt("return",console.log(t.t0));case 8:case"end":return t.stop()}}),t,null,[[0,5]])})));return function(e){return t.apply(this,arguments)}}(),v=function(){var t=Object(u.a)(i.a.mark((function t(e){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f().delete("/Todo/".concat(e.id,".json"));case 3:t.next=8;break;case 5:return t.prev=5,t.t0=t.catch(0),t.abrupt("return",console.log(t.t0));case 8:case"end":return t.stop()}}),t,null,[[0,5]])})));return function(e){return t.apply(this,arguments)}}(),k="DATA",m="DONE",_="EDIT",g="REMOVE",y="LOADING",N=function(t){if(t){for(var e=[],n=0,a=Object.entries(t);n<a.length;n++){var r=Object(l.a)(a[n],2),c=r[0],s=r[1];e.push(Object(b.a)({id:c},s))}return e}},L=n(0),w=Object(a.createContext)(),E={todoList:[],isLoading:!1,error:void 0},T=function(t,e){var n=e.type,a=e.payload;switch(n){case k:return Object(b.a)(Object(b.a)({},t),{},{todoList:null!==a&&void 0!==a?a:[],isLoading:!1});case"ADD":return Object(b.a)(Object(b.a)({},t),{},{todoList:[].concat(Object(d.a)(t.todoList),[a]),isLoading:!1});case m:var r=t.todoList.map((function(t){return t.id===a.id&&(t.done=a.value),t}));return Object(b.a)(Object(b.a)({},t),{},{todoList:r,isLoading:!1});case _:var c=t.todoList.map((function(t){return t.id===a.id&&(t=a),t}));return Object(b.a)(Object(b.a)({},t),{},{todoList:c,isLoading:!1});case g:var s=t.todoList.filter((function(t){return t.id!==a.id}));return Object(b.a)(Object(b.a)({},t),{},{todoList:s,isLoading:!1});case y:return Object(b.a)(Object(b.a)({},t),{},{isLoading:a});default:console.error("Something went wrong")}},C=function(t){var e=t.children,n=Object(a.useReducer)(T,E),r=Object(l.a)(n,2),c=r[0],s=r[1],o=function(){var t=Object(u.a)(i.a.mark((function t(){var e;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s({type:y,payload:!0}),t.prev=1,t.next=4,O();case 4:e=t.sent,s({type:k,payload:N(e)}),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),s({type:y,payload:!1}),console.error(t.t0);case 12:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(){return t.apply(this,arguments)}}();return Object(a.useEffect)((function(){o()}),[]),Object(L.jsx)(w.Provider,{value:{dispatch:s,todoListState:c,setTasks:o},children:e})},D=(n(47),function(){var t=Object(a.useContext)(w),e=t.dispatch,n=t.setTasks,r=t.todoListState.isLoading,c=Object(a.useState)(""),s=Object(l.a)(c,2),o=s[0],d=s[1],b=Object(a.useState)(!1),p=Object(l.a)(b,2),j=p[0],f=p[1],O=function(){var t=Object(u.a)(i.a.mark((function t(a){var r;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),!(o.length<2)){t.next=4;break}return f(!0),t.abrupt("return");case 4:return e({type:y,payload:!0}),r={name:o,done:!1,id:null},t.prev=6,t.next=9,x(r);case 9:t.next=15;break;case 11:t.prev=11,t.t0=t.catch(6),console.error(t.t0),e({type:y,payload:!1});case 15:e({type:"ADD",payload:r}),n(),d(""),f(!1);case 19:case"end":return t.stop()}}),t,null,[[6,11]])})));return function(e){return t.apply(this,arguments)}}();return Object(L.jsxs)("form",{onSubmit:r?function(t){t.preventDefault()}:O,className:"addTask",children:[Object(L.jsxs)("label",{className:"addTask__label",children:["Add task",Object(L.jsx)("input",{onChange:function(t){var e=t.target.value;return d(e)},value:r?"":o,className:"addTask__input",type:"text"})]}),j&&Object(L.jsx)("p",{className:"addTask__error",children:"The task must be at least 2 characters long"}),Object(L.jsx)("button",{className:"addTask__btn",children:"add"})]})}),S=n(20),A=(n(48),function(t){var e=t.task,n=t.task,r=n.id,c=n.name,s=n.done,o=Object(a.useContext)(w),d=o.dispatch,p=o.todoListState.isLoading,j=Object(a.useState)({isEditing:!1,name:""}),f=Object(l.a)(j,2),O=f[0],x=f[1],k=Object(S.useClickOutside)(),N=Object(l.a)(k,2),E=N[0],T=N[1],C=Object(a.useRef)(),D=function(){var t=Object(u.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return d({type:y,payload:!0}),t.prev=1,t.next=4,v(e);case 4:d({type:g,payload:{id:r}}),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(1),console.log(t.t0),d({type:y,payload:!1});case 11:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(){return t.apply(this,arguments)}}(),A=function(){var t=Object(u.a)(i.a.mark((function t(n){var a;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=Object(b.a)(Object(b.a)({},e),{},{done:n}),d({type:y,payload:!0}),t.prev=2,t.next=5,h(a);case 5:d({type:m,payload:{id:r,value:n}}),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(2),console.error(t.t0),d({type:y,payload:!1});case 12:case"end":return t.stop()}}),t,null,[[2,8]])})));return function(e){return t.apply(this,arguments)}}(),R=Object(a.useCallback)(Object(u.a)(i.a.mark((function t(){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!O.isEditing){t.next=21;break}if(C.current.focus(),!(O.name.length<2)){t.next=4;break}return t.abrupt("return",!0);case 4:if(O.name!==c){t.next=7;break}return x({isEditing:!1}),t.abrupt("return",!0);case 7:return n=Object(b.a)(Object(b.a)({},e),{},{name:O.name}),d({type:y,payload:!0}),t.prev=9,t.next=12,h(n);case 12:d({type:_,payload:n}),t.next=19;break;case 15:t.prev=15,t.t0=t.catch(9),console.error(t.t0),d({type:y,payload:!1});case 19:return x(Object(b.a)(Object(b.a)({},O),{},{isEditing:!1})),t.abrupt("return");case 21:x({isEditing:!0,name:c});case 22:case"end":return t.stop()}}),t,null,[[9,15]])}))),[d,O,c,e]);Object(a.useEffect)((function(){O.isEditing&&C.current.focus()}),[O.isEditing]),Object(a.useEffect)((function(){T&&O.isEditing&&R()}),[O.isEditing,R,T]);var F=Object(L.jsxs)(L.Fragment,{children:[O.isEditing?Object(L.jsx)("input",{className:"task__input",type:"text",value:O.name,onChange:function(t){var e=t.target.value;return x(Object(b.a)(Object(b.a)({},O),{},{name:e}))},ref:C}):Object(L.jsx)("p",{className:"task__title",onClick:R,children:c}),Object(L.jsxs)("div",{className:"task__btn-box",children:[Object(L.jsx)("button",{onClick:O.isEditing?null:function(){return A(!0)},className:"task__btn-box-btn",children:"done"}),Object(L.jsx)("button",{onClick:p?null:R,className:"task__btn-box-btn",children:O.isEditing?"ok":"edit"}),Object(L.jsx)("button",{onClick:O.isEditing?null:D,className:"task__btn-box-btn",children:"x"})]})]}),I=Object(L.jsx)("li",{ref:E,className:"task",children:F}),J=Object(L.jsxs)("li",{className:"task",children:[Object(L.jsx)("p",{className:"task__title task__title--done",children:c}),Object(L.jsxs)("div",{className:"task__btn-box",children:[Object(L.jsx)("button",{onClick:function(){return A(!1)},className:"task__btn-box-btn task__btn-box-btn--undo",children:"undo"}),Object(L.jsx)("button",{onClick:D,className:"task__btn-box-btn task__btn-box-btn--done",children:"x"})]})]});return Object(L.jsx)(L.Fragment,{children:s?J:I})}),R=(n(49),function(){return Object(L.jsx)("div",{className:"loading-mask",children:Object(L.jsx)("div",{className:"preloader",children:Object(L.jsx)("div",{className:"c-three-dots-loader"})})})}),F=(n(50),function(){var t=Object(a.useContext)(w).todoListState,e=t.todoList,n=t.isLoading,r=e.filter((function(t){return!t.done})),c=e.filter((function(t){return t.done})).reverse(),s=r.map((function(t){return Object(L.jsx)(A,{task:t},t.id)})),o=c.map((function(t){return Object(L.jsx)(A,{task:t},t.id)})),i=r.length?Object(L.jsx)("ul",{className:"tasks-box__ul",children:s}):Object(L.jsx)("p",{className:"tasks-box__info",children:"No tasks on the list"}),u=c.length?Object(L.jsx)("ul",{className:"tasks-box__ul",children:o}):Object(L.jsx)("p",{className:"tasks-box__info",children:"No tasks completed"}),l=Object(L.jsxs)("div",{className:"tasks-box",children:[Object(L.jsxs)("h2",{className:"tasks-box__header",children:["Tasks to do (",r.length,")"]}),i,Object(L.jsxs)("h3",{className:"tasks-box__header--done",children:["Done tasks (",c.length,")"]}),u]});return Object(L.jsx)(L.Fragment,{children:n?Object(L.jsx)(R,{}):l})}),I=(n(51),function(){return Object(L.jsx)("div",{className:"toDo",children:Object(L.jsxs)("div",{className:"toDo__container",children:[Object(L.jsx)("h1",{className:"toDo__header",children:"todo app"}),Object(L.jsxs)(C,{children:[Object(L.jsx)(D,{}),Object(L.jsx)(F,{})]})]})})});s.a.render(Object(L.jsx)(r.a.StrictMode,{children:Object(L.jsx)(I,{})}),document.getElementById("root"))}},[[52,1,2]]]);
//# sourceMappingURL=main.8c2e5a28.chunk.js.map