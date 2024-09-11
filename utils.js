import main from "./script.js"
import bubble from "./sorting algorithms/bubble.js";
import merge from "./sorting algorithms/merge.js";
import selection from "./sorting algorithms/selection.js";
import quick from "./sorting algorithms/quick.js";
import insertion from "./sorting algorithms/insertion.js";

let data=[];
let speed=0;
let sorting = false;
let slider = document.getElementById("slider")
let histogram = document.getElementById("histogram")
let histogram_len=5
let stop_sorting=false;

async function update_histogram(){
    for (let j = 0; j < data.length; j++) {
        let bar = document.getElementById(`${j}`)
        let height = (data[j] / main.maxValue)*40;
        let width = 100 / data.length;
        bar.style.height=`${height}vw`
        bar.style.width=`${width}%`
    } 
}

function disable_btns(bool){
    sorting=bool
    let btns = document.getElementsByClassName("btn");
    Array.from(btns).forEach(btn => {
        btn.disabled = bool;
    });

}

function showSortedVisual() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "green";
    }
}

function swap(num1, num2){
    let swap = data[num1]
    data[num1]=data[num2]
    data[num2]=swap
    update_histogram()
}

function slider_f(){
    histogram.innerHTML =""
    histogram_len=slider.value
    generate_array(histogram_len)

    for (let j = 0; j < data.length; j++) {
        let height = (data[j] / main.maxValue)*40;
        let width = 100 / data.length;
        histogram.innerHTML += `<div id=${j} class='bar' style='height:${height}vw; width:${width}%;'></div>`;
    }
    update_histogram()
}

function generate_array(len) {
    data.length = 0;
    for (let i = 0; i < len; i++) {
        let randomInt = Math.floor(Math.random() * 80) + 20;
        data.push(randomInt);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generate_btn_f(){
    if (sorting){
        bubble.update_stop_sorting(true)
        selection.update_stop_sorting(true)
        insertion.update_stop_sorting(true)
        merge.update_stop_sorting(true)
        quick.update_stop_sorting(true)
    }
    histogram.innerHTML =""
    generate_array(histogram_len)
    for (let j = 0; j < data.length; j++) {
        let height = (data[j] / main.maxValue) * 100;
        let width = 100 / data.length;
        histogram.innerHTML += `<div id=${j} class='bar' style='height:${height}%; width:${width}%;'></div>`;
    }
}


export default {
    update_histogram,
    sleep,
    generate_btn_f,
    generate_array,
    swap,
    slider_f,
    showSortedVisual,
    disable_btns,
    stop_sorting,
    data,
    speed,
    sorting
}