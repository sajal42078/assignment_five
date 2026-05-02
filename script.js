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

//  [
// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"


// priority section


// display all issues as cards 

displayAllCards=(data)=>{
    const cards_container = document.getElementById("cards");
    // cards_container.innerHTML ="";

    const card = document.createElement("div");
    card.className = "shadow-md p-4 border-t-2 border-[#00A96E] rounded-md ";

    let img ="";
    if(data.status === "open"){
        img =`
        <img src="assets/Open-Status.png" alt="">
        `
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

dataArray();

function active_btn(active_id){
    const btns =["all", "open", "closed"];
    btns.forEach(element => {
        document.getElementById(element).classList.remove( "bg-[#4A00FF]" , "text-white" );
    });
    document.getElementById(active_id).classList.add("bg-[#4A00FF]" , "text-white")
}