import moment from "moment-timezone";

export const convertToCurrentTzTime = (startTime, timeZone) => {
    let convertedDateTime = null;
    let today = moment().utcOffset(timeZone).format('M-D-Y');
    let isDst = moment().isDST();
    console.log('conver to current tz time');
    console.log(today);
    // let tzOffset = moment().tz(timeZone).utcOffset();
    let digitOffset = timeZone.toString().substring(2,1);
    let adjustedOffsetDst = '-' + digitOffset + ':00';
    let adjustedOffset = '-' + (parseInt(digitOffset) + 1) + ':00';
    let offSet = isDst ? adjustedOffsetDst : adjustedOffset;

    let todayPlusTime = `${today} ${startTime} ${offSet}`;
    let gameDateTime = moment(todayPlusTime, 'M-D-Y hh:mm a Z').format('MM/DD/YY h:mm a');
    convertedDateTime = moment(gameDateTime).utcOffset(timeZone).format('h:mm a');

    return convertedDateTime
}
