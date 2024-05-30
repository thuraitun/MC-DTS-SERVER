const getTimeComponents = (dateTime) => {
    const date = new Date(dateTime);
    return {
        getDate: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
    };
};

const isValidTime = (start_date, end_date) => {

    console.log("StartDate",start_date);
    console.log("EndDate",end_date);
    
    // get current date
    const currentTime = new Date();
    const currentDate = currentTime.getDate();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();    

    const reqDate = getTimeComponents(start_date);
    const startTime = getTimeComponents(start_date);
    const endTime = getTimeComponents(end_date);

    // 
    if (reqDate.getDate === currentDate ) {
        const isStartTimeValid =
            startTime.hours > currentHours ||
            (startTime.hours === currentHours &&
                startTime.minutes > currentMinutes);

        const isEndTimeValid =
            endTime.hours > startTime.hours ||
            (endTime.hours === startTime.hours &&
                endTime.minutes > startTime.minutes);

        return isStartTimeValid && isEndTimeValid;
    } 

    if (endTime.hours > startTime.hours) return true

    return endTime.hours === startTime.hours && endTime.minutes > startTime.minutes;
};

module.exports = isValidTime
