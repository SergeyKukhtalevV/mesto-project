(()=>{"use strict";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};function e(t){"Escape"===t.key&&n(document.querySelector(".popup_opened"))}function o(t){t.classList.add("popup_opened");var o=t.querySelector(".button_type_submit");o&&(o.classList.remove("button_loading"),o.classList.remove("button_loaded")),document.addEventListener("keydown",e)}function n(t){document.removeEventListener("keydown",e),t.classList.remove("popup_opened")}function r(t){var e=t.target.closest(".gallery__item"),n=e.querySelector(".gallery__photo"),r=e.querySelector(".gallery__title");o(S),z.src=n.src,z.alt=n.alt,O.textContent=r.textContent}t.d({},{cM:()=>q,eq:()=>O,yH:()=>z,gj:()=>w,vV:()=>S,Ge:()=>T});var c,a,i="https://nomoreparties.co/v1/plus-cohort-15",u="c362a370-694e-40e1-b195-d72fbbfd69f7",l="application/json";function s(t,e,n,l,s,d){var f=function(t,e,n,l,s,d,f){t=t.trim(),e=e.trim();var p=f.querySelector(".gallery__item").cloneNode(!0),y=p.querySelector(".gallery__photo"),_=p.querySelector(".gallery__title"),m=p.querySelector(".button_type_like"),v=p.querySelector(".gallery__counter-likes"),h=p.querySelector(".button_type_delete"),b=!1;return y.src=t,y.alt=e,_.textContent=e,v.textContent=n,p.id=d,l===s&&(h.classList.add("button_visible"),h.addEventListener("click",(function(t){c=t.target.closest(".gallery__item").id,o(q)}))),m.addEventListener("click",(function(t){a=t.target.closest(".gallery__item").id,event.target.classList.toggle("button_type_like-active"),b?function(t){return fetch("".concat(i,"/cards/likes/").concat(t),{method:"DELETE",headers:{authorization:u}})}(a).then((function(t){return t.ok?t.json():Promise.reject("Что-то пошло не так с удалением лайка: ".concat(t.status))})).then((function(t){console.log("Сервер прислал карточку с уменьшенным счетчиком лайков",t),b=!1,v.textContent=t.likes.length})).catch((function(t){console.log("Ошибка, запрос на уменьшение количества лайков не выполнен",t)})):function(t){return fetch("".concat(i,"/cards/likes/").concat(t),{method:"PUT",headers:{authorization:u}})}(a).then((function(t){return t.ok?t.json():Promise.reject("Что-то пошло не так с постановкой лайка: ".concat(t.status))})).then((function(t){console.log("Сервер прислал карточку с увеличенным счетчиком лайков",t),b=!0,v.textContent=t.likes.length})).catch((function(t){console.log("Ошибка, запрос на увеличение количества лайков не выполнен",t)}))})),y.addEventListener("error",(function(){return function(t){console.log("Ошибка загрузки изображения",t.src)}(y)})),y.addEventListener("click",r),p}(t,e,n,l,s,d,T);w.prepend(f)}var d,f=document.querySelector(".content"),p=f.querySelector(".button_type_edit"),y=f.querySelector(".button_type_add"),_=f.querySelector(".button_type_avatar"),m=f.querySelector(".profile__name"),v=f.querySelector(".profile__about"),h=f.querySelector(".profile__avatar"),b=document.querySelector(".profile-popup"),g=document.querySelector(".card-popup"),S=document.querySelector(".image-popup"),q=document.querySelector(".delete-popup"),L=document.querySelector(".avatar-popup"),k=document.querySelectorAll(".popup"),C=document.querySelectorAll(".popup__form"),E=b.querySelector("#name"),A=b.querySelector("#about-yourself"),j=g.querySelector("#name-card"),x=g.querySelector("#link-card"),P=L.querySelector("#link-avatar"),T=document.querySelector("#item-template").content,z=S.querySelector(".figure__image"),O=S.querySelector(".figure__caption"),w=f.querySelector(".gallery__list");fetch("".concat(i,"/users/me"),{headers:{authorization:u}}).then((function(t){return t.json()})).then((function(t){m.textContent=t.name,v.textContent=t.about,h.src=t.avatar,d=t._id})),_.addEventListener("click",(function(){o(L)})),fetch("".concat(i,"/cards"),{headers:{authorization:u}}).then((function(t){return t.ok?t.json():Promise.reject("Что-то пошло не так: ".concat(t.status))})).then((function(t){Array.from(t).forEach((function(t){s(t.link,t.name,t.likes.length,d,t.owner._id,t._id)}))})).catch((function(t){console.log("Ошибка, запрос не выполнен",t)})),p.addEventListener("click",(function(){o(b),E.value=m.textContent,A.value=v.textContent})),y.addEventListener("click",(function(){return o(g)})),k.forEach((function(t){t.addEventListener("mousedown",(function(e){(e.target.classList.contains("popup_opened")||e.target.classList.contains("button_type_сlose"))&&n(t)}))})),C.forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault();var o,r,a=e.target.querySelector(".button_type_submit");a.classList.add("button_loading"),"edit-profile"===t.getAttribute("name")&&function(t,e){var o,r;m.textContent=E.value,v.textContent=A.value,(o=E.value,r=A.value,fetch("".concat(i,"/users/me"),{method:"PATCH",headers:{authorization:u,"Content-Type":l},body:JSON.stringify({name:o,about:r})})).then((function(t){return t.ok?t.json():Promise.reject("Что-то пошло не так: ".concat(t.status))})).then((function(t){e.classList.add("button_loaded"),console.log("Запрос на изменение данных пользователя выполнен успешно.")})).catch((function(t){console.log("Ошибка, запрос не выполнен",t)})).finally((function(){n(b)}))}(0,a),"card-add"===t.getAttribute("name")&&function(t,e,o){var r,c;e.classList.add(o),e.setAttribute("disabled","disabled"),(r=j.value,c=x.value,fetch("".concat(i,"/cards"),{method:"POST",headers:{authorization:u,"Content-Type":l},body:JSON.stringify({name:r,link:c})})).then((function(t){return t.ok?t.json():Promise.reject("Что-то пошло не так: ".concat(t.status))})).then((function(t){e.classList.add("button_loaded"),console.log("Сервер прислал созданный объект карточка",t),s(t.link,t.name,t.likes.length,d,t.owner._id,t._id)})).catch((function(t){console.log("Ошибка, запрос не выполнен",t)})).finally((function(){n(g),e.classList.add(o),e.setAttribute("disabled","disabled"),t.target.reset()}))}(e,a,"button_inactive"),"delete-card"===t.getAttribute("name")&&(a.classList.remove("button_loading"),(r=o=c,fetch("".concat(i,"/cards/").concat(r),{method:"DELETE",headers:{authorization:u,"Content-Type":l}})).then((function(t){return t.ok?t.json():Promise.reject("Что-то пошло не так: ".concat(t.status))})).then((function(t){console.log("Удалено с результатом ",t),function(t){document.getElementById(t).remove()}(o)})).catch((function(t){console.log("Ошибка, запрос на удаление не выполнен",t)})),n(q)),"edit-avatar"===t.getAttribute("name")&&function(t,e,o){var r;(r=P.value,fetch("".concat(i,"/users/me/avatar"),{method:"PATCH",headers:{authorization:u,"Content-Type":l},body:JSON.stringify({avatar:r})})).then((function(t){return t.ok?t.json():Promise.reject("Что-то пошло не так: ".concat(t.status))})).then((function(t){e.classList.add("button_loaded"),console.log("Запрос на изменение аватара пользователя выполнен успешно.",t),h.src=t.avatar})).catch((function(t){console.log("Ошибка, запрос не выполнен",t)})).finally((function(){n(L),e.classList.add(o),e.setAttribute("disabled","disabled")}))}(0,a,"button_inactive")}))})),function(t){var e=t.formSelector,o=t.fieldsetSelector,n=t.inputSelector,r=t.submitButtonSelector,c=t.inactiveButtonClass,a=t.inputErrorClass,i=t.errorClass;function u(t,e,o){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.classList.remove(o),e.removeAttribute("disabled")):(e.classList.add(o),e.setAttribute("disabled","disabled"))}Array.from(document.querySelectorAll(e)).forEach((function(t){Array.from(t.querySelectorAll(o)).forEach((function(t){!function(t,e,o,n,r,c){var a=Array.from(t.querySelectorAll(e)),i=t.querySelector(o);u(a,i,n),a.forEach((function(e){e.addEventListener("input",(function(){!function(t,e,o,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?function(t,e,o,n){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(o),r.classList.remove(n),r.textContent=""}(t,e,o,n):function(t,e,o,n,r){var c=t.querySelector(".".concat(e.id,"-error"));e.classList.add(o),c.textContent=n,c.classList.add(r)}(t,e,o,e.validationMessage,n)}(t,e,r,c),u(a,i,n)}))}))}(t,n,r,c,a,i)}))}))}({formSelector:".popup__form",fieldsetSelector:".popup__fieldset",inputSelector:".popup__input-text",submitButtonSelector:".button_type_submit",inactiveButtonClass:"button_inactive",inputErrorClass:"popup__input-text_type_error",errorClass:"popup__input-error_active"})})();