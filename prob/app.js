"use strict";

let block = document.body.querySelector(".block");


let openInput = (event) => {
    let list = document.body.querySelector(`#list-block-1`);

    let e = event || window.event;
    let target = e.target;

    if (target.dataset.from == `from` ) {
        if (list.style.display == `none`){
            list.style.display = `block`;
        } else {
            list.style.display = `none`;
        }

    }
};


block.addEventListener(`click`, openInput, true);