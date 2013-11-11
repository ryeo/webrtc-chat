(function(){var a;a=function(){function a(a){this.token=a,this.baseUrl="https://www.googleapis.com/plus/v1"}return a.prototype.getCurrentUser=function(a){var b;return b={url:this.baseUrl+"/people/me",data:{access_token:this.token,v:3,alt:"json","max-results":1e4}},$.ajax(b).done(a)},a.prototype.getContacts=function(a){var b;return b={url:this.baseUrl+"/people/me/people/visible",data:{access_token:this.token,v:3,alt:"json","max-results":1e4}},$.ajax(b).done(a)},a}(),$(document).ready(function(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;return m={login:document.querySelector("#page-login"),caller:document.querySelector("#page-caller")},window.pubnub=null,u=null,d=null,k=null,n=null,document.querySelector("#login").addEventListener("click",function(){return u=document.querySelector("#userid").value,h("guest-"+u)}),h=function(a){return u=a,null!=n&&n.getContacts(function(){}),window.pubnub=PUBNUB.init({publish_key:"pub-c-7070d569-77ab-48d3-97ca-c0c3f7ab6403",subscribe_key:"sub-c-49a2a468-ced1-11e2-a5be-02ee2ddab7fe",uuid:a}),pubnub.onNewConnection(function(a){return k?o(a):void 0}),m.login.className=m.login.className.replace("active",""),m.caller.className+=" active",$(document).trigger("pubnub:ready")},window.signinCallback=function(b){return b.access_token?($("#signinButton").hide(),n=new a(b.access_token),n.getCurrentUser(function(a){var b;return b=a.displayName.split(" "),b=b[0]+" "+b[1].charAt(0)+".",h(""+a.id+"-"+b)})):b.error?console.log("Sign-in state: "+b.error):void 0},t=_.template($("#user-item-template").text()),s=$("#user-list"),$(document).on("pubnub:ready",function(){return pubnub.subscribe({channel:"phonebook",callback:function(){},presence:function(a){var b,c;return"join"===a.action&&a.uuid!==u?(c=t({name:a.uuid.split("-")[1],id:a.uuid}),s.append(c)):"leave"===a.action&&a.uuid!==u?(b=s.find('li[data-user="'+a.uuid+'"]'),b.remove()):void 0}})}),c="",i=$("#answer-modal"),i.modal({show:!1}),o=function(a){return pubnub.publish({user:a,stream:k}),pubnub.subscribe({user:a,stream:function(a,b){return document.querySelector("#call-video").src=URL.createObjectURL(b.stream)},disconnect:function(){return document.querySelector("#call-video").src="",$(document).trigger("call:end")},connect:function(){}})},b=function(a){return d=a,o(a),null!=d&&f(),$(document).trigger("call:start",a),pubnub.publish({channel:"answer",message:{caller:c,callee:u}})},$(document).on("pubnub:ready",function(){return pubnub.subscribe({channel:"call",callback:function(a){return a.callee===u?(c=a.caller,l(a.caller)):void 0}}),pubnub.subscribe({channel:"answer",callback:function(a){return a.caller===u?(f(),d=a.callee,o(a.callee),$(document).trigger("call:start",a.callee)):void 0}})}),l=function(a){return a=a.split("-")[1],i.find(".caller").text(""+a+" is calling..."),i.modal("show")},i.find(".btn-primary").on("click",function(){return b(c),i.modal("hide")}),j=$("#calling-modal"),j.modal({show:!1}),$("#user-list").on("click","a[data-user]",function(a){var b,c;return c=$(a.target).data("user"),d=c,b=c.split("-")[1],j.find(".calling").text("Calling "+b+"..."),j.modal("show"),pubnub.publish({channel:"call",message:{caller:u,callee:c}})}),$(document).on("call:start",function(){return j.modal("hide")}),$("#hang-up").on("click",function(){return f()}),f=function(){return pubnub.closeConnection(d,function(){return $(document).trigger("call:end")})},v=$("#video-controls"),q=v.find("#time"),p=0,r=null,v.hide(),g=function(){var a,b;return p+=1,a=Math.floor(p/60),b=p%60,1===a.toString().length&&(a="0"+a),1===b.toString().length&&(b="0"+b),q.text(""+a+":"+b)},$(document).on("call:start",function(){return v.show(),p=0,q.text("00:00"),r=setInterval(g,1e3)}),$(document).on("call:end",function(){return v.hide(),clearInterval(r)}),e=function(a){return document.querySelector("#self-call-video").src=URL.createObjectURL(a),k=a},navigator.webkitGetUserMedia({audio:!0,video:!0},e),m.login.className+=" active"})}).call(this);