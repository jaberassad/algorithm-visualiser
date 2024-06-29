import main from "../script.js"
import utils from "../utils.js"

async function insertion_sorting(){
    utils.disable_btns(true);
    console.log(utils.sorting)
    main.slider.disabled=true;
    for(let i =1; i<utils.data.length; i++){
        let j=i
        let bar1 = document.getElementById(`${i}`)
        bar1.style.backgroundColor="red"
        while(j>0 && utils.data[j-1]>utils.data[j]){
            let bar1 = document.getElementById(`${j}`)
            bar1.style.backgroundColor="blue"
            await utils.sleep(100-utils.speed)
            bar1.style.backgroundColor="black"
            utils.swap(j-1, j)
            j-=1
            if (utils.stop_sorting){
                utils.disable_btns(false);
                main.slider.disabled=false
                utils.stop_sorting=false
                return
            }
        }
        bar1.style.backgroundColor="black"
    }
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "green";
    }
    utils.disable_btns(false);
    main.slider.disabled=false;
}

function update_speed(new_speed){
    utils.speed = new_speed;
}

function update_stop_sorting(bool){
    utils.stop_sorting = bool;
}

export default {insertion_sorting, update_speed, update_stop_sorting};