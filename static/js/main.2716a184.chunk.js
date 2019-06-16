(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{36:function(e,t,n){e.exports=n(76)},41:function(e,t,n){},71:function(e,t,n){},76:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(30),i=n.n(r),c=(n(41),n(31)),l=n(6),u=n(7),s=function(){function e(){Object(l.a)(this,e)}return Object(u.a)(e,[{key:"setToken",value:function(e){localStorage.setItem("id_token",e)}},{key:"getToken",value:function(){return localStorage.getItem("id_token")}},{key:"loggedIn",value:function(){return!!this.getToken()}}]),e}(),d=n(9),h=n(8),m=n(10),p=n(32),v=n.n(p),f=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=new s,t=v.a.parse(this.props.location.hash).id_token;t?(e.setToken(t),setTimeout(function(){this.props.history.push("/videos")}.bind(this),1e3)):this.props.history.push("/forbidden")}},{key:"render",value:function(){return null}}]),t}(a.Component),b=n(14),k=n.n(b),g=n(33),E=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(d.a)(this,Object(h.a)(t).call(this))).authService=new s,e.state={videos:[],url:void 0},e}return Object(m.a)(t,e),Object(u.a)(t,[{key:"makeSignedUrl",value:function(e){var t=this;k.a.post("https://j2dk62o9sk.execute-api.us-east-1.amazonaws.com/dev/signed-url",e,{headers:{Authorization:"Bearer ".concat(this.authService.getToken())}}).then(function(e){var n=e.data.url;t.setState(function(e){return{videos:e.videos,url:n}})})}},{key:"componentDidMount",value:function(){var e=this;k.a.get("https://j2dk62o9sk.execute-api.us-east-1.amazonaws.com/dev/video",{headers:{Authorization:"Bearer ".concat(this.authService.getToken())}}).then(function(t){var n=Object(g.sortBy)(t.data,"createdAt");e.setState({videos:n})})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"Video"},o.a.createElement("h2",null,"Videos"),o.a.createElement("div",{className:"row"},o.a.createElement("ul",{className:"column"},this.state.videos.map(function(t){return o.a.createElement("li",{onClick:function(n){return e.makeSignedUrl(t)},key:t.key},t.createdAt," | ",t.displayName," ")})),o.a.createElement("div",{className:"column"},o.a.createElement("video",{src:this.state.url,width:"100%",height:"480px",controls:!0}))))}}]),t}(a.Component),j=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(d.a)(this,Object(h.a)(t).call(this))).state={uploading:!1},e}return Object(m.a)(t,e),Object(u.a)(t,[{key:"onChange",value:function(e){var t=this,n=new s,a=new FormData;a.append("file",e.target.files[0]);var o={headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer ".concat(n.getToken())}};return this.setState({uploading:!0}),k.a.post("https://j2dk62o9sk.execute-api.us-east-1.amazonaws.com/dev/upload",a,o).finally(function(){return t.setState({uploading:!1})}).then(function(e){alert("video uploaded")}).catch(function(e){console.error(e)})}},{key:"render",value:function(){var e,t=this;return this.state.uploading&&(e=o.a.createElement("label",null,"video is being uploaded...")),o.a.createElement("div",null,o.a.createElement("h2",null,"Uploader"),o.a.createElement("input",{accept:"video/mp4",type:"file",name:"file",onChange:function(e){return t.onChange(e)}}),e)}}]),t}(a.Component),y=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h2",null,"No access!!!"))}}]),t}(a.Component),O=n(12),w=n(15),S=(n(71),new s),C=function(e){var t=e.component,n=Object(c.a)(e,["component"]);return o.a.createElement(O.b,Object.assign({},n,{render:function(e){return S.loggedIn()?o.a.createElement(t,e):o.a.createElement(O.a,{to:{pathname:"/forbidden",state:{from:e.location}}})}}))};var T=function(){return o.a.createElement(w.a,null,o.a.createElement("div",null,o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{href:"https://videos.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=74ot3emm9hbujvmigpq6mbiht4&redirect_uri=http://localhost:3000/auth/callback"},"Login")),o.a.createElement("li",null,o.a.createElement(w.b,{to:"/uploader"},"Upload a Video")),o.a.createElement("li",null,o.a.createElement(w.b,{to:"/videos"},"Videos"))),o.a.createElement("hr",null),o.a.createElement(O.b,{path:"/auth/callback",component:f}),o.a.createElement(C,{path:"/uploader",component:j}),o.a.createElement(C,{path:"/videos",component:E}),o.a.createElement(O.b,{path:"/forbidden",component:y})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[36,1,2]]]);
//# sourceMappingURL=main.2716a184.chunk.js.map