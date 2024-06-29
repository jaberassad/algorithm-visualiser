import main from "../script.js"
import utils from "../utils.js"

async function partition(arr, start, end) {
    let i = start;
    let j = end - 1;
    let p = end;
    let pivot = arr[p];
    let bar1= document.getElementById(`${i}`)
    let bar2= document.getElementById(`${j}`)
    let bar3= document.getElementById(`${p}`)
    
    while (i <= j) {
        if(utils.stop_sorting){
            return
        }
        while (i <= j && arr[i] < pivot) {
            i += 1;
        }
        while (i <= j && arr[j] > pivot) {
            j -= 1;
        }

        if (i <= j) {
            bar1.style.backgroundColor="blue"
            bar2.style.backgroundColor="blue"
            await utils.sleep(100-utils.speed)
            bar1.style.backgroundColor="black"
            bar2.style.backgroundColor="black"
            utils.swap(i,j);
            i += 1;
            j -= 1;
        }
    }

    bar1.style.backgroundColor="blue"
    bar3.style.backgroundColor="blue"
    await utils.sleep(100-utils.speed)
    bar1.style.backgroundColor="black"
    bar3.style.backgroundColor="black"
    utils.swap(i,p);
    return i;
}

async function quickSort(arr, start, end) {
    if (start < end) {
        let pi = await partition(arr, start, end);
        await quickSort(arr, start, pi - 1);
        await quickSort(arr, pi + 1, end);
    }
}

async function quick_sort() {
    utils.disable_btns(true);
    main.slider.disabled = true;
    await quickSort(utils.data, 0, utils.data.length - 1);
    if(!utils.stop_sorting) utils.showSortedVisual();
    utils.disable_btns(false);
    main.slider.disabled = false;
    utils.stop_sorting=false;
}

function update_stop_sorting(bool){
    utils.stop_sorting=bool
}


export default {quick_sort, update_stop_sorting};