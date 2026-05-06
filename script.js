const createlemnts = (arr) =>{
    const htmlelements = arr.map((el) =>{

        let val ="";
        
        if(el === "bug" ){
          val =  `<span class="bg-[#FECACA] text-[#EF4444]  
    border rounded-full gap-x-0.5 p-0.5">${el}</span>`
        }
        else if(el === "help wanted"){
            val =    `<span class ="bg-[#FFF8DB] text-[#D97706]
              border rounded-full gap-x-0.5 p-0.5">${el}</span>`
          
        }
        else{
         val =  `<span class ="bg-[#DEFCE8] text-[#00A96E] border rounded-full gap-x-0.5 p-0.5">${el}</span>`
        }
        return val;
         });

    return htmlelements.join(" ");

};


function active_btn(active_id){
    const btns =["all", "open", "closed", "searchbtn"];
    btns.forEach(element => {
        document.getElementById(element).classList.remove( "bg-[#4A00FF]" , "text-white" );
    });
    document.getElementById(active_id).classList.add("bg-[#4A00FF]" , "text-white")
}

// console.log('hello from js')
document.getElementById("signin-btn").addEventListener("click", ()=>{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // console.log(username, password);
    if(username === "admin" && password==="admin123"){
        document.getElementById("login_page").classList.add("hidden")
        document.getElementById("dashbord").classList.remove("hidden");
    }
})
 let alldata = [];

function dataArray(){
 
    const url= "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
  .then(res=>res.json())
  .then((result) =>{
    alldata = result.data;
    //  console.log(data.data)
  }
   );

}

function showcards(arr){
    const cards_container = document.getElementById("cards");
    cards_container.innerHTML ="";
    arr.forEach(element => {
        displayAllCards(element);
    });
    issuesCount(arr);
};

let cards_number = [];

// all- issues 
function all_issues(){
    // const cards_container = document.getElementById("cards");
    cards_number = [...alldata];
     showcards(alldata);
     active_btn("all");
}

function openIssues(){
    cards_number = alldata.filter(item => item.status === "open");
    showcards(cards_number);
    active_btn("open")
};

function closedIssues(){
    cards_number = alldata.filter(item => item.status === "closed");
    showcards(cards_number);
    active_btn("closed");
};

function search(){
    const searchitem = document.getElementById("search_item").value;

    cards_number = alldata.filter(item => item.title.toLowerCase().includes(searchitem.toLowerCase() ));

    showcards(cards_number);
    active_btn("searchbtn")
    
}

// searching data 
let searchdata=[];

function searchArray(){

    const url= "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications"
    fetch(url)
  .then(res=>res.json())
  .then((result) =>{
    searchdata = result.data;
    //  console.log(data.data)
  }
   );

}

// display all issues as cards 

displayAllCards=(data)=>{
    const cards_container = document.getElementById("cards");
    // cards_container.innerHTML ="";

    const card = document.createElement("div");
   

    let img ="";
    let st=" border-[#A855F7]";
    if(data.status === "open"){
        img =`
        <img src="assets/Open-Status.png" alt="">
        `
        st = `border-[#00A96E]`;
    }

    else{
        img = ` <img src="assets/Closed- Status .png" alt="">`
    }

    let prioritySection ="";
      if(data.priority === "high"){
        prioritySection =`
            <h6 class="bg-[#FEECEC] text-[#EF4444]  border rounded-full px-2">${data.priority}</h6>
            `
      }
      else if(data.priority === "medium"){
        prioritySection=`
        <h6 class="bg-[#FFF6D1] text-[#F59E0B] border rounded-full px-2">${data.priority}</h6>
        `
      }
    else
    {
        prioritySection=`
         <h6 class="bg-[#EEEFF2] text-[#9CA3AF] border rounded-full px-2">${data.priority}</h6>
        `
    }
 card.className =`shadow-md border-t-2 p-4 rounded-md space-y-3  ${st} `  ;
 card.addEventListener("click", function(){
    singleissues(data.id);
 }
);
    
    card.innerHTML=`
          <div class="flex items-center justify-between">
            ${img}
            <div>
            ${prioritySection}
            </div>
         
          </div>
          <div>
            <h2 class="font-semibold">
             ${data.title}
            </h2>
            <p>
             ${data.description}
            </p>
          </div>
          <div>
            <div class="flex flex-wrap gap-1">${createlemnts(data.labels)}</div>
          </div>
          <div class="mt-6 border-gray-500">
            <p>
              #${data.id} ${data.author}
            </p>
            <p>${data.createdAt}</p>
          </div>
    
    `;
    cards_container.appendChild(card);
}

function issuesCount(arr){

const noOfcard = document.getElementById("issues-counter")
noOfcard.innerHTML=`

<div class="flex items-center gap-1">
          <div>
            <img src="assets/Aperture.png" alt="">
          </div>
          <div>
            <div id="no-of-issues">
               <h2 class="font-semibold text-[20px]">${cards_number.length} Issues</h2>
            </div>
            <p>Track and manage your project issues</p>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <img class="h-3" src="assets/Open-Status.png" alt="">
          <p>open</p>
          <img class="h-3" src="assets/Closed- Status .png" alt="">
          <p>closed</p>
        </div>

`;
}

function singleissues(id){
    const url =`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(result => {
        const data = result.data;
        let colors =`<h2 class="p-0.5 bg-[#4A00FF]  text-white font-normal rounded-md">${data.status}</h2>`;
        if(data.status === "open"){
            colors = `<h2 class="p-0.5 bg-[#00A96E]  text-white font-normal rounded-md ">${data.status}</h2>`;
        }

        document.getElementById("modal_container").innerHTML = `
        
         <h3 class="text-lg font-bold">${data.title}</h3>
    <div class="items-center mb-4 flex gap-3">
      <p class="py-4">${colors}</p>
    <p>Opened by Fahim Ahmed</p>
    <p>22/02/2026</p>
    </div>
    <div class="mb-5">${createlemnts(data.labels)}</div>
    <p class="">${data.description}</p>
    <div class="flex gap-10 mt-5 shadow-sm bg-[#64748B]/5 mb-2 ">
      <div>
        <h1>Assignee:</h1>
        <h2>Fahim Ahmed</h2>
      </div>

      <div>
        <h1>Priority:</h1>
        <div class="bg-[#EF4444] text-white flex justify-center items-center px-3 py-1 rounded-sm">
        <h2>${data.priority}</h2>
        </div>
      </div>

    </div>
    <div class="flex justify-end">
       <form  method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn bg-[#4A00FF] text-white btn-neutral ">Close</button>
      </form>
      </div>
        
        `;
        document.getElementById("my_modal_1").showModal();

    })

}


dataArray();

searchArray()