// Timzeone `Z` stands for Zulu timezone, which is equivalent to UTC
// sh> date -u +"%Y-%m-%dT%H:%M:%SZ" # print ISO date in UTC timezone
// sh> date +%Y-%m-%dT%H:%M:%S%z # print ISO date in local timezone


// JS Date object instantiate and work with local time, but internally it store UTC time!
console.log("new Date()", new Date()); // Prints ISO format in UTC timezone
var event = new Date(Date.UTC(2020, 7, 15, 18, 45, 0));
console.log("event", event);
console.log("event.toString()", event.toString());
console.log("event.toISOString()", event.toISOString());
console.log("event.toLocaleString('en-US', {timezone: 'EST'})", event.toLocaleString('en-US', {timezone: 'EST'}));
console.log("event.toLocaleString('zh-CN')", event.toLocaleString('zh-CN'));
// console.log("event.toLocaleString('zh-CN', { timeZone: 'CST' })", event.toLocaleString('zh-CN', { timeZone: 'CST' }));


const dayjs = require("dayjs");
console.log("dayjs().format()", dayjs().format());
console.log("dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]')", dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'));

var toObject = require('dayjs/plugin/toObject');
dayjs.extend(toObject);
console.log("dayjs().toObject()", dayjs().toObject());

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
console.log("dayjs().fromNow()", dayjs().fromNow());

var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);
console.log("dayjs().format('LLLL')", dayjs().format('LLLL'));

var utc = require('dayjs/plugin/utc'); // dependent on utc plugin
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
console.log('dayjs.tz("2014-06-01 12:00", "America/New_York")', dayjs.tz("2014-06-01 12:00", "America/New_York"));
console.log('dayjs("2014-06-01 12:00").tz("America/New_York")', dayjs("2014-06-01 12:00").tz("America/New_York"));
console.log("dayjs.tz.guess()", dayjs.tz.guess());

// https://stackoverflow.com/questions/45685066/how-to-format-date-time-in-a-specific-timezone-with-the-javascript-date-fns-libr
// the .format() takes timezone param option!
var event = dayjs('2014-06-02T00:00:00.000Z').format('MM/DD/YYYY h:mm:ss A [GMT]ZZ (z)', { timeZone: 'America/New_York' });
console.log("event - dayjs display in specific timezone", event);
