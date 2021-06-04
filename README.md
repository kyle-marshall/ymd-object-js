### Preface

I recommend using [dayjs](https://github.com/iamkun/dayjs/) for your project.

While I may continue to expand `ymd-object` for fun, I made it as a minimal alternative for one feature that Moment.js made convenient for me. This was before I knew about dayjs.

If you want to use or contribute to `ymd-object` anyways, go right ahead!

---

### What's `ymd-object`?

`ymd-object` is a tiny library which defines a handy class called `YMD` which stores a simple date (no time components).

### Why?

Confusing results may arise when using the standard Date object for dates (e.g. `new Date("2020-01-01")`).

If you construct a normal `Date` as shown above, you sometimes find yourself facing off by one errors when you try to figure out what day it is, depending on your timezone.
For example, `(new Date("2020-01-01")).getDate()` may return `31`.

In this case, the correct solution would have been to use `getUTCDate` instead of `getDate`.

In many situations it would be nicer to not think about the time components at all. The `YMD` class is here to make it harder to make mistakes related to time zones. It stores the year month and date as plain old numbers and provides some common formatting options and a `toDate` function which creates a date set to midnight UTC or local time (UTC by default).

In summary, this package just helps you get the date right.

---

### How to use `ymd-object`

<br>

#### install with npm

```shell
npm install ymd-object
```

<br>

#### import YMD


```javascript 
import { YMD } from "ymd-object";
```
*or with require*

```javascript 
const { YMD } = require("ymd-object");
```
<br>

#### Create a YMD object
<br>

*from a string formatted like YYYY-MM-DD*

```javascript 
const myDate = new YMD("2020-01-31");
```

*or from a simple object*

```javascript 
const myDate = new YMD({y: 2020, m: 1, d: 31});
```

*or from a vanilla js Date (optional 2nd parameter utc defaults to true)*

```javascript 
const myDate = YMD.fromDate(someDate); // uses UTC date of someDate
```

```javascript 
const myDate = YMD.fromDate(new Date(), false); // uses current local date
```
*or using current date (optional 2nd parameter utc defaults to true)*

```javascript 
const myDate = YMD.today(); // uses current UTC date
```

```javascript 
const myDate = YMD.today(false); // uses current local date
```
<br>

#### Get or set year / month / date


```javascript
const { y, m, d } = myDate; // deconstruct a YMD object

myDate.y = 1999; // change a YMD object

myDate.setFromString("1999-10-20"); // change date using a string

myDate.setFromDate(someDate); // change date using a vanilla js Date (UTC date)

myDate.setFromDate(someDate, false); // change date using a vanilla js Date (local date)
```

<br>

#### Convert to a vanilla js Date (set at midnight UTC unless optional utc param is false)

```javascript
myDate.toDate(); // 2020-01-31T00:00:00.000Z

myDate.toDate().getUTCDate(); // 31

myDate.toDate(false); // 2020-01-31T08:00:00.000Z (for me; depends on time zone)

myDate.toDate(false).getDate(); // 31 (local date)
```

<br>

#### Formatting

`ymd-object` provides some minimal date formatting options

```javascript
myDate.toString(); // returns "2020-01-31"

myDate.toString("MDY"); // returns "01/31/2020"

myDate.toString("MDY_NO_PAD"); // returns "1/31/2020"

myDate.toString("LONG"); // returns "Fri, 31 Jan 2020"
```

You can also simply combine the static "from" methods with the "toString" method if you don't want to keep the YMD object around:

```javascript
YMD.fromString("2020-01-31").toString("LONG"); // returns "Fri, 31 Jan 2020"
```

The formatting feature may be expanded in the future to allow formatting with special strings to define the format e.g. maybe you are weird and like hashtags instead of dashes so you would use
```javascript 
myDate.toString("YYYY#MM#DD"); // DOESN'T WORK YET!
```
