let grid = document.getElementById("grid");
let slider_size= document.getElementById("size")
let slider_speed= document.getElementById("speed")
let size=slider_size.value;
let speed;
let sorting=false;
let stop_sorting=false;
generate_grid()
slider_size.addEventListener("input", function(){
    size=slider_size.value
    generate_grid()
})

slider_speed.addEventListener("input", function(){
    speed = slider_speed.value
})

function generate_grid(){ 
    grid.innerHTML=""   
    for (let y = 0; y < size; y++) {
        let row = document.createElement('div');
        row.id = `row-${y}`;
        row.className = 'row';

        grid.appendChild(row);
        for (let x = 0; x < size; x++) {
            let cube = document.createElement('div');
            cube.id = `${y},${x}`;
            cube.style.height=`${40/size}vw`;
            cube.style.width=`${40/size}vw`;
            cube.className = 'cubes';
            let blocking_entrance= (x==1 && y==1) || (x==0 && y==1) || (x==1 && y==0) || (x==0 && y==0)
            let blocking_exit = (x==size-1 && y==size-1) || (x==size-2 && y==size-1) || (x==size-1 && y==size-2) || (x==size-2 && y==size-2)
            if(!blocking_entrance && !blocking_exit && Math.random()<0.2) cube.style.backgroundColor = 'black';
            row.appendChild(cube);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function check_rock(block, direction){
    let x = parseInt(block.id[2])
    let y = parseInt(block.id[0])
    let direc_block;
    if(direction == "right"){
        direc_block = document.getElementById(`${y},${x+1}`)
    }else if(direction=="left"){
        direc_block = document.getElementById(`${y},${x-1}`)
    }else if(direction=="down"){
        direc_block = document.getElementById(`${y+1},${x}`)
    }else{
        direc_block = document.getElementById(`${y-1},${x}`)}

    if (direc_block==null) return false
    let color = direc_block.style.backgroundColor
    return color=="black"
}

async function breath_first_search(){
    let hash_map = new Map()
    sorting=true
    slider_size.disabled=true
    Array.from(document.getElementsByClassName("cubes")).forEach(block=>{
        if (block.style.backgroundColor=="black") return;
        let str= block.id.split(",")
        let x = parseInt(str[1])
        let y = parseInt(str[0])
        let d_x=[-1,1,0,0]
        let d_y=[0,0,-1,1]

        if ((x==size-1 && !check_rock(block, "left"))||(check_rock(block,"right") && x!=0)) d_x=[-1,0,0,0]
        else if ((x==0 && !check_rock(block, "right"))|| (check_rock(block,"left") && x!=size-1)) d_x=[0,1,0,0]
        else if((x==size-1 && check_rock(block, "left")) || (x==0 && check_rock(block, "right"))) d_x=[0,0,0,0]

        if ((y==size-1 && !check_rock(block, "up")) || (check_rock(block,"down") && y!=0)) d_y=d_y=[0,0,0,1]
        else if ((y==0 && !check_rock(block, "down")) || (check_rock(block,"up") && y!=size-1)) d_y=d_y=[0,0,-1,0]
        else if((y==size-1 && check_rock(block, "up")) || (y==0 && check_rock(block,"down"))) d_y=[0,0,0,0]

        hash_map.set(block.id, [d_x, d_y]);
    })

    console.log(hash_map)
    for(let i of Array.from(hash_map.keys())){
        let k=hash_map.get(i)
        let res=[]
        for(let x=0; x<4;x++){
            let str= i.split(",")
            let rr=parseInt(str[1])+parseInt(k[0][x])
            let cc=parseInt(str[0])-parseInt(k[1][x])
            if (`${cc},${rr}`!=i) res.push(`${cc},${rr}`)
            }
            hash_map.set(i, res);
    }

  

    let visited= new Set()
    let queue=["0,0"]
    let prev= new Map()
    prev.set("0,0",null)
    while (queue.length>0){
        let vertix = queue.shift()
        let neighbors;
        neighbors= hash_map.get(vertix)
        if(neighbors==null){continue}
        for (let node of neighbors){
            if (!visited.has(node)){
                let block=document.getElementById(node)
                if(block.style.backgroundColor!="black") block.style.backgroundColor="blue"
                await sleep(100-speed)
                visited.add(node)
                queue.push(node)
                prev.set(node, vertix)
                if (stop_sorting){
                    slider_size.disabled=false
                    stop_sorting=false
                    return
                }
            }
        }
    sorting=true
    slider_size.disabled=true
    }

    prev.set("0,0",null)
    console.log(prev)

    let current=`${size-1},${size-1}`
    let path=[]

    while(current!=null){
        path.push(current)
        current=prev.get(current)
    }

    path=path.reverse()

    path.forEach(id=>{
        let block=document.getElementById(id)
        block.style.backgroundColor="green"
    })

    Array.from(document.getElementsByClassName("cubes")).forEach(block=>{
        if (block.style.backgroundColor=="blue") block.style.backgroundColor=""
    })
}

let algo = document.getElementById("bfs")
algo.addEventListener("click", breath_first_search)

let generate_btn = document.getElementById("generate")
generate_btn.addEventListener("click", function(){
    stop_sorting=true;
    generate_grid()
})

