const createlemnts = (arr) =>{
    const htmlelements = arr.map((el) => `<span class="bg-[#FECACA] text-[#EF4444]  border rounded-full gap-x-0.5 p-1">${el}</span>` );
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


// all- issues 
function all_issues(){
    const cards_container = document.getElementById("cards");
    

    const url= "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  fetch(url)
  .then(res=>res.json())
  .then((result) =>{
    alldata = result.data;
    showcards(alldata);

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
};


function openIssues(){
    const opendata = alldata.filter(item => item.status === "open");
    showcards(opendata);
};

function closedIssues(){
    const closedData = alldata.filter(item => item.status === "closed");
    showcards(closedData);
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


// display all issues as cards 

displayAllCards=(data)=>{
    const cards_container = document.getElementById("cards");
    // cards_container.innerHTML ="";

    const card = document.createElement("div");
    card.className = "shadow-md p-4 border-t-2 border-[#00A96E] rounded-md ";

    card.innerHTML=`
          <div class="flex items-center justify-between">
            <img src="assets/Open-Status.png" alt="">
            <div>
                 <h6 class="bg-[#FEECEC] text-[#EF4444]  border rounded-full px-2">${data.priority}</h6>
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

