# ymd-object-js

## What's this?

`ymd-object` is a tiny library which defines a handy class called `YMD` which stores a simple date (no time components).

### Why?

Confusing results may arise when using the standard Date object for dates (e.g. `new Date("2020-01-01")`).

If you construct a normal `Date` as shown above, you sometimes find yourself facing off by one errors when you try to figure out what day it is, depending on your timezone.
For example, `(new Date("2020-01-01")).getDate()` may return `31`.

In this case, the correct solution would have been to use `getUTCDate` instead of `getDate`.

It would be nice to not think about the time components at all. The `YMD` class is here to make it hard to make any mistake related to time zones. It stores the year month and date as numbers exactly as you want, and provides some common formatting options and a `toDate` function which creates a date set to midnight UTC time instead of local time.

In summary, this tiny package helps you get the date right.

## How to use it

#### npm install

`npm install ymd-object`

#### import YMD

`import { YMD } from "ymd-object"`

#### create a date

-- from a ymd string --

`const myDate = new YMD("2020-01-31");`

-- or from a simple object --

`const myDate = new YMD({y: 2020, m: 1, d: 31})`

-- or from a vanilla js Date --

`const myDate = YMD.fromDate(someDate)`

#### get or set year / month / date

`const { y, m, d } = myDate; // deconstruct a YMD object`

`myDate.y = 1999; // change a YMD object`

#### convert to a vanilla js Date (set at midnight UTC)

`myDate.toDate() // 2020-01-31T00:00:00.000Z`

`myDate.toDate().getUTCDate() // 31`

#### formatting

ymd-object provides some minimal date formatting options

`myDate.toString() // returns "2020-01-31"`

`myDate.toString("MDY") // returns "01/31/2020"`

`myDate.toString("MDY_NO_PAD") // returns "1/31/2020"`

`myDate.toString("LONG") // returns "Fri, 31 Jan 2020"`

The formatting feature may be expanded in the future.