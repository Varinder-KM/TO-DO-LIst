let avator = document.getElementById('avator_profile');
let profileName = document.getElementById('profile_name');
let p_name = document.getElementById('name');
let prof = document.getElementById('prof');
let list_collection = document.getElementById('avator_collaction');
let collection_img = document.getElementsByClassName('col_images');
let go_container = document.getElementById('to_go_container');
let task_dec = document.getElementById('task_input');
let task_date = document.getElementById('task_date');
let task_time = document.getElementById('task_time');
let action_icons = document.getElementsByClassName('action_icon');
let task_add_btn = document.getElementById('task_add');
let task_insert_btn = document.getElementById('add_btn');
let clearers = document.getElementsByClassName('task_clearer');
let com_container = document.getElementById('complete_container');
let done_task = document.getElementsByClassName('go_work_checker');


for(let img = 0; img < collection_img.length; img++){
    collection_img[img].addEventListener('click', () =>{
        changeCollection(img);
    });
}

// All Action

function change_avater(n){
    localStorage.removeItem('sex');
    localStorage.setItem('sex',n);   
}

function change_profile(){
    let name, profession;
    name = p_name.value;
    profession = prof.value;
    let pic  = localStorage.getItem('sex');
    let url;
    url = pic==0 ? 'images/avater_male_pic.png' : 'images/avater_female_pic.jpg';
    avator.style.backgroundImage = `url(${url})`;
    profileName.innerHTML =
    `<h4>${name}</h4>
    <p>${profession}</p>
    `    
}

function changeCollection(n){
    let url = 'images/home.png';
    url = sidebar_urls[n];
    list_collection.style.backgroundImage = `url(${url})`;
}

let task_icon = 0;
for(let i = 0; i< action_icons.length ; i++){
    action_icons[i].addEventListener('click', () =>{
        task_icon = i;
    });
}

function addFunction(){
    for(let i= 0; i< clearers.length; i++){
        clearers[i].onclick = function(){
            let div = this.parentElement;
            div.style.display = 'none';
        }

        done_task[i].onclick = function(){
            let div = this.parentElement;
            let done_div = document.createElement('div');
            done_div.innerHTML = div.innerHTML;
            done_div.classList.add('completed');
            com_container.append(done_div);
            div.style.display = 'none';
            addFunction();
        }
    }
}

let task_values = [];
 task_add_btn.addEventListener('click', ()=>{
     try{
       let arr = getTaskData();
       task_values = arr,
         CreatTask();
     }catch(err) {
         alert(err.message);
     }
     model.classList.toggle("popup");
     blur1.classList.toggle('active');
     blur2.classList.toggle('active');
     
 });

function CreatTask(){
        let div = document.createElement('div');
        div.innerHTML = `
        <input type="checkbox"  name="done" class="go_work_checker"  />
        <div class="task">
            <div class="t_dec">
                <div class="icon" style="background-image:url(${task_values[0]})"></div>
                <p>${task_values[1]}</p>
            </div>
        
            <div class="t_due">
                <div class="icon" style="background-image: url(/images/schedule.png);"></div>
                <p >${task_values[2]}</p>
                <p class="time" >${task_values[3]}</p>
            </div>                    
        </div>
        <div class="task_clearer">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
        </div>
        `
        div.classList.add('To-Go');
        go_container.append(div);
        addFunction();
}
function getTaskData(){
    let arr = [];
    arr[0] = all_activity_icons[task_icon];
    arr[1] = task_dec.value;
    arr[2] = task_date.value;
    arr[3] = task_time.value;

    return arr;
}
