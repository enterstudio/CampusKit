var Hogan={};(function(e,t){function n(e){return(null===e||void 0===e?"":e)+""}function i(e){e=n(e);return u.test(e)?e.replace(o,"&amp;").replace(r,"&lt;").replace(a,"&gt;").replace(s,"&#39;").replace(l,"&quot;"):e}e.Template=function(e,n,i,o){this.r=e||this.r;this.c=i;this.options=o;this.text=n||"";this.buf=t?[]:""};e.Template.prototype={r:function(){return""},v:i,t:n,render:function(e,t,n){return this.ri([e],t||{},n)},ri:function(e,t,n){return this.r(e,t,n)},rp:function(e,t,n,i){var o=n[e];if(!o)return"";this.c&&"string"==typeof o&&(o=this.c.compile(o,this.options));return o.ri(t,n,i)},rs:function(e,t,n){var i=e[e.length-1];if(p(i))for(var o=0;i.length>o;o++){e.push(i[o]);n(e,t,this);e.pop()}else n(e,t,this)},s:function(e,t,n,i,o,r,a){var s;if(p(e)&&0===e.length)return!1;"function"==typeof e&&(e=this.ls(e,t,n,i,o,r,a));s=""===e||!!e;!i&&s&&t&&t.push("object"==typeof e?e:t[t.length-1]);return s},d:function(e,t,n,i){var o=e.split("."),r=this.f(o[0],t,n,i),a=null;if("."===e&&p(t[t.length-2]))return t[t.length-1];for(var s=1;o.length>s;s++)if(r&&"object"==typeof r&&o[s]in r){a=r;r=r[o[s]]}else r="";if(i&&!r)return!1;if(!i&&"function"==typeof r){t.push(a);r=this.lv(r,t,n);t.pop()}return r},f:function(e,t,n,i){for(var o=!1,r=null,a=!1,s=t.length-1;s>=0;s--){r=t[s];if(r&&"object"==typeof r&&e in r){o=r[e];a=!0;break}}if(!a)return i?!1:"";i||"function"!=typeof o||(o=this.lv(o,t,n));return o},ho:function(e,t,n,i,o){var r=this.c,a=this.options;a.delimiters=o;var i=e.call(t,i);i=null==i?i+"":""+i;this.b(r.compile(i,a).render(t,n));return!1},b:t?function(e){this.buf.push(e)}:function(e){this.buf+=e},fl:t?function(){var e=this.buf.join("");this.buf=[];return e}:function(){var e=this.buf;this.buf="";return e},ls:function(e,t,n,i,o,r,a){var s=t[t.length-1],l=null;if(!i&&this.c&&e.length>0)return this.ho(e,s,n,this.text.substring(o,r),a);l=e.call(s);if("function"==typeof l){if(i)return!0;if(this.c)return this.ho(l,s,n,this.text.substring(o,r),a)}return l},lv:function(e,t,i){var o=t[t.length-1],r=e.call(o);if("function"==typeof r){r=n(r.call(o));if(this.c&&~r.indexOf("{{"))return this.c.compile(r,this.options).render(o,i)}return n(r)}};var o=/&/g,r=/</g,a=/>/g,s=/\'/g,l=/\"/g,u=/[&<>\"\']/,p=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}})("undefined"!=typeof exports?exports:Hogan);var _dirq=_dirq||[],ucsf=ucsf||{};ucsf.directory=function(){var e={};e.renderSearchResults=function(e){if(e.error)window.alert(e.error.message);else{var t=e.data||[],n=t.length>20?20:t.length,i='<div class="menu"><h1>Search Results ('+n+")</h1>";20===n&&(i+='<p class="info">Results limited to 20.</p>');if(0===n)i+='<p class="info">No results found.</p>';else{i+="<ol>";for(var o=0;n>o;o++)if(t[o].hasOwnProperty("id")&&t[o].hasOwnProperty("name")){i=i+'<li><a href="/directory/detail/?'+encodeURIComponent(t[o].id)+'">';i+='<span style="">';i+=t[o].name;t[o].hasOwnProperty("department")&&(i=i+" &ndash; "+t[o].department);i+="</span>"}i+="</ol>"}i+="</div>";var r=document.getElementById("searchresults");r.innerHTML=i;r.scrollIntoView()}};e.renderDetail=function(t){var n=new Hogan.Template(function(e,t,n){var i=this;i.b(n=n||"");i.s(i.f("data",e,t,1),e,t,1,0,0,"")||i.b('<div class="content"><p class="info">No details available.</p></div>');if(i.s(i.f("data",e,t,1),e,t,0,95,1146,"{{ }}")){i.rs(e,t,function(e,t,n){if(n.s(n.d(".",e,t,1),e,t,0,101,1140,"{{ }}")){n.rs(e,t,function(e,t,n){n.b('<div class="menu detailed" id="ucsf_directory_detail_menu"><h1>');n.b(n.v(n.f("name",e,t,0)));if(n.s(n.f("degrees",e,t,1),e,t,0,184,191,"{{ }}")){n.rs(e,t,function(e,t,n){n.b(", ");n.b(n.v(n.d(".",e,t,0)))});e.pop()}n.b('</h1><ol id="ucsf_directory_detail_menu_list">');if(n.s(n.f("phones",e,t,1),e,t,0,260,644,"{{ }}")){n.rs(e,t,function(e,t,n){if(n.s(n.f("main",e,t,1),e,t,0,269,321,"{{ }}")){n.rs(e,t,function(e,t,n){n.b('<li><a href="tel:');n.b(n.v(n.d(".",e,t,0)));n.b('">Campus Phone: ');n.b(n.v(n.d(".",e,t,0)));n.b("</a></li>")});e.pop()}if(n.s(n.f("alternate",e,t,1),e,t,0,344,401,"{{ }}")){n.rs(e,t,function(e,t,n){n.b('<li><a href="tel:');n.b(n.v(n.d(".",e,t,0)));n.b('">Alt. Campus Phone: ');n.b(n.v(n.d(".",e,t,0)));n.b("</a></li>")});e.pop()}if(n.s(n.f("privatePractice",e,t,1),e,t,0,435,491,"{{ }}")){n.rs(e,t,function(e,t,n){n.b('<li><a href="tel:');n.b(n.v(n.d(".",e,t,0)));n.b('">Private Practice: ');n.b(n.v(n.d(".",e,t,0)));n.b("</a></li>")});e.pop()}if(n.s(n.f("mobile",e,t,1),e,t,0,522,568,"{{ }}")){n.rs(e,t,function(e,t,n){n.b('<li><a href="tel:');n.b(n.v(n.d(".",e,t,0)));n.b('">Mobile: ');n.b(n.v(n.d(".",e,t,0)));n.b("</a></li>")});e.pop()}if(n.s(n.f("pager",e,t,1),e,t,0,589,634,"{{ }}")){n.rs(e,t,function(e,t,n){n.b('<li><a href="tel:');n.b(n.v(n.d(".",e,t,0)));n.b('">Pager: ');n.b(n.v(n.d(".",e,t,0)));n.b("</a></li>")});e.pop()}});e.pop()}if(n.s(n.f("email",e,t,1),e,t,0,665,713,"{{ }}")){n.rs(e,t,function(e,t,n){n.b('<li><a href="mailto:');n.b(n.v(n.d(".",e,t,0)));n.b('">Email: ');n.b(n.v(n.d(".",e,t,0)));n.b("</a></li>")});e.pop()}n.b('</ol></div><div class="content"><ul class="ucsf-directory">');if(n.s(n.f("department",e,t,1),e,t,0,797,855,"{{ }}")){n.rs(e,t,function(e,t,n){n.b('<li><span class="smallprint">Department:</span> ');n.b(n.v(n.d(".",e,t,0)));n.b("</li>")});e.pop()}if(n.s(n.f("title",e,t,1),e,t,0,880,933,"{{ }}")){n.rs(e,t,function(e,t,n){n.b('<li><span class="smallprint">Title:</span> ');n.b(n.v(n.d(".",e,t,0)));n.b("</li>")});e.pop()}if(n.s(n.f("campusBox",e,t,1),e,t,0,957,1015,"{{ }}")){n.rs(e,t,function(e,t,n){n.b('<li><span class="smallprint">Campus Box:</span> ');n.b(n.v(n.d(".",e,t,0)));n.b("</li>")});e.pop()}if(n.s(n.f("address",e,t,1),e,t,0,1041,1117,"{{ }}")){n.rs(e,t,function(e,t,n){n.b('<li><span class="smallprint">Postal Address:</span><br><pre>');n.b(n.v(n.d(".",e,t,0)));n.b("</pre></li>")});e.pop()}n.b("</ul></div>")});e.pop()}});e.pop()}return i.fl()}),i=document.getElementById("ucsf_directory_detail");i.innerHTML=n.render(t);if(t.data&&t.data[0]&&t.data[0].id){e.id=t.data[0].id;var o=document.createElement("script");o.setAttribute("src","http://profiles.ucsf.edu/CustomAPI/v1/JSONProfile.aspx?FNO="+e.id+"&callback=ucsf.directory.addPhotoAndProfileUrl");document.getElementsByTagName("head")[0].appendChild(o)}};e.addPhotoAndProfileUrl=function(t){if(t.hasOwnProperty("Profiles")&&t.Profiles instanceof Array&&t.Profiles.length>0){var n=t.Profiles[0];if(n.hasOwnProperty("PhotoURL")){var i=document.createElement("img");i.setAttribute("src","http://src.sencha.io/80/80/"+n.PhotoURL);i.setAttribute("alt","");i.setAttribute("style","border-top-right-radius:0;float:left");var o=document.getElementById("ucsf_directory_detail_menu"),r=o.firstChild;r.setAttribute("style","height:52px;padding-top:20px;border-radius:.5em .5em 0 0;");o.insertBefore(i,r)}if(n.hasOwnProperty("ProfilesURL")){var a=document.createElement("a");a.setAttribute("href","/research/?fno="+e.id);a.innerHTML="Research &amp; Publications";var s=document.createElement("li");s.appendChild(a);document.getElementById("ucsf_directory_detail_menu_list").appendChild(s)}}};return e}();Modernizr.load({load:"http://apis.ucsf.edu/jsapi?person",callback:function(){var e=_dirq===void 0?[]:_dirq;_dirq={push:function(e){e[0].apikey="c631ef46e918c82cf81ef4869f0029d4";return UCSF.Person.search.apply(ucsf.directory,e)}};for(var t=0,n=e.length;n>t;t++)_dirq.push(e[t])}});