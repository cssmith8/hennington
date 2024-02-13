export const menace = (user: string) => {
    //reutrn true if the username has the word "hunter" in it
    return user.toLowerCase().includes("hunter");
}

let timeStamp : number = 0;

//getter for the timestamp
export const getTimeStamp = () => {
    return timeStamp as number;
}

//setter for the timestamp
export const setTimeStamp = (time: number) => {
    timeStamp = time;
}