# ymd-object-js

## What's this?

ymd-object-js is a tiny library which defines a simple but handy object called YMD which deals with simple dates (no time components).

## Why?

Confusing results may arise when using the standard Date object for dates (e.g. `new Date("2020-01-01")`).

If you construct a normal `Date` as shown above, you sometimes find yourself facing off by one errors when you try to figure out what day it is, depending on your timezone.
For example, `(new Date("2020-01-01")).getDate()` may return `31`.

Oh my! It would be nice to not think about that.
The YMD class is here to make it hard to make such a mistake. It stores the year month and date as numbers exactly as you want, and provides some common formatting options and a `toDate` function which creates a date set to midnight UTC time instead of local time.

Here's an example of how the toDate function could be useful:

`(new Date("2020-01-01")).getFullYear()` may give you `2019`

but `(new YMD("2020-01-01")).toDate().getFullYear()` will give you `2020`

However, when you already have a `YMD` object, you don't even need to convert to a Date in order to find out what year it is. You can access the `y` property instead.

In summary, the YMD class is a tiny library to help you get the Date right. Many have turned to Moment.js to solve these issues, but the moment package is relatively large and you may not need most of its features.

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

#### formatting

ymd-object provides some minimal date formatting options

`myDate.toString() // returns "2020-01-31"`

`myDate.toString("MDY") // returns "01/31/2020"`

`myDate.toString("MDY_NO_PAD") // returns "1/31/2020"`

`myDate.toString("LONG") // returns "Fri, 31 Jan 2020"`

The formatting feature may be expanded in the future.