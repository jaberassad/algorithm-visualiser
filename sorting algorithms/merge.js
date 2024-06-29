import main from "../script.js"
import utils from "../utils.js"


let turn_black = false

async function merge_sort_with_visualization(list) {
    utils.disable_btns(true);
    main.slider.disabled = true;
    await merge_sort_visual(list, 0, list.length - 1);
    if(!utils.stop_sorting) utils.showSortedVisual();
    utils.disable_btns(false);
    main.slider.disabled = false;
    utils.stop_sorting=false; 
}

async function merge_sort_visual(list, left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await merge_sort_visual(list, left, mid);
    await merge_sort_visual(list, mid + 1, right);
    await merge_visual(list, left, mid, right);
}

async function merge_visual(list, left, mid, right) {
    const leftArr = list.slice(left, mid + 1);
    const rightArr = list.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if(utils.stop_sorting){
            return
        }
        if (leftArr[i] <= rightArr[j]) {
            list[k++] = leftArr[i++];
        } else {
            list[k++] = rightArr[j++];
        }
        await utils.update_histogram();
        await utils.sleep(100 - utils.speed);
    }

    while (i < leftArr.length) {
        list[k++] = leftArr[i++];
        if(utils.stop_sorting){
            return
        }
        await utils.update_histogram();
        await utils.sleep(100 - utils.speed);
    }

    while (j < rightArr.length) {
        list[k++] = rightArr[j++];
        if(utils.stop_sorting){
            return
        }
        await utils.update_histogram();
        await utils.sleep(100 - utils.speed);
    }
}

function update_speed(new_speed){
    utils.speed = new_speed;
}

function update_stop_sorting(bool){
    utils.stop_sorting = bool;
}

export default {merge_sort_with_visualization, update_speed, update_stop_sorting};
