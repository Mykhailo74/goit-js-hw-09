const e=document.querySelector(".form");function t(e,t){const o={position:e,delay:t},i=Math.random()>.3;return new Promise(((e,n)=>{setTimeout((()=>{i?e(o):n(o)}),t)}))}e.addEventListener("submit",(function(o){o.preventDefault();let i=Number(e.delay.value);for(let o=1;o<=e.amount.value;o+=1)t(o,i).then((({position:e,delay:t})=>{Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{Notify.failure(`❌ Rejected promise ${e} in ${t}ms`)})),i+=Number(e.step.value)}));
//# sourceMappingURL=03-promises.e3ea6825.js.map