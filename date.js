module.exports.getDate=getDate;


function getDate(){
    var today=new Date();
    var currentDay=today.getDay();
    var options={
        weekday:"long",
        day:'numeric',
        month:'long'
    }
    var day=today.toLocaleDateString("en-US",options);


    switch(currentDay){
        case 0:
            currentDay="Sunday";
            break;
        case 1:
            currentDay="Monday";
            break;
        case 2:
            currentDay="Tuesday";
            break;
        case 3:
            currentDay="Wednesday";
            break;
        case 4:
            currentDay="Thursday";
            break;
        case 5:
            currentDay="Friday";
            break;
        case 6:
            currentDay="Saturday";
            break;
        default:
            currentDay="ok";
            break;
    }
    return day;
}