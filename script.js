const histogram = document.getElementById("histogram");
let slider = document.getElementById("slider");
let slider2 = document.getElementById("speed");
let data = generate_array(5)
let speed=0;
let histogram_len=5;
const maxValue = Math.max(...data);
let stop_sorting=false;
let sorting = false;
for (let j = 0; j < data.length; j++) {
    let height = (data[j] / maxValue) * 100;
    let width = 100 / data.length;
    histogram.innerHTML += `<div id=${j} class='bar' style='height:${height}%; width:${width}%;'></div>`;
}


slider.addEventListener("input", function() {

    histogram.innerHTML =""
    histogram_len=slider.value
    data=generate_array(histogram_len)

    for (let j = 0; j < data.length; j++) {
        let height = (data[j] / maxValue) * 100;
        let width = 100 / data.length;
        histogram.innerHTML += `<div id=${j} class='bar' style='height:${height}%; width:${width}%;'></div>`;
    }

    update_histogram()
});

slider2.addEventListener("input", function() {
    speed=slider2.value
});



function update_histogram(){
    for (let j = 0; j < data.length; j++) {
        let bar = document.getElementById(`${j}`)
        let height = (data[j] / maxValue) * 100;
        let width = 100 / data.length;
        bar.style.height=`${height}%`
        bar.style.width=`${width}%`
    } 
}

function generate_array(len){
    let randomArray = [];
    for (let i = 0; i < len; i++) {
        let randomInt =  Math.floor(Math.random() * 80)+50;
        randomArray.push(randomInt);
    }
    return randomArray;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function bubble_sort(){
    sorting = true;
    slider.disabled=true
    for(let i=0; i<data.length; i++){
        let bar = document.getElementById(`${i}`)
        for(let k=0; k<data.length-i-1;k++){
            let bar2 = document.getElementById(`${k}`)
            let bar3 = document.getElementById(`${k+1}`)
              if (data[k]>data[k+1]){
                  bar2.style.backgroundColor="red";
                  bar3.style.backgroundColor="red";
                  await sleep(100-speed);
                  bar2.style.backgroundColor="black";
                  bar3.style.backgroundColor="black";
                  swap(k, k+1)
                //   update_histogram()
                }else{
                    bar2.style.backgroundColor="blue";
                    bar3.style.backgroundColor="blue";
                    await sleep(100-speed);
                    bar2.style.backgroundColor="black";
                    bar3.style.backgroundColor="black";
                }

                if(stop_sorting){
                    slider.disabled=false;
                    stop_sorting=false
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
    slider.disabled=false;
    sorting = false;
}

let bubble_sort_btn = document.getElementById("bubble_sort")
let generate_btn = document.getElementById("generate")

bubble_sort_btn.addEventListener("click", bubble_sort)

generate_btn.addEventListener("click", function(){
    if(sorting){
        stop_sorting = true;
    }
    
    histogram.innerHTML =""
    data= generate_array(histogram_len)
    for (let j = 0; j < data.length; j++) {
        let height = (data[j] / maxValue) * 100;
        let width = 100 / data.length;
        histogram.innerHTML += `<div id=${j} class='bar' style='height:${height}%; width:${width}%;'></div>`;
    }
    // update_histogram()
})

function swap(num1, num2){
    let swap = data[num1]
    data[num1]=data[num2]
    data[num2]=swap
    update_histogram()
}

let selection_sort_btn = document.getElementById("selection_sort");
selection_sort_btn.addEventListener("click", selection_sort)

async function selection_sort(){
    sorting = true;
    slider.disabled=true
    for(let i=0; i<data.length; i++){
        let min = data[i]
        let index = i

        let bar1 = document.getElementById(`${i}`)
        bar1.style.backgroundColor="blue"
        for(let k=i+1; k<data.length; k++){
            let bar2 = document.getElementById(`${k}`)
            if(data[k]<min){
                min= data[k]
                index=k
                bar2.style.backgroundColor="blue"
            }else{
                bar2.style.backgroundColor="red"
            }
            await sleep(100-speed)
            bar2.style.backgroundColor="black"

            if(stop_sorting){
                slider.disabled=false;
                stop_sorting=false
                return
            }
        }
        bar1.style.backgroundColor="black"
        swap(index, i)
    }
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "green";
    }
    slider.disabled=false;
    sorting = false;
}

let insertion_sort_btn = document.getElementById("insertion_sort")
insertion_sort_btn.addEventListener("click", insertion_sorting)


async function insertion_sorting(){
    sorting = true;
    slider.disabled=true;
    for(let i =1; i<data.length; i++){
        let j=i
        let bar1 = document.getElementById(`${i}`)
        bar1.style.backgroundColor="red"
        while(j>0 && data[j-1]>data[j]){
            let bar1 = document.getElementById(`${j}`)
            bar1.style.backgroundColor="blue"
            await sleep(100-speed)
            bar1.style.backgroundColor="black"
            swap(j-1, j)
            j-=1

            if(stop_sorting){
                slider.disabled=false;
                stop_sorting=false
                return
            }
        }
        bar1.style.backgroundColor="black"
    }
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "green";
    }
    sorting = false;
    slider.disabled=false;
}




async function merge_sort_with_visualization(list) {
    await merge_sort_visual(list, 0, list.length - 1);
    // Final visual indication of sorting completion (optional)
    showSortedVisual();
}

async function merge_sort_visual(list, left, right) {
    if (left >= right) {
        return;
    }

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
        if (leftArr[i] <= rightArr[j]) {
            list[k++] = leftArr[i++];
        } else {
            list[k++] = rightArr[j++];
        }
        await updateHistogram(list); // Visual update
        await sleep(100 - speed);
    }

    while (i < leftArr.length) {
        list[k++] = leftArr[i++];
        await updateHistogram(list); // Visual update
        await sleep(100 - speed);
    }

    while (j < rightArr.length) {
        list[k++] = rightArr[j++];
        await updateHistogram(list); // Visual update
        await sleep(100 - speed);
    }
}

async function updateHistogram(list) {
    const maxValue = Math.max(...list);
    const bars = document.getElementsByClassName("bar");
    
    for (let i = 0; i < list.length; i++) {
        let bar = bars[i];
        let height = (list[i] / maxValue) * 100;
        bar.style.height = `${height}%`;
    }
}


function showSortedVisual() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "green";
    }
}


let merge_sorting_btn = document.getElementById("merge_sort");

merge_sorting_btn.addEventListener("click", function(){
    merge_sort_with_visualization(data);
})
