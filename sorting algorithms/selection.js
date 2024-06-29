import main from "../script.js"
import utils from "../utils.js"

async function selection_sort(){
    utils.disable_btns(true);
    main.slider.disabled=true
    for(let i=0; i<utils.data.length; i++){
        let min = utils.data[i]
        let index = i

        let bar1 = document.getElementById(`${i}`)
        bar1.style.backgroundColor="blue"
        for(let k=i+1; k<utils.data.length; k++){
            let bar2 = document.getElementById(`${k}`)
            if(utils.data[k]<min){
                min= utils.data[k]
                index=k
                bar2.style.backgroundColor="blue"
            }else{
                bar2.style.backgroundColor="red"
            }
            await utils.sleep(100-utils.speed)
            bar2.style.backgroundColor="black"

            if (utils.stop_sorting){
                utils.disable_btns(false);
                main.slider.disabled=false
                utils.stop_sorting=false
                return
            }
        }
        bar1.style.backgroundColor="black"
        utils.swap(index, i)
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
export default {selection_sort, update_speed, update_stop_sorting};