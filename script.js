import bubble from "./sorting algorithms/bubble.js";
import merge from "./sorting algorithms/merge.js";
import selection from "./sorting algorithms/selection.js";
import quick from "./sorting algorithms/quick.js";
import insertion from "./sorting algorithms/insertion.js";
import utils from "./utils.js"

const histogram = document.getElementById("histogram");
let slider = document.getElementById("slider");
let slider2 = document.getElementById("speed");
utils.generate_array(5);
let maxValue;

for (let j = 0; j < utils.data.length; j++) {
    maxValue = Math.max(...utils.data)+15;
    let height = (utils.data[j] / maxValue) * 40;
    let width = 100 / utils.data.length;
    histogram.innerHTML += `<div id=${j} class='bar' style='height:${height}vw; width:${width}%;'></div>`;
}



slider.addEventListener("input", utils.slider_f);

slider2.addEventListener("input", function() {
    utils.speed=slider2.value
    bubble.update_speed(utils.speed)
    selection.update_speed(utils.speed)
    insertion.update_speed(utils.speed)
    merge.update_speed(utils.speed)
});



let bubble_sort_btn = document.getElementById("bubble_sort")
let generate_btn = document.getElementById("generate")

bubble_sort_btn.addEventListener("click", function() {
    if (!quick_sorting_btn.disabled) bubble.bubble_sort();
});

generate_btn.addEventListener("click", utils.generate_btn_f)


let selection_sort_btn = document.getElementById("selection_sort");
selection_sort_btn.addEventListener("click", function() {
    if (!quick_sorting_btn.disabled) selection.selection_sort();
});



let insertion_sort_btn = document.getElementById("insertion_sort")
insertion_sort_btn.addEventListener("click", function() {
    if (!quick_sorting_btn.disabled) insertion.insertion_sorting();
});


let merge_sorting_btn = document.getElementById("merge_sort");

merge_sorting_btn.addEventListener("click", function(){
    if (!quick_sorting_btn.disabled) merge.merge_sort_with_visualization(utils.data);
})

let quick_sorting_btn= document.getElementById("quick_sort")

quick_sorting_btn.addEventListener("click", function(){
    if (!quick_sorting_btn.disabled) quick.quick_sort();
})


export default {
    slider,
    maxValue};