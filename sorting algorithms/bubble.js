import main from "../script.js"
import utils from "../utils.js"

async function bubble_sort(){ 
    utils.disable_btns(true);
    main.slider.disabled=true
    for(let i=0; i<utils.data.length; i++){
        let bar = document.getElementById(`${i}`)
        for(let k=0; k<utils.data.length-i-1;k++){
            let bar2 = document.getElementById(`${k}`)
            let bar3 = document.getElementById(`${k+1}`)
              if (utils.data[k]>utils.data[k+1]){
                  bar2.style.backgroundColor="red";
                  bar3.style.backgroundColor="red";
                  await utils.sleep(100-utils.speed);
                  bar2.style.backgroundColor="black";
                  bar3.style.backgroundColor="black";
                  utils.swap(k, k+1)
                }else{
                    bar2.style.backgroundColor="blue";
                    bar3.style.backgroundColor="blue";
                    await utils.sleep(100-utils.speed);
                    bar2.style.backgroundColor="black";
                    bar3.style.backgroundColor="black";
                }
                if (utils.stop_sorting){
                    utils.disable_btns(false);
                    main.slider.disabled=false;
                    utils.stop_sorting=false;
                    return
                }
        }
        let bars = document.getElementsByClassName("bar");
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = "black";
        }
    }
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "green";
    }
    main.slider.disabled=false;
    utils.disable_btns(false);
}

function update_speed(new_speed){
    utils.speed = new_speed;
}

function update_stop_sorting(bool){
    utils.stop_sorting = bool;
}

export default {bubble_sort, update_speed, update_stop_sorting};