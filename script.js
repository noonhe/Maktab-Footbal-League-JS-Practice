///////////////////////////////////////////////////Declarations///////////////////////////////////////////////////////

let array_of_teams = [];
let array_of_groups = [];
let state = ["undefined", "readyToPlay", "spareTime", "lost", "won"];
let number_of_teams = getNumberOfPlayers();
let random1;
let random2;
let winers = 0;

/////////////////////////////////////////////////main////////////////////////////////////////////////////////////////



main();



/////////////////////////////////////////////function////////////////////////////////////////////////////////////////

//تعداد بازیکن ها را میگیرد و اگر کاربر چیزی غیر از عدد وارد کند اخطار میدهد
function getNumberOfPlayers(){
    let num;
    while (true) {
        num = prompt("سلام! لطفا تعداد شرکت کنندگان را وارد نمایید:");
        if(Number(num) == num){
            break;
        }
        else{
            alert("مقدار صحیح (عدد) وارد کنید!!!");
        }
    }
    return Number(num);
}


// تابع اصلی بازی
function main() {

    console.log("این بازی " + number_of_teams + "  شرکت کننده دارد!");

    getTeamsNames(number_of_teams, array_of_teams);

    while (true) {
        for (let i = 0; i < number_of_teams; i++) {

            if (array_of_teams[i].is_matched === false) {

                winers++;

            }

        }
        if (winers === 1) {
            break;

        }
        goroohBandi(); //گروه بندی کردن تیم ها 

        alert("شروع بازی ها");

        theGameIsOn(array_of_groups); //بازی ها بین تیم های هر گروه و مشخص شدن برنده ها و بازنده ها
        winers = 0;

    }

    ranking();

}



//نام تیم های شرکت کننده را میدهد 
function getTeamsNames(num, arr) {

    for (let i = 0; i < num; i++) {

        let name = prompt("Enter team number" + (i + 1) + "'s name please!");
        arr[i] = makeTeam(name, i + 1);
        console.log("نام تیم شماره " + (i + 1) + " " + arr[i].name + " است.");

    }

}

//تابع زیر برای تیم ها، شی میسازد تا اطلاعات تیم ها را دربرگیرد
function makeTeam(name, num) {

    return {

        name: name, //نام بازیکن
        number: num, // شماره بازیکن
        games: 0, // تعداد بازی های بازیکن
        wins: 0, //تعداد برد های بازیکن
        rival: "", //نام همبازی 
        is_matched: false, //مشخص میکند که آیا رقیبی برایش انتخاب شده
        goals: 0, //تعداد گلهایی که میزنه
        khorde: 0, // گلهایی که میخوره
        tafazol : 0,
        hazf : false,
        state: state[0] //مقادیر شامل برنده، بازنده، وقت اضافه

    };

}

//تولید گروه
function makeSet(riv1, riv2, num , st) {

    return {

        rival1: riv1,
        rival2: riv2,
        group_number: num,
        state: st
    };

}


//تولید عدد رندوم
function makeRandom(num) {

    return Math.floor(Math.random() * Math.floor(num));

}


function goroohBandi() {

    for (let i = 0; i < Math.floor(winers / 2); i++) {

        while (true) { //این حلقه برای گروهبندی نوشته شده!

            random1 = makeRandom(number_of_teams);

            if (array_of_teams[random1].is_matched === false) { //تیم انتخاب شده هنوز رقیب ندارد

                array_of_teams[random1].is_matched = true;

                while (true) {

                    random2 = makeRandom(number_of_teams);

                    if (array_of_teams[random2].is_matched === false) {

                        //حالا تیم منتخب رقیب دارد
                        array_of_teams[random2].is_matched = true;
                        array_of_teams[random1].rival = array_of_teams[random2].name; //حالا نام رقیبهایشان هم در آنها ثبت میشود
                        array_of_teams[random2].rival = array_of_teams[random1].name;
                        array_of_groups[i] = makeSet(array_of_teams[random1], array_of_teams[random2], i + 1, state[1]);
                        break;

                    }

                }

                break;

            }

        }
        console.log("دسته شماره: " + (i + 1) + " :" + " " + array_of_teams[random1].name + " و" + array_of_teams[random2].name + ".");


    }

    if (winers % 2 !== 0) { //اگه تعداد تیم ها فرد باشه برای اون یکی که تک باقی مونده وضعیتش رو به وقت اضافه تغییر میده

        for (let j = 0; j < number_of_teams; j++) {

            if (array_of_teams[j].is_matched === false) {

                array_of_teams[j].state = state[4]; //برنده شده و میره مرحله بعدی
                console.log("تیم " + array_of_teams[j].name + " تکی موند و به مرحله بعد صعود میکنه!");
                break;

            }

        }



    }

}


function theGameIsOn(array_of_groups) {
    
    for (let i = 0; i < array_of_groups.length; i++) {

        do {
            console.log("گروه شماره " + array_of_groups[i].group_number + " :");
            random1 = makeRandom(6); //تولید عدد رندوم بین 0 تا 5
            random2 = makeRandom(6);
            array_of_groups[i].rival1.goals += random1; //گلهایی که زده اضافه میشود
            array_of_groups[i].rival1.khorde += random2; //گلهایی که خورده اضافه میشود
            console.log(array_of_groups[i].rival1.name + " " + random1 + " تا گل زد!");
            array_of_groups[i].rival2.goals += random2;
            array_of_groups[i].rival1.khorde += random1;
            console.log(array_of_groups[i].rival2.name + " " + random2 + " تا گل زد!");
            if (random1 === random2) {

                array_of_groups[i].state = state[2];
                console.log("بازی مساوی شد و به مرحله وقت اضافه کشیده میشود!");

            }
        } while (random1 === random2); //در صورتی که مساوی بشوند باز باید این عملیات تکرار شود
        array_of_groups[i].rival1.games++;
        array_of_groups[i].rival2.games++;
        if (random1 > random2) {

            array_of_groups[i].rival1.state = state[4];
            array_of_groups[i].rival2.state = state[3];
            array_of_groups[i].rival2.tafazol = random2 - random1;
            array_of_groups[i].rival2.hazf = true; //حذف شد.
            array_of_groups[i].rival1.is_matched = false; //برای مرحله بعد که دوباره قرار است همگروهی انتخاب شود
            console.log(array_of_groups[i].rival1.name + " در این بازی برنده شد و " + array_of_groups[i].rival2.name + " باخت!");

        } else {
            array_of_groups[i].rival2.state = state[4];
            array_of_groups[i].rival1.state = state[3];
            array_of_groups[i].rival1.tafazol = random1 - random2;
            array_of_groups[i].rival1.hazf = true; // بازنده حذف میشود
            array_of_groups[i].rival2.is_matched = false; //برای مرحله بعد که دوباره قرار است همگروهی انتخاب شودُ
            console.log(array_of_groups[i].rival2.name + " در این بازی برنده شد و " + array_of_groups[i].rival1.name + " باخت!");
        
        }

    }

    array_of_groups.splice(0 , array_of_groups.length); // پاک کردن آرایه گروه ها برای مرحله بعدی

}

function ranking() {

    for (let i = 0; i < array_of_teams.length; i++) {
        
        array_of_teams[i].tafazol = array_of_teams[i].goals - array_of_teams[i].khorde;
        console.log("تفاضل گل های زده و خورده تیم "+ array_of_teams[i].name+ " :"+ array_of_teams[i].tafazol);
    }
    sortTeamsBasedOnTafazol();

    for (let i = 0; i < array_of_teams.length; i++) {

        console.log("رتبه ی " + (i + 1) + array_of_teams[i].name + " :" + "با تفاضل گل : " + array_of_teams[i].tafazol+ 
    " و تعداد گل های زده شده : " + array_of_teams[i].goals + " و تعداد گلهای خورده شده : " + array_of_teams[i].khorde + " و مجموعا " + array_of_teams[i].games + " بازی.");
    
    }
}

function sortTeamsBasedOnTafazol() {

    let temp;
    let index;

    for (let i = 0; i < array_of_teams.length-1; i++) {
        
        temp = array_of_teams[i];
        index = i;

        for (let j = i+1; j < array_of_teams.length; j++) {
            
            if (array_of_teams[j].tafazol > temp.tafazol) {

                temp = array_of_teams[j];
                index = j;
                
            }
            
        }

        array_of_teams[index] = array_of_teams[i]; 
        array_of_teams[i] = temp;
        
    }
    
}