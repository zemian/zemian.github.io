---
title: Build a DatePicker Using VueJS and BulmaCSS
date: 2021-12-01
tags:
- vuejs
- bulmacss
- datepicker
---

I took the challenge to build a simple DatePicker web component using VueJS and BulmaCSS, and here is the result!

<p class="codepen" data-height="653" data-default-tab="result" data-slug-hash="vYJbwzY" data-user="zemian" style="height: 653px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/zemian/pen/vYJbwzY">
  Vue+Bulma Date Picker</a> by Zemian Deng (<a href="https://codepen.io/zemian">@zemian</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Just in case if you can't view the Live CodePend demo above, here is the source code for it:

{% verbatim %}
```
<!-- Let's build a Date Picker using Vue3 and BulmaCSS -->
<template>
  <!-- The CodePen's VuePen only allow one SCF, so we are adding some page styling code in this template as well, so it will look nice in CodePen.-->
  <div class="section">
    <div class="container">
      <h1 class="title has-text-centered">My Custom VueJS DatePicker</h1>
      <div class="columns">
        <div class="column is-3"></div>
        <div class="column is-6">

          <!-- DatePicker template starts here. -->
          <div>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input" type="input" placeholder="YYYY-MM-DD"
                       @click="openCalendar" v-model="dateInput">
                <span class="icon is-small is-left">
                  <i class="fas fa-calendar"></i>
                </span>
              </div>
              <div class="panel p-4" v-if="isCalendarOpen">
                <div class="columns is-mobile">
                  <div class="column is-1 has-text-left">
                    <a @click="previousMonth">
                    <span class="icon"><i class="fas fa-arrow-left"></i></span>
                    </a>
                  </div>
                  <div class="column">
                    <div class="is-size-4 has-text-weight-bold is-flex is-justify-content-center is-align-items-center">
                      {{getDisplayMonthYear(currentMonthDate)}}
                    </div>
                  </div>
                  <div class="column is-1 has-text-right">
                    <a @click="nextMonth">
                      <span class="icon"><i class="fas fa-arrow-right"></i></span>
                    </a>
                  </div>
                </div>
                <div class="is-flex is-justify-content-center is-align-items-center"
                     style="margin-top: -1.5rem; margin-bottom: .5rem; font-size: .75rem;">
                  <a @click="resetCurrentMonthDate" v-if="!isCurrentMonth()">Go to Today</a>
                </div>
                <div style="display: grid;
                            grid-template-rows: repeat(5, 1fr);
                            grid-template-columns: repeat(7, 1fr);
                            ">
                  <div class="has-text-weight-bold is-flex is-justify-content-center is-align-items-center"
                       v-for="weekDay in $options.weekdayLabels">
                    <span class="is-size-5">{{weekDay}}</span>
                  </div>
                  <div class="is-flex is-justify-content-center is-align-items-center"
                       v-for="date in dates">
                    <div class="is-size-6" style="cursor: pointer;" @click="selectDate(date)">
                      <div :style="{padding: '.5rem', border: isToday(date) ? '1px solid green' : ''}">
                        {{getDisplayDate(date)}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- DatePicker template ends here. -->

        </div>
        <div class="column is-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
const mycalendar = {
    /**
     * Generate an array of dates for a given date as the current month (today's month calculated with local
     * datetime). We assume the the week starts on SUN. If the first date of the month does not start on
     * SUN, then previous month dates will be filled first. Same as on the last week of the month. It will
     * filled with next month's dates to complete the week.
     *
     * The purpose of this array of dates is useful for displaying a month view in a monthly calendar.
     *
     * Note that the returned array length may vary between 42 or 35 elements. That is because some month requires
     * 42 days (6 weeks) to hold all the month's dates, while others may contain only 35 days is enough.
     *
     * @param date a JS Date object.
     * @returns array of either 42 or 35 Date objects of a given month.
     */
    createCalendarMonthDates(date) {
        // Set the given input to the first of current month
        const currentMonth = date.getMonth();
        const currentMonthDate = new Date(date.getFullYear(), currentMonth, 1, 0, 0, 0, 0);
        const weekDay = currentMonthDate.getDay(); // 0-6 => SUN-SAT
        const dates = []; // Result for return

        // Populate dates before the current month on the first week
        for (let i = weekDay - 1; i >= 0; i--) {
            const dt = new Date(currentMonthDate.getTime());
            dt.setDate(-1 * i);
            dates.push(dt);
        }
        // Populate rest of the first week
        let day = 1;
        for (let i = 0; i < 7 - weekDay; i++) {
            const dt = new Date(currentMonthDate.getTime());
            dt.setDate(day++);
            dates.push(dt);
        }

        // Populate rest of current month dates
        while (day <= 31) {
            const dt = new Date(currentMonthDate.getTime());
            dt.setDate(day++);
            dates.push(dt);

            // Stop if we have reached the end of current month dates
            const nextDate = new Date(dt.getTime());
            nextDate.setDate(nextDate.getDate() + 1);
            if (nextDate.getMonth() !== currentMonth) {
                break;
            }
        }

        // Populate the dates after the current month on the last week.
        const lastWeekDay = dates[dates.length - 1].getDay();
        const max = 6 - lastWeekDay;
        for (let i = 0; i < max; i++) {
            const dt = new Date(currentMonthDate.getTime());
            dt.setDate(day++);
            dates.push(dt);
        }

        return dates;
    }
}

/* This is the Vue ViewModel object. */
export default {
  weekdayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthLabels: ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'],
  data() {
    return {
      dateInput: '',
      isCalendarOpen: false,
      dates: [],
      currentMonthDate: null,
    };
  },
  watch: {
    dateInput: function (newVal) {
      /* The JS Date object parsing from string is not reliable. Also it always assume date input is in UTC,
      * which will resulted in wrong date in calendar display. We will assume user input is in YYYY-DD-MM, and
      * parse it our own and create a Local date instance instead. If user input is invalid, it will default
      * to current timestamp. */
      const parts = newVal.split('-');
      if (parts.length === 3) {
        this.currentMonthDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      } else {
        this.currentMonthDate = new Date();
      }
    },
    currentMonthDate: function (newVal) {
      this.dates = mycalendar.createCalendarMonthDates(newVal);
    }
  },
  methods: {
    openCalendar() {
      this.isCalendarOpen = true;
    },
    closeCalendar() {
      this.isCalendarOpen = false;
    },
    selectDate(date) {
      this.dateInput = date.toISOString().split('T')[0]; // We only want the date part of the string
      this.closeCalendar();
    },
    getDisplayDate(date) {
      if (date.getMonth() !== this.currentMonthDate.getMonth()) {
        return ' ';
      } else {
        return date.getDate();
      }
    },
    previousMonth() {
      const newMonthDate = new Date(this.currentMonthDate.getTime());
      newMonthDate.setMonth(newMonthDate.getMonth() - 1);
      this.currentMonthDate = newMonthDate;
    },
    nextMonth() {
      const newMonthDate = new Date(this.currentMonthDate.getTime());
      newMonthDate.setMonth(newMonthDate.getMonth() + 1);
      this.currentMonthDate = newMonthDate;
    },
    resetCurrentMonthDate() {
      this.currentMonthDate = new Date();
    },
    getDisplayMonthYear(date) {
      /* Display today's month and year. The today's date is calculated using  date. */
      const month = this.$options.monthLabels[date.getMonth()];
      const year = date.getFullYear();
      return month + ', ' + year;
    },
    isCurrentMonth() {
      /* Check to see if currentMonthDate is today's month. The today's date is calculated using  date. */
      const today = new Date();
      return today.getMonth() === this.currentMonthDate.getMonth();
    },
    isToday(date) {
      /* Check to see if given date is today's date. The today's date is calculated using  date */
      const today = new Date();
      if (date &&
          this.isCurrentMonth() &&
          today.getFullYear() === date.getFullYear() &&
          today.getMonth() === date.getMonth() &&
          today.getDate() === date.getDate()) {
        return true;
      }
      return false;
    }
  },
  created() {
    this.resetCurrentMonthDate();
  }
}
</script>

<style>
  @import url('https://unpkg.com/bulma@0.9.3/css/bulma.css');
  @import url('https://unpkg.com/@fortawesome/fontawesome-free@latest/css/all.min.css');
</style>
```
{% endverbatim %}
